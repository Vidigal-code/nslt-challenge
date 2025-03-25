import {sanitizeInput} from "./utils/sanitize";

export class Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    categoryIds: string[];
    imageUrl: string;

    constructor(
        _id: string,
        name: string,
        description: string,
        price: number,
        categoryIds: string[],
        imageUrl: string
    ) {
        this._id = _id;
        this.name = sanitizeInput(name);
        this.description = sanitizeInput(description);
        this.price = price;
        this.categoryIds = categoryIds.map((id) => sanitizeInput(id));
        this.imageUrl = sanitizeInput(imageUrl);
    }
}
