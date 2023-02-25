import { getAllOrders } from "../service/OrderService";
import { BHeaderPage } from "../components/BHeaderPage";
import { TableOrder } from "../components/TableOrders/TableOrder";
import { OrderRequests } from "../utils/@Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonArrowBack } from "../components/Buttons/ButtonArrowBack";

export const Orders = () => {

    const [orders, setOrders] = useState<OrderRequests[]>([]);

    const navigate = useNavigate();

    function goTo() {
        navigate("/")
    }

    useEffect(() => {
        getAllOrders().then((res) => {
            setOrders(res.data)
        });
    }, [])


    return (
        <div>
            <BHeaderPage>
                <ButtonArrowBack onClick={goTo} />
                Pedidos
            </BHeaderPage>
            <TableOrder list={orders} />
        </div>
    )
}