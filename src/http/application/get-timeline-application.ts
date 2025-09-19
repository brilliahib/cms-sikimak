import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Application } from "@/types/applications/application";

export interface GetTimelineApplicationResponse {
  data: Application[];
}

export const GetTimelineApplicationHandler = async (
  token: string,
): Promise<GetTimelineApplicationResponse> => {
  const { data } = await api.get<GetTimelineApplicationResponse>(
    "/applications/timeline",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetTimelineApplication = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetTimelineApplicationResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["get-all-applications"],
    queryFn: () => GetTimelineApplicationHandler(token),
    ...options,
  });
};
