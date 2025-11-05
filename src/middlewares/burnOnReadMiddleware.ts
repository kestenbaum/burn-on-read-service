// src/middleware/BurnOnReadMiddleware.ts
import { Response, NextFunction } from 'express';
import { BurnRequest, messages } from '../types'; 

export const burnOnReadMiddleware = (
    req: BurnRequest, 
    res: Response, 
    next: NextFunction
) => {
    const messageId = req.params.id; 
    const messageContent = messages[messageId]; 

    if (messageContent) {
        delete messages[messageId]
        req.messageContent = messageContent; 
        next(); 
    } 
};