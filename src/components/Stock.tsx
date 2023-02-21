import React, { useEffect, useState } from 'react';
import { ModalNewProducts } from './Products/ModalNewProducts';
import 'primeicons/primeicons.css';
import { Products } from '../utils/@Types';
import '../css/table.css'
import { getAllProducts } from "../service/ProductService";
import { Button } from './Buttons/Button';
import { BHeaderPage } from "./BHeaderPage";
import { ButtonArrowBack } from "./Buttons/ButtonArrowBack";
import { useNavigate } from "react-router-dom";
import { TableProducts } from "./TableProducts/TableProducts";
import {ModalEditProducts} from "./Products/ModalEditProducts";

export function Stock() {
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [productSelect, setProductSelect] = useState<Products>({} as Products);
    const [listProducts, setListProducts] = useState<Products[]>([]);

    const navigate = useNavigate();

    function goTo() {
        navigate("/")
    }

    const header = (
        <BHeaderPage>
            <ButtonArrowBack onClick={goTo} />
            Produtos
            <Button onClick={() => setOpen(!open)} title={"Cadastrar Produto"}><i className="pi pi-plus"></i></Button>

        </BHeaderPage>
    );


    useEffect(() => {
        getAllProducts().then(async response => {
            const data: Products[] = response.data
            setListProducts(data)
        })
    }, [])

    const handleEditProduct = (product: Products)=>{
            setOpenEdit(true);
            setProductSelect(product)
    }
    return (
        <div className="m-auto mt-2 ">
            {open &&<ModalNewProducts open={open} close={() => setOpen(false)}/>}
            {openEdit &&<ModalEditProducts open={openEdit}
                                close={() => setOpenEdit(false)}
                                product={productSelect}
            />}
            {header}
            <TableProducts handleEdit={handleEditProduct} list={listProducts} />

        </div>
    );
}