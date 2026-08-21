import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildInteractionSummary } from "@/lib/growth/summaryBuilder";

const MAX_INTERACTIONS = 20;
const MAX_BODY_CHARS = 500;
const MAX_CONTEXT_CHARS = 12000;

type GrowthCompany = {
  id: string;
  company_name: string;
  website: string | null;
  domain: string | null;
  country: string | null;
};

type GrowthContact = {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
};

type GrowthCompanyState = {
  outreach_status: string;
  first_contacted_at: string | null;
  last_contacted_at: string | null;
  last_replied_at: string | null;
  next_follow_up_at: string | null;
  do_not_contact_reason: string | null;
};

type GrowthInteraction = {
  id: string;
  type: string;
  subject: string | null;
  summary: string | null;
  body: string | null;
  occurred_at: string | null;
  created_at: string;
  contact_id: string | null;
  zoho_message_id: string | null;
  zoho_thread_id: string | null;
};

function clip(value: string | null | undefined, max: number) {
  const text = (value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

export async function buildCompanyContext(
  companyId: string
): Promise<string> {
  const [
    companyResult,
    contactsResult,
    stateResult,
    interactionsResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("growth_companies")
      .select("id, company_name, website, domain, country")
      .eq("id", companyId)
      .single(),

    supabaseAdmin
      .from("growth_contacts")
      .select("id, email, name, role")
      .eq("company_id", companyId)
      .order("created_at", { ascending: true }),

    supabaseAdmin
    .from("growth_company_state")
      .select(
        "outreach_status, first_contacted_at, last_contacted_at, last_replied_at, next_follow_up_at, do_not_contact_reason"
      )
      .eq("company_id", companyId)
      .maybeSingle(),

    supabaseAdmin
      .from("growth_interactions")
      .select(
        "id, type, subject, summary, body, occurred_at, created_at, contact_id, zoho_message_id, zoho_thread_id"
      )
      .eq("company_id", companyId)
      .order("occurred_at", { ascending: false })
      .limit(MAX_INTERACTIONS),
  ]);

  if (companyResult.error || !companyResult.data) {
    throw new Error(
      `Growth context: company not found: ${
        companyResult.error?.message || companyId
      }`
    );
  }

  if (contactsResult.error) {
    throw new Error(
      `Growth context: contacts query failed: ${contactsResult.error.message}`
    );
  }

  if (stateResult.error) {
    throw new Error(
      `Growth context: state query failed: ${stateResult.error.message}`
    );
  }

  if (interactionsResult.error) {
    throw new Error(
      `Growth context: interactions query failed: ${interactionsResult.error.message}`
    );
  }

  const company = companyResult.data as GrowthCompany;
  const contacts = (contactsResult.data || []) as GrowthContact[];
  const state = stateResult.data as GrowthCompanyState | null;
  const interactions = (interactionsResult.data || []) as GrowthInteraction[];

  const contactsById = new Map(
    contacts.map((contact) => [contact.id, contact])
  );

  const lines: string[] = [];

  lines.push("CARRIERTRUST GROWTH MEMORY");
  lines.push("");
  lines.push("COMPANY");
  lines.push(`Name: ${company.company_name}`);
  lines.push(`Domain: ${company.domain || "unknown"}`);
  lines.push(`Website: ${company.website || "unknown"}`);
  lines.push(`Country: ${company.country || "unknown"}`);

  lines.push("");
  lines.push("CURRENT RELATIONSHIP");
  lines.push(`Status: ${state?.outreach_status || "new"}`);
  lines.push(
    `First contacted: ${formatDate(state?.first_contacted_at)}`
  );
  lines.push(
    `Last contacted: ${formatDate(state?.last_contacted_at)}`
  );
  lines.push(
    `Last reply: ${formatDate(state?.last_replied_at)}`
  );
  lines.push(
    `Next follow-up: ${formatDate(state?.next_follow_up_at)}`
  );

  if (state?.do_not_contact_reason) {
    lines.push("");
    lines.push("WARNING");
    lines.push("DO NOT CONTACT THIS COMPANY.");
    lines.push(`Reason: ${state.do_not_contact_reason}`);
  }

  if (
    state?.outreach_status === "registered" ||
    state?.outreach_status === "interested"
  ) {
    lines.push("");
    lines.push("IMPORTANT");
    lines.push(
      "Company is already engaged. Do not use a first-contact introductory pitch."
    );
  }

  lines.push("");
  lines.push("CONTACTS");

  if (!contacts.length) {
    lines.push("No contacts recorded.");
  } else {
    for (const contact of contacts) {
      const identity = [
        contact.name,
        contact.role,
        contact.email,
      ]
        .filter(Boolean)
        .join(" | ");

      lines.push(`- ${identity}`);
    }
  }

  lines.push("");
  lines.push("RELATIONSHIP SUMMARY");
  lines.push(buildInteractionSummary(interactions));

  const sentInteractions = interactions.filter(
    (interaction) => interaction.type === "sent"
  );
  const receivedInteractions = interactions.filter(
    (interaction) => interaction.type === "received"
  );

  const latestSent = sentInteractions[0] || null;
  const latestReceived = receivedInteractions[0] || null;

  lines.push("");
  lines.push("KEY RELATIONSHIP FACTS");
  lines.push(`Previous sent emails: ${sentInteractions.length}`);
  lines.push(`Previous received emails: ${receivedInteractions.length}`);

  if (latestSent) {
    lines.push(
      `Last sent: ${formatDate(
        latestSent.occurred_at || latestSent.created_at
      )}`
    );

    if (latestSent.subject) {
      lines.push(`Last sent subject: ${clip(latestSent.subject, 180)}`);
    }

    const latestSentContent =
      clip(latestSent.summary, 350) ||
      clip(latestSent.body, 350);

    if (latestSentContent) {
      lines.push(`Last sent context: ${latestSentContent}`);
    }
  } else {
    lines.push("Last sent: none");
  }

  if (latestReceived) {
    lines.push(
      `Last received: ${formatDate(
        latestReceived.occurred_at || latestReceived.created_at
      )}`
    );

    if (latestReceived.subject) {
      lines.push(`Last received subject: ${clip(latestReceived.subject, 180)}`);
    }

    const latestReplyContent =
      clip(latestReceived.summary, 500) ||
      clip(latestReceived.body, 500);

    if (latestReplyContent) {
      lines.push(`Last received context: ${latestReplyContent}`);
    }
  } else {
    lines.push("Last received: none");
    lines.push("No reply has been recorded yet.");
  }

  lines.push("");
  lines.push("PREVIOUS COMMUNICATION");

  if (!interactions.length) {
    lines.push("No previous communication recorded.");
  } else {
    interactions.forEach((interaction, index) => {
      const contact = interaction.contact_id
        ? contactsById.get(interaction.contact_id)
        : null;

      lines.push("");
      lines.push(
        `${index + 1}. ${interaction.type.toUpperCase()} | ${formatDate(
          interaction.occurred_at || interaction.created_at
        )}`
      );

      if (contact) {
        lines.push(
          `Contact: ${
            contact.name
              ? `${contact.name} <${contact.email}>`
              : contact.email
          }`
        );
      }

      if (interaction.subject) {
        lines.push(`Subject: ${clip(interaction.subject, 180)}`);
      }

      const content =
        clip(interaction.summary, MAX_BODY_CHARS) ||
        clip(interaction.body, MAX_BODY_CHARS);

      if (content) {
        lines.push(`Context: ${content}`);
      }
    });
  }

  lines.push("");
  lines.push("AI WRITING GUIDANCE");

  if (state?.outreach_status === "contacted" && !latestReceived) {
    lines.push(
      "This is a follow-up situation. Do not write a first-contact introduction."
    );
    lines.push(
      "Refer naturally to the previous message when useful, but do not repeat the same pitch."
    );
  }

  if (latestReceived) {
    lines.push(
      "A reply exists. Continue from the latest received message and address its context first."
    );
  }

  if (sentInteractions.length >= 2 && !latestReceived) {
    lines.push(
      "Multiple messages were already sent without a recorded reply. Avoid sending another repetitive generic pitch."
    );
  }

  if (
    state?.outreach_status === "registered" ||
    state?.outreach_status === "interested"
  ) {
    lines.push(
      "The company is already engaged. Avoid introductory sales language."
    );
  }

  const context = lines.join("\n");

  if (context.length <= MAX_CONTEXT_CHARS) {
    return context;
  }

  return (
    context.slice(0, MAX_CONTEXT_CHARS - 80) +
    "\n\n[Context truncated to protect token usage]"
  );
}

export async function findCompanyIdForContext(input: {
  companyName?: string;
  companyWebsite?: string;
  contactEmail?: string;
}): Promise<string | null> {
  const email = (input.contactEmail || "").trim().toLowerCase();

  if (email) {
    const { data: contact, error } = await supabaseAdmin
      .from("growth_contacts")
      .select("company_id")
      .eq("normalized_email", email)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Growth context: contact lookup failed: ${error.message}`
      );
    }

    if (contact?.company_id) {
      return String(contact.company_id);
    }
  }

  const website = (input.companyWebsite || "").trim();

  if (website) {
    try {
      const normalizedUrl =
        website.startsWith("http://") || website.startsWith("https://")
          ? website
          : `https://${website}`;

      const hostname = new URL(normalizedUrl).hostname.toLowerCase();
      const domain = hostname.startsWith("www.")
        ? hostname.slice(4)
        : hostname;

      if (domain) {
        const { data: company, error } = await supabaseAdmin
          .from("growth_companies")
          .select("id")
          .eq("domain", domain)
          .maybeSingle();

        if (error) {
          throw new Error(
            `Growth context: domain lookup failed: ${error.message}`
          );
        }

        if (company?.id) {
          return String(company.id);
        }
      }
    } catch {
      // Ignore invalid website here and continue to company-name lookup.
    }
  }

  const companyName = (input.companyName || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (companyName) {
    const { data: company, error } = await supabaseAdmin
      .from("growth_companies")
      .select("id")
      .eq("normalized_name", companyName)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Growth context: company-name lookup failed: ${error.message}`
      );
    }

    if (company?.id) {
      return String(company.id);
    }
  }

  return null;
}
