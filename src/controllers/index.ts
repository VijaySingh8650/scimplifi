import { Request, Response } from "express";
import fs from "fs";

let sessionId = Date.now().toString();

export const getSessionId = (req:Request, res:Response) =>{
     sessionId += req.sessionID;
     res.status(200).send({Session_id: sessionId});
     return;
}

export const uploadFilesUsingSessionId = async(req:Request, res:Response) =>{
     const {session_id} = req.params;
     try{

          if (session_id === sessionId) {
               const uploadedFiles: any = req.files;
               let calculate: number = 0;
   
               for (const file of uploadedFiles) {
                   const data = await fs.promises.readFile(file.path, 'utf-8');
                   calculate += eval(data);
               }
   
               if (uploadedFiles.length > 15) {
                   const deletedFiles = uploadedFiles.splice(0, uploadedFiles.length - 15);
                   for (const file of deletedFiles) {
                       const data = await fs.promises.readFile(file.path, 'utf-8');
                       calculate -= eval(data);
                       await fs.promises.unlink(file.path);
                   }
               }
   
               res.status(200).send({ Result: calculate });
           }
           else{

               res.status(401).send({message:"UnAuthorized"});
               return;

           }
     }
     catch(err){
          res.status(500).send({message:"Something went wrong"});
     }
}


export const deleteSessionId = (req:Request, res:Response) =>{
     
     const {session_id} = req.params;
     if(sessionId === session_id){

          res.status(200).send({message:"SessionId deleted successfully"});
          return;
     }
     else{
          res.status(401).send({message:"UnAuthorized"});
          return;
     }
}