import { api } from "./api";
import { Products } from "../utils/@Types";

export const getAllProducts = async () => {
    return api.get('/product/all/')

}

export function registerProduct(product: Products) {
    return api.post(`/product`, product)
}
export function editProduct(product: Products) {
    return api.put(`/product/edit`, product)
}