import express from "express";
import { config } from "./config.js";
import handlebars from "express-handlebars";
import userRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import { Server } from "socket.io";

const app = express();
app.use( express.json() );
app.use(express.urlencoded( {extended:true} ));

app.engine( "handlebars", handlebars.engine() );
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");


app.use('/', viewsRoutes);
app.use('/api/products', userRoutes);
app.use('/api/carts', cartRoutes);



const HTTPServer = app.listen(config.PORT, () => {
    console.log(`Escuchando desde el puerto ${config.PORT}`)
});

const socketServer = new Server( HTTPServer );
app.set("socketServer", socketServer);

socketServer.on('connection', client => {
    console.log(`Conectado desde ${client.handshake.address}, con id: ${client.id}`)
});