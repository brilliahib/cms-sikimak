import FormAuthLogin from "@/components/molecules/form/auth/FormAuthLogin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginWrapperContent() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 hidden md:top-8 md:right-8",
        )}
      >
        Sign In
      </Link>
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="bg-auth-pattern absolute inset-0 bg-cover bg-center bg-no-repeat grayscale filter" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        <div className="relative z-20 flex items-center gap-x-3 text-lg font-medium">
          <Link href={"/"} className="flex items-center gap-2">
            <h1 className="font-semibold tracking-tight">SIKIMAK</h1>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="max-w-md text-lg">
              Sistem Informasi Lamaran Magang dan Kerja
            </p>
            <span>
              Powered by{" "}
              <Link href={"https://brilliahib.tech"} className="underline">
                brilliahib.tech
              </Link>
            </span>
          </blockquote>
        </div>
      </div>

      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center gap-y-4 sm:w-[350px]">
          <FormAuthLogin />
        </div>
      </div>
    </div>
  );
}
