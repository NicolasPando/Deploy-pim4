import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()

export class LoggerMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        console.log(`Ejecutando metodo ${req.method} en la ruta ${req.originalUrl} `);
        next();
    }
}

export function LoggerGlobalMiddleware(req:Request,res:Response,next:NextFunction){
    const currentDateTime = new Date().toLocaleString();
    console.log(`[${currentDateTime}:] Ejecutando metodo ${req.method} en la ruta ${req.originalUrl} `);
        next();
}

