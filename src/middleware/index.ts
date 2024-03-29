import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const globalError = (error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) =>{

    res.status(500).send({message:"Something went wrong"});
    return;

}

export const invalidUrl = (req:Request, res:Response) =>{
    res.status(404).send({message:"Invalid URL"});
    return;
}