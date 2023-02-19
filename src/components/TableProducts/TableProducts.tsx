import {CardProducts} from "./CardProducts";
import React from "react";
import {Products} from "../../utils/@Types";

interface Props {
    list: Products[];

}

export const TableProducts = ({list}: Props)=>{
    const footer = `Total de Produtos: ${list ? list.length : 0}.`;

    return(
        <table className="table-auto w-full">
            <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
            <tr className='rounded'>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Estoque</th>
                <th>Valor</th>
            </tr>
            </thead>
            <tbody>
            {list.map((item, index) => <CardProducts key={index} product={item} index={index} />)}

            </tbody>
            <tfoot>
            {footer}
            </tfoot>
        </table>
    );
}