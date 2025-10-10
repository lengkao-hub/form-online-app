import { apiClient } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { type IBlacklistTypeAggregation } from "../type";

export const useAggregation = () => {
  const [value, setValue] = useState<IBlacklistTypeAggregation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAggregation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<IBlacklistTypeAggregation>("blacklist-type-aggregation");
      setValue(result);
    } catch {
      setError("Failed to fetch aggregation data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAggregation();
  }, []);
  return { result: value?.result, loading, error };
};
