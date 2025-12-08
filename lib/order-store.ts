
import fs from 'fs';
import path from 'path';

// Path to the JSON file
const DB_PATH = path.join(process.cwd(), 'data', 'orders-db.json');

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

// In-memory cache
let orderCache: Map<string, Order> | null = null;

// Initialize cache from file
function initCache() {
    // Always reload to ensure newest data (dev mode fix)
    // if (orderCache) return; 

    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            const orders = JSON.parse(data);
            // Convert object to Map
            orderCache = new Map(Object.entries(orders));
        } else {
            orderCache = new Map();
        }
    } catch (error) {
        console.error('Error reading order DB:', error);
        orderCache = new Map();
    }
}

// Save cache to file
function saveCache() {
    if (!orderCache) return;

    try {
        const orders = Object.fromEntries(orderCache);
        fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing order DB:', error);
    }
}

export const OrderStore = {
    get: (orderCode: string): Order | undefined => {
        initCache();
        return orderCache?.get(orderCode);
    },

    set: (orderCode: string, order: Order): void => {
        initCache();
        orderCache?.set(orderCode, order);
        saveCache();
    },

    getAll: (): Order[] => {
        initCache();
        return Array.from(orderCache?.values() || []);
    }
};
