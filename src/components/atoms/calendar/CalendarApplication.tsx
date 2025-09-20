"use client";

import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/types/applications/application";

interface CalendarApplicationProps {
  data?: Application[];
  isLoading?: boolean;
}

export default function CalendarApplication({
  data,
  isLoading = false,
}: CalendarApplicationProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const events = useMemo(
    () =>
      data?.map((item: Application) => ({
        id: String(item.id),
        title: `${item.title} - ${item.company_name}`,
        start: item.deadline,
        extendedProps: {
          company: item.company_name,
          location: item.company_location,
          status: item.apply_status,
          approval: item.approval_status,
          category: item.application_category,
          notes: item.notes,
          work_location: item.work_location,
        },
      })) ?? [],
    [data],
  );

  return (
    <Card>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={
              isMobile
                ? {
                    left: "",
                    center: "title",
                    right: "",
                  }
                : {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                  }
            }
            eventClassNames="bg-primary text-white cursor-pointer"
            height="100%"
            contentHeight="auto"
            titleFormat={
              isMobile
                ? { month: "short", year: "numeric" }
                : { month: "long", year: "numeric" }
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
