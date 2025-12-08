import { UpdateOrderDto } from '../dto/order.dto';

export class UpdateOrderCommand {
    constructor(public readonly id: string, public readonly payload: UpdateOrderDto) {}
}

