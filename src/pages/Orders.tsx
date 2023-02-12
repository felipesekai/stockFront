import {getAllOrders} from "../service/OrderService";

export const Orders = ()=>{

    const orders = getAllOrders().then((res)=>{
        console.log(res.data)
    })

    return(
        <div>tests</div>
    )
}