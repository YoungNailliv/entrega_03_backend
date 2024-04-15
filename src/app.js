import express from "express";
import  ProductManager  from "./productManager.js";

const app = express();
const manager = new ProductManager("../products.json");
const PORT = 8080;

app.get("/", (req,res) => {
    res.send("Hola!")
});

app.get("/products", async(req,res) => {
    
    let limit = parseInt(req.query.limit) || 0;
    let products = await manager.getProducts(limit);
    res.send( { status: 200, payload: products }  );

})

app.get("/product/:id", async(req,res) => {
    let id = req.params.id;
    let product = await manager.getProductById(parseInt(id));

    res.send( {status:200, payload:product} );
})

app.listen(PORT, () => {
    console.log(`Escuchando desde el puerto ${PORT}`)
})