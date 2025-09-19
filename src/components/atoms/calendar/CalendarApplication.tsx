"use client";

import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent } from "@/components/ui/card";
import { Application } from "@/types/applications/application";

interface CalendarApplicationProps {
  data?: Application[];
}

export default function CalendarApplication({
  data,
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
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
