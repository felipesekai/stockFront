import React, { useEffect, useState } from 'react';
import { OrderRequests, Products } from '../../utils/@Types';
import { TableItems } from './TableItems';
import { formatCurrency } from "../../utils/converter";
import { AlterColorRows } from "../../utils/AlterColorRows";
import { Button } from '../Buttons/Button';
import { TableProducts } from '../TableProducts/TableProducts';
import { getProductById, getProductOrder } from '../../service/ProductService';
import { CSSTransition } from 'react-transition-group';
import { TableProductsOder } from './TableProductsOder';


// import { bgColor } from "../utils/Colors.tsx";

interface props {
    order: OrderRequests,
    index: number
}
export function CardOrder({ order, index }: props) {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<Products[]>([])

    const iconString = {
        open: 'pi pi-angle-up',
        close: 'pi pi-angle-down'
    }

    useEffect(() => {
        if (open) {

            getProductOrder(Number(order.id)).then(res => {
                setProducts(res.data)
            })
        } else {
            setProducts([])
        }

    }, [open])

    function openList() {
        setOpen(!open)

    }


    return (
        <>
            <div className='flex border-1 dark:border-bgPrimary items-center' style={AlterColorRows(index)}
            >
                <div className="cell codigo"><TableItems title={order.id} />
                </div>
                <div className="cell nome"> <TableItems title={order.name} />
                </div>
                <div className="cell qtd">
                    <TableItems>
                        {order.product.length > 0 &&
                            <Button title='' onClick={openList}>
                                <i className={open ? iconString.open : iconString.close}>
                                </i>
                            </Button>}

                    </TableItems>

                </div>

                <div className="cell data"> <TableItems title={order.date && order.date} />
                </div>
                <div className="cell hora"><TableItems title={order.hour ? order.hour.toString() : ""} />
                </div>
                <div className="cell metodo">
                    <TableItems title={order.paymentMethod ? order.paymentMethod : "Não Encontrado"} />
                </div>
                <div className="cell valor"> <TableItems title={formatCurrency(Number(order.total))} /></div>

            </div>
            {open && <TableProductsOder list={products} />
            }

        </>
    );
}
