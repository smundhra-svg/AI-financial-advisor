import { DashBoardData } from "DTO/dashboard.dto";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "@service/dashboard.service"

export const useDashboardData = () => {
    const [data, setData] = useState<DashBoardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        const loadDashboard = async()=> {
            try {
                const result = await fetchDashboardData();
                setData(result);
            } catch (error) {
                setError("Failed to load transactions")
            }finally{
                setLoading(false)
            }
        };
        loadDashboard();
    },[]);
    return {data,setData,loading,error}
}