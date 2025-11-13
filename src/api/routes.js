import { axiosInstance } from "./axiosInstance";

export const getRoutes = async () => {
  const res = await axiosInstance.get("/routes");
  return res.data.data;
};

export const getDetailRoute = async (routeId) => {
  const res = await axiosInstance.get(`/routes/${routeId}`);
  return res.data.data;
};
