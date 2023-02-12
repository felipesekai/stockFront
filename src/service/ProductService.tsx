import {api} from "./api";
import {TypeProtucts} from "../utils/@Types";

export const getAllProducts = async () =>{
    return api.get('/product/all/')

}

export function registerProduct(product: TypeProtucts){
    return api.post(`/product`, product)
}