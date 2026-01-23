import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../data/db.json");

export const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");

  return data
    ? JSON.parse(data)
    : {
        users: [],
        farms: [],
        products: [],
        orders: [],
        verifications: [],
        certifications: [],
        reports: [],
      };
};

export const writeDB = (db) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
};
