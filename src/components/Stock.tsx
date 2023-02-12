import React, { useEffect, useState } from 'react';
import { ModalNewProducts } from './ModalNewProducts';
import { TrProducts } from './TableProducts/TrProducts';
import 'primeicons/primeicons.css';
import { Products } from '../utils/@Types';
import '../css/table.css'
import { getAllProducts } from "../service/ProductService";
import { Button } from './Button';

export function Stock() {
    const [open, setOpen] = useState<boolean>(false);
    const [listProducts, setListProducts] = useState<Products[]>([]);

    const header = (
        <div className="flex items-center bg-bgPrimary w-full rounded font-bold mt-1 my-3 px-2 font-semibold text-2xl">
            Produtos
            <Button onClick={() => setOpen(!open)} title={"Cadastrar Produto"}><i className="pi pi-plus"></i></Button>

        </div>
    );
    const footer = `In total there are ${listProducts ? listProducts.length : 0} products.`;


    useEffect(() => {
        getAllProducts().then(async response => {
            const data: Products[] = response.data
            setListProducts(data)
        })
    }, [])
    return (
        <div className="m-auto mt-2 w-[70%]">

            <ModalNewProducts open={open} close={() => setOpen(false)} />
            {header}
            <table className="table-auto w-full">
                <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3'>
                    <tr className='rounded'>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Estoque</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.map((item, index) => <TrProducts key={index} product={item} index={index} />)}

                </tbody>
                <tfoot>
                    {footer}
                </tfoot>
            </table>
        </div>
    );
}