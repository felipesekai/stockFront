import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHome } from '../components/CardHome';


export function Home() {
    const navigate = useNavigate();
    function to(item: string) {
        navigate(item);
    }
    return (
        <div className='flex flex-1, h-[100hv] justify-center items-center pt-10'>
            {/*<div className='grid grid-cols-4 gap-2 h-[200px] items-center px-2' >*/}
            <div className='flex gap-2 p-2 h-[200px] items-center' >
                <CardHome
                    onClick={() => to('/newcheckout')}
                    iconName='pi pi-box' text='Registrar Saida' />
                <CardHome
                    onClick={() => to('/products')}
                    iconName='pi pi-box' text='Ver Estoque' />
                <CardHome
                    onClick={() => to('/orders')}
                    iconName='pi pi-box' text='Ver Pedidos' />

            </div>
            {/*</div>*/}
        </div>
    );
}