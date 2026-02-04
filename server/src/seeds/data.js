import fs from "fs";
import path from "path";

const filePath = path.resolve("./src/data/newDB.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(rawData);

export const users = data.users;
export const farms = data.farms;
export const products = data.products;

// import data from "../data/newDB.json" assert { type: "json" };

// export const users = data.users;
// export const farms = data.farms;
// export const products = data.products;
// export const categories = data.categories;
