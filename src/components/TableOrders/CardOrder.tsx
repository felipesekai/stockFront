import React from 'react';
import {OrderRequests} from '../../utils/@Types';
import {TableItems} from './TableItems';
import {formatCurrency} from "../../utils/converter";
import {AlterColorRows} from "../../utils/AlterColorRows";

// import { bgColor } from "../utils/Colors.tsx";

interface props {
    order: OrderRequests,
    index: number
}
export function CardOrder({ order, index }: props) {

    return (
        <tr className='border-1 dark:border-bgPrimary' style={AlterColorRows(index)}
        >
            <td><TableItems title={order.id} />
            </td>
            <td> <TableItems title={order.name} />
            </td>
            <td> <TableItems title={order.product && order.product.length.toString()} />
            </td>
            <td> <TableItems title={order.date && order.date} />
            </td>
            <td><TableItems title={order.hour ? order.hour.toString() : ""} />
            </td>
            <td> <TableItems title={formatCurrency(Number(order.total))} /></td>
        </tr>
    );
}
