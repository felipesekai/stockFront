import {api} from "./api";
import {TypeOrder} from "../utils/@Types";

export const getAllOrders = async () =>{
    return api.get('/order/all/')

}

export function registerNewOrder(order: TypeOrder){
    return api.post(`/order`, order)
}