"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Application } from "@/types/applications/application";
import {
  applicationsSchema,
  ApplicationsType,
} from "@/validators/applications/applications-validator";
import { useUpdateApplication } from "@/http/application/update-application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { categoryOptions, statusOptions } from "@/utils/data-select";
import { useRouter } from "next/navigation";
import { serverToInputDatetimeFlexible } from "@/utils/server-time";

interface FormUpdateApplicationProps {
  id: number;
  data?: Application;
}

export default function FormUpdateApplication({
  id,
  data,
}: FormUpdateApplicationProps) {
  const defaultValues = useMemo(
    () => ({
      title: data?.title || "",
      company_name: data?.company_name || "",
      company_location: data?.company_location || "",
      application_category: data?.application_category || "",
      work_location: data?.work_location || "",
      apply_status: data?.apply_status || "",
      approval_status: data?.approval_status || "",
      notes: data?.notes || "",
      submitted_status: data?.submitted_status || "",
      deadline: data?.deadline
        ? serverToInputDatetimeFlexible(data.deadline as string)
        : "",
    }),
    [data],
  );

  const form = useForm<ApplicationsType>({
    resolver: zodResolver(applicationsSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateApplicationHandler, isPending } = useUpdateApplication({
    onError: (err) => {
      toast.error("Gagal memperbarui Lamaran!", {
        description: err.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui Lamaran!");
      queryClient.invalidateQueries({
        queryKey: ["get-all-applications"],
      });
      router.push("/applications");
    },
  });

  const onSubmit = (body: ApplicationsType) => {
    const payload = {
      ...body,
      deadline: serverToInputDatetimeFlexible(body.deadline),
    };
    updateApplicationHandler({ id, body: payload });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Judul Lamaran <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Masukkan judul lamaran"
                    {...field}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="application_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kategori Lamaran <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama Perusahaan <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="company_name"
                    placeholder="Masukkan nama perusahaan"
                    {...field}
                    value={field.value ?? ""}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Lokasi Perusahaan <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="company_location"
                    placeholder="Masukkan lokasi perusahaan"
                    {...field}
                    value={field.value ?? ""}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apply_status"
            render={({ field }) => {
              const [custom, setCustom] = useState(false);

              return (
                <FormItem>
                  <FormLabel>
                    Tahap Lamaran <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {custom ? (
                      <Input
                        placeholder="Tulis tahap lainnya..."
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="h-10"
                      />
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          if (value === "Lainnya") {
                            setCustom(true);
                            field.onChange("");
                          } else {
                            field.onChange(value);
                          }
                        }}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue
                            placeholder="Pilih tahap lamaran"
                            className="w-full"
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="approval_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Status Lamaran <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Pilih status lamaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="accepted">Diterima</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                      <SelectItem value="ghosting">Tidak Ada Kabar</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="work_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Lokasi Kerja / Magang <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Pilih lokasi kerja / magang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="submitted_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Status Submit <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Apakah lamaran anda sudah disubmit?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Sudah Dikirim</SelectItem>
                      <SelectItem value="not submitted">
                        Belum Dikirim
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => {
              const [time, setTime] = useState("12:00");
              const dateValue = field.value ? new Date(field.value) : undefined;

              return (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Tenggat Deadline
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {dateValue ? (
                            <>
                              {format(dateValue, "PPP")} •{" "}
                              {format(dateValue, "HH:mm")}
                            </>
                          ) : (
                            <span>Pilih tenggat deadline</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full space-y-3 p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={(date) => {
                          if (!date) return;
                          const [hours, minutes] = time.split(":");
                          date.setHours(Number(hours), Number(minutes));
                          field.onChange(date.toISOString());
                        }}
                        initialFocus
                      />
                      <div className="flex items-center gap-2 px-4 pb-4">
                        <Clock className="h-4 w-4 opacity-50" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                            if (dateValue) {
                              const [hours, minutes] =
                                e.target.value.split(":");
                              const newDate = new Date(dateValue);
                              newDate.setHours(Number(hours), Number(minutes));
                              field.onChange(newDate.toISOString());
                            }
                          }}
                          className="rounded-md border px-2 py-1 text-sm"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea
                    id="notes"
                    placeholder="Masukkan catatan tambahan"
                    className="min-h-[100px] resize-y"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            size={"lg"}
            disabled={isPending}
            className="text-white"
          >
            {isPending ? "Loading..." : "Tambahkan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
