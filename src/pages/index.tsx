import AuthGuard from "guards/AuthGuard";

export default function Home() {
  return <AuthGuard />;
}
