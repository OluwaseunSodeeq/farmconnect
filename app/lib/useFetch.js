import useSWR from "swr";

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const allFarmers = () => fetch(`${urlBase}/farmers`).then((res) => res.json());
const farmerById = (id) => fetch(`${urlBase}/farmers/${id}`).then((res) => res.json());