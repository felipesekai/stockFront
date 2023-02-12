import React, { useCallback, useState } from 'react';
import { Modal } from './Modal';
import { get } from '../database/Local';
import { api } from '../service/api';
import { Products } from '../utils/@Types';
import { KEYLISTPRODUCTS } from '../utils/Keys';
import { InputText } from 'primereact/inputtext';

import { InputNumber } from 'primereact/inputnumber';


import { formatarMoeda } from '../utils/converter';
import {registerProduct} from "../service/ProductService";
interface props {
    open: boolean;
    close: () => void
}

export function ModalNewProducts({ open, close }: props) {

    const [formData, setFormData] = useState<Products>({} as Products);

    const onInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        const targetInput = event.currentTarget
        const { value, name } = targetInput
        setFormData({
            ...formData,
            [name]: value
        })

    }, [setFormData, formData])

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let product = formData;
        product.price = product.price.toString().replace(',', '.')
       registerProduct(product).then((response) => {
            alert('Product saved successfully');
            window.location.reload()
        });

    }, [formData])

    return (
        <Modal title='Cadastrar novo Produto' open={open} close={close}>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Nome</label>
                    <input name='name' required
                        value={formData.name}
                        onChange={onInputChange}
                        type='text' className='border-2 rounded border-bgPrimary h-10' />
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>Descrição</label>
                    <InputText
                        value={formData.description}
                        name='description'
                        onChange={onInputChange}
                        type='text' className='border-2 rounded border-bgPrimary h-10' maxLength={250} />
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>quantidade</label>
                    <input
                        value={formData.quantity}
                        name='quantity' onChange={onInputChange} required type='number' className='border-2 rounded border-bgPrimary h-10' />
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>Valor <span className={'bg-red'}>*</span></label>
                    <input
                        onChange={(e) => setFormData({ ...formData, price: formatarMoeda(e.target.value) })}
                        value={formData.price}
                        required
                        name='price' type='text'
                        step="0.01"
                        className='border-2 rounded border-bgPrimary h-10' />
                </div>
                <input className='bg-bgPrimary rounded px-7 py-3 my-2 ml-auto font-bold ' type='submit' value={'Cadastrar'} />
            </form>


        </Modal>
    );
}