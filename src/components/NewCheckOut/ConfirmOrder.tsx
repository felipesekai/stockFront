import {DialogEdit} from "../DialogEdit";
import React, {useEffect, useState} from "react";
import {TypeOrder, TypeProtucts} from "../../utils/@Types";
import {TrProductsConfirm} from "./TrProductsConfirm";
import {Button} from "../Button";
import {registerNewOrder} from "../../service/OrderService";

interface props  {
    order: TypeOrder
    open: boolean,
    close: () => void
}
export const ConfirmOrder = ({order, open, close}:props)=>{
    const [listProducts, setListProducts] = useState<TypeProtucts[]>([]);
    const [total, setTotal] = useState<number>(0);


    useEffect(()=>{
    if(
        order.products !== undefined
    ){
        const list = [...order.products]
        setListProducts([...order.products])
        list.forEach((item,index)=>{
            item.quantity=1
        })

        setListProducts(list)
        setTotal(calcTotal())
    }else{
       alert("Ocorreu um erro")
    }
    },[]);


    function calcTotal() {
        let total = 0
        listProducts.forEach((item) =>
            total += Number(item.price.toString().replace(',', '.')) * item.quantity
        )
        return total;
    }

    useEffect(()=>{
        setTotal(calcTotal())
    },[listProducts, setListProducts])

     function onChangeSelect(index: number, qtd: number) {
        const itemTemp = [...listProducts]
         itemTemp[index].quantity = qtd
        setListProducts(itemTemp)

    }

    function handleConfirmOrder(){
        const newOrder: TypeOrder = {
            name: order.name ? order.name : '',
            date: order.date? order.date : undefined,
            products: listProducts,
            total: total
        }

        registerNewOrder(newOrder).then(r => {
            alert("Registro Cadastrado Com Sucesso!");
            window.location.reload()
        }).catch((error)=>{
            alert("Houve um erro ao Tentar Registrar uma nova Saida")
            alert(error.message)
        })
    }

    return (
            <DialogEdit open={open} close={close} title={"Confirmar Pedido"}>
                <div className={'flex flex-col '}>
                    <div className={'flex gap-2'}>
                        <h4 className={'flex-1 text-md'}>Nome: {order.name}</h4>
                        <h4 className={'flex-1 text-md'}>Data: {order.date}</h4>

                    </div>

                    <table className="table-auto w-full">
                        <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3'>
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
                            onChangeSelect={(index, qtd)=>onChangeSelect(index, qtd)}
                        />)}

                        </tbody>
                    </table>
                    <h4 className={'flex text-md w-full justify-end px-4 py-2'}>
                        {"Total: "+total}
                    </h4>
                    <Button onClick={handleConfirmOrder} title={"Confirmar"}/>
                </div>
            </DialogEdit>
    );
}