import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DashBoardData } from "DTO/dashboard.dto";
import { fetchDashboardData } from "@service/dashboard.service";

type DashboardContextType = {
  data: DashBoardData | null;
  setData: React.Dispatch<React.SetStateAction<DashBoardData | null>>;
  loading: boolean;
  error: string | null;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashBoardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ data, setData, loading, error }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * Custom hook to consume context safely
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
