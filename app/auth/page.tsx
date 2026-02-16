import dynamic from "next/dynamic";

const AuthInner = dynamic(() => import("./AuthInner"), {
  ssr: false,
  loading: () => <div style={{ padding: 24 }}>Loading...</div>,
});

export default function AuthPage() {
  return <AuthInner />;
}
