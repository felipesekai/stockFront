import {Input} from "../Input";
import {Itemli} from "../Itemli";
import React, {useEffect} from "react";
import {TypeProtucts} from "../../utils/@Types";


interface props {
    list: TypeProtucts[],
    itemSelected: TypeProtucts,
    setItemSelect: (item: TypeProtucts)=>void,
    search: (item: string)=>void,

}
export const PickItens= ({list, search, itemSelected, setItemSelect}: props)=>{
    const handleSelect = (item: TypeProtucts)=>{
        setItemSelect(item)

        }

    return (
        <div id={'pickList'} className={'flex-col w-full gap-2  max-w-lg'} >
            <Input type={'search'} placeholder={'Pesquisar Produto'} onChange={(e)=>search(e.target.value)}/>
            <ul className={'flex gap-2 flex-col p-1 overflow-auto h-96 '}>
                {
                    list.map(item=>{return <Itemli itemSelectId={itemSelected.id} onSelectChange={(item)=>handleSelect(item)} key={item.id} item={item}/>})
                }
            </ul>
        </div>
    );
}