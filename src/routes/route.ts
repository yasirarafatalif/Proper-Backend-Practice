import type { IncomingMessage, ServerResponse } from "http";
import { productsController } from "../controller/products.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Hello, World!" }));
  } else if (method === "GET" && url?.startsWith("/products") ) {
    productsController(req, res);
  }
   else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
