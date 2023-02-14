import React from "react";
import { OrderRequests} from "../../utils/@Types";
import {CardOrder} from "./CardOrder";

interface TableOrderProps {
    list: OrderRequests[]
}
export const TableOrder = ({list}: TableOrderProps)=>{
    return(
        <table className="table-auto w-full">
            <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
            <tr className='rounded'>
                <th>Código</th>
                <th>Nome</th>
                <th>Qtd Produtos</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Valor Total</th>
            </tr>
            </thead>
            <tbody>
            {list.map((item, index) => <CardOrder key={index} order={item} index={index} />)}

            </tbody>

        </table>
    );
}