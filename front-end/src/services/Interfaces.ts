import {Category} from "../types/Category";
import {Order} from "../types/Order";
import {Product} from "../types/Product";

export interface CategoryFormProps {
    onSubmit: () => void;
    initialData?: Category | null;
}

export interface OrderFormProps {
    onSubmit: () => void;
    initialData?: Order | null;
    allProducts: string[];
}

export interface ProductFormProps {
    onSubmit: () => void;
    initialData?: Product | null;
}