import fs from "fs";
import path from "path";
import type { Product } from "../types/product.type";

const filePath = path.join(process.cwd(), "./src/database/data.json");
export const readProducts = () => {
  const products = fs.readFileSync(filePath, "utf-8");
  // console.log("Products from data.json:", JSON.parse(products));
  return JSON.parse(products);
};
export const writeProducts = (data: Product) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
}
