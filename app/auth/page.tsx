import { Suspense } from "react";
import AuthInner from "./AuthInner";

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <AuthInner />
    </Suspense>
  );
}
