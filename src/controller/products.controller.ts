import type { IncomingMessage, ServerResponse } from "http";

export const productsController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const { method, url } = req;
  const data ={
    id: 1,
    name: "Product 1",
    price: 100,
  }
  if (method === "GET" && url === "/products") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Products controller List"  , data} ));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
