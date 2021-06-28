import type { Context, NarrowedContext } from "telegraf";
import type { Update, Message } from "typegram";

export type CommandContext = NarrowedContext<Context, Update> & {
    message: Message.TextMessage;
};

export interface Customer {
    id: number;
    email: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    id: string;
    item: string;
    customerId: number;
    quantity: number;
    price: number;
    paid: boolean;
    payment: string;
    token: string;
    createdAt: string;
    updatedAt: string;
}

export interface CommandProps {
    name: string;
    description: string;
    aliases: string[];
    cooldown?: number;
    ownerOnly?: boolean;
}

export interface CategoryConfig {
    name: string;
    hidden: boolean;
    commands: CommandProps[];
    path: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    stocks: number;
    description: string;
}