export const ProductService = {
    getProducts(params){
        // console.log('params ->',typeof params, params);
        const params1 = JSON.parse(params[Object.keys(params)[0]]);
        const newObj = {
            skip: params1.first,
            limit:params1.rows,
            select : "title,description,price,rating,stock"
        };

        const queryParams1 = Object.keys(newObj).map(key =>`${key}=${newObj[key]}`).join("&");
        // console.log("queryParams ->",queryParams1);
        return fetch('https://dummyjson.com/products?' + queryParams1).then((res) => res.json());
    }
}