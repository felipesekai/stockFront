import {getAllOrders} from "../service/OrderService";
import {BHeaderPage} from "../components/BHeaderPage";
import {TableOrder} from "../components/TableOrders/TableOrder";
import {OrderRequests} from "../utils/@Types";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../components/Button";

export const Orders = () => {

    const [orders, setOrders] = useState<OrderRequests[]>([]);

    const navigate = useNavigate();

    function goTo(){
        navigate("/")
    }

    useEffect(() => {
        getAllOrders().then((res) => {
            setOrders(res.data)
        });
    }, [])


    return (
        <div>
            <BHeaderPage title={""}>
                <button title={""} className="bg-bgPrimary
                    flex
                    gap-2
                    justify-center
                    items-center
                    my-5
                    mx-4
                    px-5
                    py-3
                    rounded
                    shadow
                    font-bold" onClick={goTo}>
                    <i className={'pi pi-arrow-left'}></i>
                </button>
                Pedidos
            </BHeaderPage>
            <TableOrder list={orders}/>
        </div>
    )
}