import {sanitizeInput} from "./utils/sanitize";

export class Order {
    _id: string;
    date: string;
    productIds: string[];
    total: number;

    constructor(
        _id: string,
        date: string,
        productIds: string[],
        total: number
    ) {
        this._id = _id;
        this.date = date;
        this.productIds = productIds.map((id) => sanitizeInput(id));
        this.total = total;
    }
}
