import React from 'react';
import { Products } from '../../utils/@Types';
import { TableItems } from './TableItems';
import {formatCurrency} from "../../utils/converter";
// import { bgColor } from "../utils/Colors.tsx";

interface props {
    product: Products,
    index: number
}
export function TrProducts({ product, index }: props) {


    function handlePressCard() {
        window.alert("pressionou")
    }
    return (
        <tr className='border-1 dark:border-bgPrimary' style={{ backgroundColor: index % 2 > 0 ? '#808080' : '#A9A9A9' }}
        >
            <td><TableItems title={product.id} />
            </td>
            <td> <TableItems title={product.name} />
            </td>
            <td> <TableItems identify={1} title={product.description?.toString()} />
            </td>
            <td><TableItems title={product.quantity.toString()} />
            </td>
            <td> <TableItems title={formatCurrency(Number(product.price))} /></td>
        </tr>
    );
}
