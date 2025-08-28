import request from "@/config/request";
import { useQuery } from "@tanstack/react-query";

interface UseGetListProps {
  endpoint: string;
  params?: Record<string, any>;
  enabled?: boolean;
}

export const useGetList = <T>({
  endpoint,
  params = {},
  enabled = true,
}: UseGetListProps) => {
  return useQuery<T, Error>({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const response = await request.get(endpoint, { params });
      return response.data;
    },
    enabled: enabled,
  });
};
