export interface OrderNotificationPort {
    notify(order: {
        _id: string;
        total: number;
        productIds: string[];
        date: Date;
    }): Promise<void>;
}

