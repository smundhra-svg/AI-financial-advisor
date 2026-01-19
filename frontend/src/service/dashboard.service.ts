import { axiosClient } from "../api/axiosClient";
import { DashBoardData } from "DTO/dashboard.dto";


export const fetchDashboardData = async(): Promise<DashBoardData> => {
    try {
        const response = await axiosClient.get<DashBoardData>("/analyze");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }  
};