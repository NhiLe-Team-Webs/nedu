// In-memory cache
// NOTE: This data is ephemeral and will be lost on server restart.
// For production, use a real database (e.g., Supabase, PostgreSQL, MongoDB).
const orderCache = new Map<string, Order>();

export interface Order {
    orderCode: string;
    amount: number;
    status: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
    customerInfo: {
        fullName: string;
        email: string;
        phone: string;
        telegram: string;
    };
    programId?: string;
    programIds?: string[];
    transactionId?: string;
    transferAmount?: number;
    transactionDate?: string;
    gateway?: string;
}

export const OrderStore = {
    get: (orderCode: string): Order | undefined => {
        return orderCache.get(orderCode);
    },

    set: (orderCode: string, order: Order): void => {
        orderCache.set(orderCode, order);
    },

    getAll: (): Order[] => {
        return Array.from(orderCache.values());
    }
};
