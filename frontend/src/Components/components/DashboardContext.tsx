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
  loadDashboard: ()=> Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashBoardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
    const loadDashboard = async () => {
      try {
        if(loading || !data) {
          setLoading(true);
          console.warn("Preparing to load dashboard data, hence \"analyze route\" is kept on hold.")
        }
        const result = await fetchDashboardData();
        setData(result);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardContext.Provider
      value={{ data, setData, loading, error, loadDashboard }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

 // Custom hook to consume context safely
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
