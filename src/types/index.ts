import { Request } from 'express';

export const messages: { [id: string]: string } = {};

export interface BurnRequest extends Request {
    messageContent?: string;
}