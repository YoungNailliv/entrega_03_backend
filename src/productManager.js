import fs from "fs";

class ProductManager {

    constructor(file){
        this.file = file;
        this.products = [];
    };

    async getProducts (limit){

        let products = await fs.promises.readFile(this.file, "utf-8") || [];
        let parseProducts = await JSON.parse(products);
        
        this.products = parseProducts;

        return limit === 0 ? parseProducts : parseProducts.slice(0, limit);
    }

    async addProduct( productoAgregar ){
        
        await this.getProducts(0);
        const exist = this.products.some( (product) => product.code === productoAgregar.code )
        
        if(!exist){
            this.products.push({ ...productoAgregar, id:this.products[-1].id + 1} );
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), "utf-8")
            console.log("Producto agregado")
        }else{
            console.log("Este producto ya existe")
        };
    };

    async deleteProduct ( productoEliminar ){

        await this.getProducts(0);

        const exist = this.products.find( (product) => product.id === productoEliminar);

        if(exist){
            this.products = this.products.filter( product => product.id !== productoEliminar)
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), "utf-8")
        } else {
            console.log( `No existe el producto con el id ${productoEliminar}` )
        }
    };

    async updateProduct ( id, newProduct) {
        await this.getProducts(0);

        const exist = this.products.find( (product) => product.id === id);

        if(exist){
            const index = this.products.findIndex((product) => product.id === id);
            this.products[index] = {...newProduct,id:exist.id};
            console.log(this.products);
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), "utf-8");
        } else {
            console.log("Ese producto no existe");
        }
    };

    async getProductById (productId){
        await this.getProducts(0);
        let product = this.products.find( (product) => product.id === productId );
        
        if(product){
            return product;
        } else {
            console.log("Ese producto no existe")
        };
    }
}

export default ProductManager;
