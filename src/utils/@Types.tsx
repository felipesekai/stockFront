export type Products = {
    id?: string;
    name: string;
    description: string;
    quantity: number;
    price: string | number;
}

// export type PickerProduct = TypeProtucts & {
//     selected: boolean
// }

export type Order = {
    id?: string;
    name: string;
    total: number;
    products: Products[];
    date?: string;
    hour?: number;
}
export type OrderRequests = {
    id?: string;
    name: string;
    total: number;
    product: any[];
    date?: string;
    hour?: number;
}