"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationSummary } from "@/types/applications/application";

interface CardDashboardSummaryProps {
  data?: ApplicationSummary;
  isLoading?: boolean;
}

export default function CardDashboardSummary({
  data,
  isLoading = false,
}: CardDashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="relative flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Total Lamaran</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <h3 className="text-3xl font-bold">{data?.total_applications}</h3>
          )}
        </CardContent>
        <CardDecoration />
      </Card>

      <Card className="relative flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Total Belum Disubmit</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <h3 className="text-3xl font-bold">{data?.total_not_submitted}</h3>
          )}
        </CardContent>
        <CardDecoration />
      </Card>

      <Card className="relative flex-1 overflow-hidden">
        <CardHeader>
          <CardTitle>Total Lamaran Diterima</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <h3 className="text-3xl font-bold">{data?.total_accepted}</h3>
          )}
        </CardContent>
        <CardDecoration />
      </Card>
    </div>
  );
}

function CardDecoration() {
  return (
    <div className="absolute -right-2 bottom-1">
      <svg
        width="122"
        height="62"
        viewBox="0 0 122 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64.6344 0C61.9961 0 59.8573 2.13877 59.8573 4.77707C59.8573 7.41537 61.9961 9.55414 64.6344 9.55414H90.0894C92.7277 9.55414 94.8665 7.41537 94.8665 4.77707C94.8665 2.13877 92.7277 0 90.0894 0H64.6344ZM0.972153 21.0191C0.972153 17.5014 3.82384 14.6497 7.34158 14.6497H121.913V27.3885H93.9708L93.4048 28.115C92.2788 29.5604 92.2788 31.5861 93.4048 33.0315L93.4746 33.121H121.913V42.6752H33.7566C31.1183 42.6752 28.9796 40.5364 28.9796 37.8981C28.9796 35.2598 31.1183 33.121 33.7566 33.121H68.0484L68.1877 32.9299C69.2117 31.5256 69.2117 29.6209 68.1877 28.2166L67.584 27.3885H7.34158C3.82384 27.3885 0.972153 24.5368 0.972153 21.0191ZM6.701 56.3694C6.701 53.7311 8.83977 51.5924 11.4781 51.5924H36.9331C39.5714 51.5924 41.7102 53.7311 41.7102 56.3694C41.7102 59.0077 39.5714 61.1465 36.9331 61.1465H11.4781C8.83977 61.1465 6.701 59.0077 6.701 56.3694ZM52.8526 51.5924C50.2143 51.5924 48.0755 53.7311 48.0755 56.3694C48.0755 59.0077 50.2143 61.1465 52.8526 61.1465H121.913V51.5924H52.8526ZM19.1114 40.3694C20.8691 40.3694 22.294 38.9436 22.294 37.1847C22.294 35.4258 20.8691 34 19.1114 34C17.3537 34 15.9287 35.4258 15.9287 37.1847C15.9287 38.9436 17.3537 40.3694 19.1114 40.3694Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
