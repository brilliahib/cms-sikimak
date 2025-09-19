import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ApplicationSummary } from "@/types/applications/application";

export interface GetSummaryApplicationResponse {
  data: ApplicationSummary;
}

export const GetSummaryApplicationHandler = async (
  token: string,
): Promise<GetSummaryApplicationResponse> => {
  const { data } = await api.get<GetSummaryApplicationResponse>(
    "/applications/summary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetSummaryApplication = (
  token: string,
  options?: Partial<UseQueryOptions<GetSummaryApplicationResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-applications-summary"],
    queryFn: () => GetSummaryApplicationHandler(token),
    ...options,
  });
};
