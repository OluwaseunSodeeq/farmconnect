// lib/useFetch.js
import useSWR from "swr";
import api from "./api";

const fetcher = (url) => api.get(url).then((res) => res.data);

// -------------------------
// ✅ SWR Hooks for GET APIs (Runs on mount)
// -------------------------

export const useAllFarmers = () => useSWR("/farmers", fetcher);

export const useFarmerById = (id) =>
  useSWR(id ? `/farmers/${id}` : null, fetcher);

export const useAllProducts = () => useSWR("/products", fetcher);

export const useProductById = (id) =>
  useSWR(id ? `/products/${id}` : null, fetcher);

export const useProductsByFarmerId = (farmerId) =>
  useSWR(farmerId ? `/products?farmerId=${farmerId}` : null, fetcher);

export const useAllPayouts = () => useSWR("/payouts", fetcher);

// -------------------------
// ✅ POST / PATCH / PUT APIs (Manual trigger)
// -------------------------

export const postPayoutById = async (id, payload) => {
  const res = await api.post(`/payouts/${id}`, payload);
  return res.data;
};

export const verifyPaymentByFarmerId = async (id) => {
  const res = await api.post(`/verify/${id}`);
  return res.data;
};
