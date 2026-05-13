import type { IncomingMessage, ServerResponse } from "http";
import { readProducts, writeProducts } from "../services/products.services";
import type { Product, Product } from "../types/product.type";
import { parseBody } from "../utility/pareseBody";

export const productsController = async (
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
  }
  else if (method === "GET" && id !== null) {
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

  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
     const productData = readProducts();
    //  const d = writeProducts();
     const newProduct = {
     ...body,
    };
    productData.push(newProduct);
    writeProducts(productData);
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({ message: "Product created", data: newProduct }));
  }
  else  if (method==="PUT" && id !== null){
    const body = await parseBody(req);
    const product = readProducts();
    const index= product.findIndex((p : Product)=>p.id === id);

    if ( index <0){
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Product not found" }));
    }
    product[index] = { ...product[index], ...body };
    writeProducts(product);
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({ message: "Product updated", data: product[index] }));


  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
