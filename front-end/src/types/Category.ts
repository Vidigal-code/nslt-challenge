import { sanitizeInput } from "./utils/sanitize";

export class Category {
    _id: string;
    name: string;

    constructor(
        _id: string,
        name: string
    ) {
        this._id = _id;
        this.name = sanitizeInput(name);
    }
}
