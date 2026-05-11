import type { IncomingMessage, ServerResponse } from "http";
import { readProducts } from "../services/products.services";
import type { Product } from "../types/product.type";

export const productsController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const { method, url } = req;
  const urlPath = url?.split('/');
  const id = urlPath && urlPath[1] ==="products"  ? Number(urlPath[2]) : null;
  if (method === "GET" && url === "/products") {
    const productData = readProducts();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Products controller List"  , data: productData } ));
  }else if (method === "GET" && id !== null) {
    const productData = readProducts();
    const product = productData.find((p : Product) => p.id === id);

    if (product) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product found", data: product }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Product not found" }));
    }
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
