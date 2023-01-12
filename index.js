const express = require("express");
const { productManager } = require("./productManager");

const app = express();
const port = 3000;

app.get("/products", (req, res) => {
  const productos = productManager.getProducts();
  const limit = req.query.limit;

  limit && !isNaN(Number(limit))
    ? res.send(productos.slice(0, limit))
    : res.send(productos);
});

app.get("/products/:pid", (req, res) => {
  const productos = productManager.getProducts();
  const pid = req.params.pid;

  if (pid && !isNaN(Number(pid))) {
    const respuesta = productos.find((e) => e.id === Number(pid));
    return res.send(respuesta);
  }
  res.send(productos);
});

app.listen(port, () => {
  console.log("Running in port", port);
});
