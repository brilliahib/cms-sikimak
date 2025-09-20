"use client";

import Link from "next/link";
import { Link as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary inline-flex items-center gap-1 hover:underline ${className ?? ""}`}
    >
      <span className="line-clamp-1 truncate">{children}</span>
      <ExternalLinkIcon size={16} strokeWidth={2} className="shrink-0" />
    </Link>
  );
}
