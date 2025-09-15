import LoginWrapperContent from "@/components/organisms/auth/login/LoginWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | SIKIMAK",
  description: "Masuk untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthLoginPage() {
  return <LoginWrapperContent />;
}
