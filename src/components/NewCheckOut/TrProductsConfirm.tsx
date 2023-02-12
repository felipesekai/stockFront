import React, {ChangeEvent, SelectHTMLAttributes, useEffect} from 'react';
import {Products} from "../../utils/@Types";
import {TableItems} from "../TableProducts/TableItems";
import {formatCurrency} from "../../utils/converter";



interface props {
    product: Products,
    index: number,
    onChangeSelect: (index: number, number: number)=>void
}
export function TrProductsConfirm({ product, index, onChangeSelect }: props) {

    const options = [
    ]

    for(let i = 1; i < 101; i++){
        options.push(i)
    }
    function handlePressCard() {
        window.alert("pressionou")
    }
    function onSelect(e: ChangeEvent<HTMLSelectElement>) {
        onChangeSelect(index, Number(e.target.value))
        // product.quantity = Number(e.target.value)
    }

    return (
        <tr className='border-1 dark:border-bgPrimary' style={{ backgroundColor: index % 2 > 0 ? '#808080' : '#A9A9A9' }}
        >
            <td><TableItems title={product.id} />
            </td>
            <td> <TableItems title={product.name} />
            </td>
            <td><select onChange={onSelect}>
                {options.map((op=> {
                    return <option key={op}>{op}</option>
                }))}
                <option>1</option>
            </select>
            </td>
            <td> <TableItems title={formatCurrency(Number(product.price))} /></td>
        </tr>
    );
}
