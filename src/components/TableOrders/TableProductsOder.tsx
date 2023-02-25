
import { Products } from "../../utils/@Types";
import { CardProducts } from "../TableProducts/CardProducts";

interface Props {
    list: Products[];
    // handleEdit: (products: Products) => void

}

export const TableProductsOder = ({ list }: Props) => {
    return (
        <table className="table-auto w-full">
            <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
                <tr className='rounded'>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => <CardProducts handlePressCard={() => { }} key={index} product={item} index={index} />)}
            </tbody>

        </table>
    );
}