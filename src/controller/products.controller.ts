import type { IncomingMessage, ServerResponse } from "http";
import { readProducts, writeProducts } from "../services/products.services";
import type { Product } from "../types/product.type";
import { parseBody } from "../utility/pareseBody";
import { sendResponse } from "../utility/sendResponse";

export const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const { method, url } = req;
  const urlPath = url?.split("/");
  const id = urlPath && urlPath[1] === "products" ? Number(urlPath[2]) : null;
  if (method === "GET" && url === "/products") {
    const productData = readProducts();
    sendResponse(res,200,true,"Products retrieved successfully", productData)
  } else if (method === "GET" && id !== null) {
    const productData = readProducts();
    const product = productData.find((p: Product) => p.id === id);
    if (product == "undefined") {
      sendResponse(res,404,false,"Product not found")
    }
    if (product) {
      sendResponse(res,200,true,"Product found", product)
    } else {
      sendResponse(res,404,false,"Product not found")
    }
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const productData = readProducts();
    //  const d = writeProducts();
    const newProduct = {
      ...body,
    };
    productData.push(newProduct);
    writeProducts(productData);
    sendResponse(res,200,true,"Product created", newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const product = readProducts();
    const index = product.findIndex((p: Product) => p.id === id);

    if (index < 0) {
      sendResponse(res,404,false,"Product not found");
    }
    product[index] = { ...product[index], ...body };
    writeProducts(product);
    sendResponse(res,200,true,"Product updated", product[index]);
  } else if (method === "DELETE" && id !== null) {
    const body = await parseBody(req);
    const product = readProducts();
    const index = product.findIndex((p: Product) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Product not found" }));
    }
    product.splice(index, 1);
    writeProducts(product);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product deleted" }));
  } else {
    sendResponse(res,404,false,"Not Found");
  }
};
