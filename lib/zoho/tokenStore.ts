import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Token storage:
 * - Private Supabase Storage bucket (default: growth-secrets)
 * - Object path: zoho-mail.enc.json
 * - Payload encrypted with AES-256-GCM
 * - Encryption key comes from ZOHO_TOKEN_ENCRYPTION_KEY
 * - Plaintext tokens are never stored in source code or returned to browser
 */

export const ZOHO_TOKEN_BUCKET =
  process.env.ZOHO_STORAGE_BUCKET?.trim() || "growth-secrets";

export const ZOHO_TOKEN_OBJECT_PATH = "zoho-mail.enc.json";

export type ZohoStoredTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  apiDomain?: string;
  accountId?: string;
  accountEmail?: string;
  connectedAt: string;
  updatedAt: string;
};

type EncryptedBlob = {
  v: 1;
  alg: "aes-256-gcm";
  iv: string;
  tag: string;
  ciphertext: string;
};

function encryptionKey(): Buffer {
  const raw = process.env.ZOHO_TOKEN_ENCRYPTION_KEY?.trim();

  if (!raw) {
    throw new Error("Missing env variable: ZOHO_TOKEN_ENCRYPTION_KEY");
  }

  // Preferred format: 64 hex characters = 32 bytes.
  if (/^[0-9a-fA-F]{64}$/.test(raw)) {
    return Buffer.from(raw, "hex");
  }

  // Fallback for passphrases.
  return createHash("sha256").update(raw, "utf8").digest();
}

function encryptJson(payload: ZohoStoredTokens): EncryptedBlob {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);

  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const ciphertext = Buffer.concat([
    cipher.update(plaintext),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    v: 1,
    alg: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

function decryptJson(blob: EncryptedBlob): ZohoStoredTokens {
  if (blob.v !== 1 || blob.alg !== "aes-256-gcm") {
    throw new Error("Unsupported Zoho token blob format");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    encryptionKey(),
    Buffer.from(blob.iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(blob.tag, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(blob.ciphertext, "base64")),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString("utf8")) as ZohoStoredTokens;
}

function serializeStorageError(error: unknown): string {
  if (!error) {
    return "";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isMissingStorageObject(error: unknown): boolean {
  if (!error) {
    return false;
  }

  const err = error as {
    message?: string;
    statusCode?: string | number;
    status?: string | number;
    error?: string;
    name?: string;
    code?: string;
  };

  const statusCode = err.statusCode ?? err.status;

  if (statusCode === 404 || statusCode === "404") {
    return true;
  }

  const text = [
    err.message,
    err.error,
    err.name,
    err.code,
    serializeStorageError(error),
  ]
    .filter(Boolean)
    .join(" ");

  return /404|object not found|resource not found|not found|does not exist|no such file/i.test(
    text
  );
}

async function ensurePrivateBucket() {
  const { data: buckets, error: listError } =
    await supabaseAdmin.storage.listBuckets();

  if (listError) {
    throw new Error(
      `Failed to list storage buckets: ${serializeStorageError(listError)}`
    );
  }

  const exists = (buckets || []).some(
    (bucket) => bucket.name === ZOHO_TOKEN_BUCKET
  );

  if (exists) {
    return;
  }

  const { error: createError } =
    await supabaseAdmin.storage.createBucket(ZOHO_TOKEN_BUCKET, {
      public: false,
      fileSizeLimit: 1024 * 64,
    });

  if (
    createError &&
    !/already exists/i.test(serializeStorageError(createError))
  ) {
    throw new Error(
      `Failed to create private bucket "${ZOHO_TOKEN_BUCKET}": ${serializeStorageError(
        createError
      )}`
    );
  }
}

export async function loadZohoTokens(): Promise<ZohoStoredTokens | null> {
  await ensurePrivateBucket();

  // First check whether the token object exists.
  // This avoids Supabase Storage throwing an opaque { url: ... } error
  // when the object has not been created yet.
  const { data: files, error: listError } = await supabaseAdmin.storage
    .from(ZOHO_TOKEN_BUCKET)
    .list("", {
      limit: 100,
      search: ZOHO_TOKEN_OBJECT_PATH,
    });

  if (listError) {
    throw new Error(
      `Failed to check Zoho token storage: ${serializeStorageError(listError)}`
    );
  }

  const exists = (files || []).some(
    (file) => file.name === ZOHO_TOKEN_OBJECT_PATH
  );

  if (!exists) {
    return null;
  }

  const { data, error } = await supabaseAdmin.storage
    .from(ZOHO_TOKEN_BUCKET)
    .download(ZOHO_TOKEN_OBJECT_PATH);

  if (error) {
    if (isMissingStorageObject(error)) {
      return null;
    }

    throw new Error(
      `Failed to load Zoho tokens: ${serializeStorageError(error)}`
    );
  }

  if (!data) {
    return null;
  }

  const text = await data.text();

  if (!text.trim()) {
    return null;
  }

  try {
    const blob = JSON.parse(text) as EncryptedBlob;
    return decryptJson(blob);
  } catch (error) {
    throw new Error(
      `Failed to decrypt Zoho tokens: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function saveZohoTokens(tokens: ZohoStoredTokens) {
  await ensurePrivateBucket();

  const blob = encryptJson(tokens);
  const body = JSON.stringify(blob);

  const { error } = await supabaseAdmin.storage
    .from(ZOHO_TOKEN_BUCKET)
    .upload(
      ZOHO_TOKEN_OBJECT_PATH,
      new Blob([body], { type: "application/json" }),
      {
        contentType: "application/json",
        upsert: true,
      }
    );

  if (error) {
    throw new Error(
      `Failed to save Zoho tokens: ${serializeStorageError(error)}`
    );
  }
}

export async function clearZohoTokens() {
  const { error } = await supabaseAdmin.storage
    .from(ZOHO_TOKEN_BUCKET)
    .remove([ZOHO_TOKEN_OBJECT_PATH]);

  if (error && !isMissingStorageObject(error)) {
    throw new Error(
      `Failed to clear Zoho tokens: ${serializeStorageError(error)}`
    );
  }
}

export function publicZohoConnectionStatus(
  tokens: ZohoStoredTokens | null
) {
  if (!tokens) {
    return {
      connected: false as const,
      accountEmail: null as string | null,
      accountId: null as string | null,
      connectedAt: null as string | null,
      storage: {
        bucket: ZOHO_TOKEN_BUCKET,
        path: ZOHO_TOKEN_OBJECT_PATH,
        encryption: "aes-256-gcm",
      },
    };
  }

  return {
    connected: true as const,
    accountEmail: tokens.accountEmail || null,
    accountId: tokens.accountId || null,
    connectedAt: tokens.connectedAt || null,
    storage: {
      bucket: ZOHO_TOKEN_BUCKET,
      path: ZOHO_TOKEN_OBJECT_PATH,
      encryption: "aes-256-gcm",
    },
  };
}