import { axiosClient } from "../api/axiosClient";
import { CategoriesTransactions, DashBoardData } from "DTO/dashboard.dto";


export const fetchDashboardData = async(): Promise<CategoriesTransactions> => {
    try {
        const response = await axiosClient.get<CategoriesTransactions>("/analyze");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }  
};