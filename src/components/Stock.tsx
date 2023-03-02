import React, {useEffect, useState} from 'react';
import {ModalNewProducts} from './Products/ModalNewProducts';
import 'primeicons/primeicons.css';
import {Products} from '../utils/@Types';
import '../css/table.css'
import {deleteProduct, getAllProducts} from "../service/ProductService";
import {Button} from './Buttons/Button';
import {BHeaderPage} from "./BHeaderPage";
import {ButtonArrowBack} from "./Buttons/ButtonArrowBack";
import {useNavigate} from "react-router-dom";
import {TableProducts} from "./TableProducts/TableProducts";
import {ModalEditProducts} from "./Products/ModalEditProducts";
import {Modal} from "./Modal";
import {ButtonFD} from "./Buttons/ButtonFooterDialog";

export function Stock() {
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
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

    const handleEditProduct = (product: Products) => {
        setOpenEdit(true);
        setProductSelect(product)
    }
    const handleDeleteProduct = (product: Products) => {
        setOpenDialogDelete(true);
        setProductSelect(product)
    }

    const handleConfirmDelete = ()=>{
        deleteProduct(Number(productSelect.id)).then(response => {
            const data = response.data
            alert(data.message)
            window.location.reload()
        })
    }

    const ModalDelete = (<Modal open={openDialogDelete} close={() => setOpenDialogDelete(false)}
                       title={"Deseja Realmente Deletar Esse Produto?"}>
            <div className="flex flex-1 flex-col w-full gap-1 font-semibold">
                <h2>Nome: {productSelect.name}</h2>
                <h2>Descrição: {productSelect.description}</h2>
                <h2>Quantidade: {productSelect.quantity}</h2>
                <h2>valor: {productSelect.price}</h2>
                <footer className={' flex justify-end'}>
                    <ButtonFD onClick={handleConfirmDelete} id={"b-dialog-red"} style={{backgroundColor: "#ff0000"}}
                              title={"Confirmar"}/>

                </footer>
            </div>

        </Modal>)




    return (
        <div className="m-auto mt-2 ">
            {open && <ModalNewProducts open={open} close={() => setOpen(false)} />}
            {openEdit && <ModalEditProducts open={openEdit}
                close={() => setOpenEdit(false)}
                product={productSelect}
            />}
            {ModalDelete}
            {header}
            <TableProducts handleEdit={handleEditProduct} handleDelete={handleDeleteProduct} list={listProducts} />

        </div>
    );
}