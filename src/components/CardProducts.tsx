import React from 'react';
import { TableItems } from './TableItems';
// import { bgColor } from "../utils/Colors.tsx";

export function CardProducts() {
    function handlePressCard() {
        window.alert("pressionou")
    }
    return (

        // <button className='my-1 w-full bg-opacity-100' onClick={handlePressCard}>

        <button
            onClick={handlePressCard}
            className="
        shadow-sm
        my-1 border-x-bgPrimary border-x-2 mt-1 w-full justify-between gap-1 flex flex-row"
        >

            <TableItems title='1234345345' />
            <TableItems title='Conjuntos' />
            <TableItems identify={1} title='conjunto de roupas com 3 peças short camisa cinto' />
            <TableItems title='25' />
            <TableItems title='75' />
            <TableItems title='150,00' />

        </button>
        // </button>
    );
}