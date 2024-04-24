import express from "express";
import { config } from "./config.js";
import userRoutes from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"

const app = express();
app.use( express.json() );
app.use(express.urlencoded( {extended:true} ));


app.use('/api/products', userRoutes);
app.use('/api/carts', cartRoutes);



app.listen(config.PORT, () => {
    console.log(`Escuchando desde el puerto ${config.PORT}`)
});