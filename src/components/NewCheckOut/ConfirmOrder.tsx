import {Modal} from "../Modal";
import React, {useCallback, useEffect, useState} from "react";
import {Order, Products} from "../../utils/@Types";
import {TrProductsConfirm} from "./TrProductsConfirm";
import {Button} from "../Buttons/Button";
import {registerNewOrder} from "../../service/OrderService";
import {formatCurrency} from "../../utils/converter";
import {Select} from "../Select";

interface props {
    order: Order,
    open: boolean,
    close: () => void
}

export const ConfirmOrder = ({order, open, close}: props) => {
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);


    useEffect(() => {
        if (
            order.products !== undefined
        ) {
            const list = [...order.products]
            setListProducts([...order.products])
            list.forEach((item, index) => {
                item.quantity = 1
            })

            setListProducts(list)
            setTotal(calcTotal())
        } else {
            alert("Ocorreu um erro")
        }
    }, []);


    function calcTotal() {
        let total = 0
        listProducts.forEach((item) =>
            total += Number(item.price.toString().replace(',', '.')) * item.quantity
        )
        return total;
    }

    useEffect(() => {
        setTotal(calcTotal())
    }, [listProducts])

    function onChangeSelect(index: number, qtd: number) {
        const itemTemp = [...listProducts]
        itemTemp[index].quantity = qtd
        setListProducts(itemTemp)

    }

    function handleConfirmOrder() {
        const newOrder: Order = {
            name: order.name ? order.name : '',
            date: order.date ? order.date : undefined,
            products: listProducts,
            total: total,
            paymentMethod: paymentMethod
        }

        registerNewOrder(newOrder).then(r => {
            if (r.data.title) {
                alert(r.data.message);

            } else {
                alert("Registro Cadastrado Com Sucesso!");
                window.location.reload()
            }

        }).catch((r) => {
            // alert("Houve um erro ao Tentar Registrar uma nova Saida")
            alert(r)
            console.log(r)
        })
    }

    const handleSelectPaymentsMethod = useCallback((e : React.ChangeEvent<HTMLSelectElement>)=>{
        setPaymentMethod(e.target.value)
    },[setPaymentMethod])

    return (
        <Modal open={open} close={close} title={"Confirmar Pedido"}>
            <div className={'flex flex-col '}>
                <div className={'flex gap-2'}>
                    <h4 className={'flex-1 text-md'}>Nome: {order.name}</h4>
                    <h4 className={'flex-1 text-md'}>Data: {order.date}</h4>

                </div>

                <table className="table-auto w-full">
                    <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
                    <tr className='rounded'>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Qtd</th>
                        <th>Preço</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listProducts.map((item, index) => <TrProductsConfirm
                        key={index}
                        product={item}
                        index={index}
                        onChangeSelect={(index, qtd) => onChangeSelect(index, qtd)}
                    />)}

                    </tbody>
                </table>

                <div className="flex justify-center mt-2">
                    <Select onChange={handleSelectPaymentsMethod}></Select>


                </div>
                <h4 className={'flex text-md w-full justify-end px-4 py-2'}>
                    {"Total: " + formatCurrency(total)}
                </h4>
                <Button onClick={handleConfirmOrder} title={"Confirmar"}/>
            </div>
        </Modal>
    );
}