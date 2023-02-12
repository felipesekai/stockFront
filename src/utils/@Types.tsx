export type TypeProtucts = {
    id?: string;
    name: string;
    description: string;
    quantity: number;
    price: string | number;
}

// export type PickerProduct = TypeProtucts & {
//     selected: boolean
// }

export type TypeOrder = {
    id?: string;
    name: string;
    total: number;
    products: TypeProtucts[];
    date?: string;
    hour?: number;
}