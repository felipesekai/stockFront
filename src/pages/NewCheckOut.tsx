import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { getAllProducts } from "../service/ProductService";
import { PickItens } from "../components/PickerList/PickItens";
import { TypeOrder, TypeProtucts } from "../utils/@Types";
import { Input } from "../components/Input";
import { ConfirmOrder } from "../components/NewCheckOut/ConfirmOrder";
import { ButtonArrow } from '../components/Buttons/ButtonArrow';

export function NewCheckOut() {
    const [open, setOpen] = useState<boolean>(false);
    const [listProductsSelected, setListProductsSelected] = useState<TypeProtucts[]>([]);
    const [selectToAdd, setSelectToAdd] = useState<TypeProtucts>({} as TypeProtucts);
    const [selectToRemove, setSelectToRemove] = useState<TypeProtucts>({} as TypeProtucts);
    const [listProducts, setListProducts] = useState<TypeProtucts[]>([]);
    const [search, setSearch] = useState({
        stock: '',
        selected: ''
    });
    const [formData, setFormData] = useState<TypeOrder>({} as TypeOrder);


    const header = (
        <div
            className="flex items-center bg-bgPrimary w-full rounded font-bold py-5 px-4 mt-1 my-3  font-semibold text-xl">
            Registar Saída
        </div>
    );

    const listedFilter = listProducts.filter(product => product.name.toUpperCase().includes(search.stock.toUpperCase()))
    const selectedListedFilter = listProductsSelected.filter(product => product.name.toUpperCase().includes(search.selected.toUpperCase()))


    useEffect(() => {
        getAllProducts().then(response => {
            const data: TypeProtucts[] = response.data
            setListProducts(data)
        })

    }, []);

    function handleAddProduct() {
        if (selectToAdd.id) {
            setListProductsSelected(prevState => [...prevState, selectToAdd]);
            setListProducts(listProducts.filter(item => item.id !== selectToAdd.id && item));
            setSelectToAdd({} as TypeProtucts);
        }
    }

    function handleRemoveProduct() {
        if (selectToRemove.id) {
            setListProducts(prevState => [...prevState, selectToRemove]);
            setListProductsSelected(listProductsSelected.filter(item => item.id !== selectToRemove.id && item));
            setSelectToRemove({} as TypeProtucts);
        }
    }



    const handleSubmitOrder = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const listTemp = [...listProductsSelected]
        console.log(listTemp.length)
        if (listProductsSelected.length) {
            console.log("entrou")
            setFormData({
                ...formData,
                products: listProductsSelected,
                total: formData.total,
            });
            setOpen(true);
        }
    }

    // useEffect(() => {
    //     setFormData({
    //         ...formData, total: calcTotal()
    //     })
    // }, [listProductsSelected])

    return (
        <div className={'flex flex-col'}>
            {open &&
                <ConfirmOrder order={formData} open={open} close={() => setOpen(false)} />

            }
            {header}
            <div className="flex gap-2 p-1 justify-center items-center">
                <Input type={'text'} placeholder={'Nome do Cliente'}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.currentTarget.value })}

                />
                <Input type={'date'} placeholder={'Data'}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, date: e.currentTarget.value })}
                />
            </div>
            <div className="flex gap-2 p-2 justify-center items-center">
                <PickItens
                    itemSelected={selectToAdd}
                    list={listedFilter}
                    search={(s) => setSearch({ ...search, stock: s })}
                    setItemSelect={setSelectToAdd} />
                <div id={'buttons'} className={'flex flex-col gap-2'}>
                    <ButtonArrow onClick={handleAddProduct}><i
                        className={'pi pi-angle-right'}></i></ButtonArrow>
                    <ButtonArrow onClick={handleRemoveProduct} ><i
                        className={'pi pi-angle-left'}></i></ButtonArrow>
                </div>
                <PickItens
                    list={selectedListedFilter}
                    search={(s) => setSearch({ ...search, selected: s })}
                    itemSelected={selectToRemove}
                    setItemSelect={setSelectToRemove} />


            </div>
            <p>{formData.total}</p>
            <button type={'submit'}

                onClick={handleSubmitOrder}
                className={'bg-bgPrimary my-5 ml-auto mr-10 px-14 rounded shadow font-bold'}>
                Confirmar
            </button>
        </div>
    );
}
