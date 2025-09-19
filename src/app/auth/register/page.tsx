import RegisterWrapperContent from "@/components/organisms/auth/register/RegisterWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | SIKIMAK",
  description: "Daftar untuk mengakses fitur-fitur yang tersedia.",
};

export default function RegisterPage() {
  return (
    <section>
      <RegisterWrapperContent />
    </section>
  );
}
