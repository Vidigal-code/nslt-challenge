export interface NotificationPort {
    publish(message: Record<string, any>): Promise<void>;
}

