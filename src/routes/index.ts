import express from 'express';
import multer from 'multer';


import {deleteSessionId, getSessionId, uploadFilesUsingSessionId} from "../controllers";

const app = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads'); 
    },
    filename: function(req, file, cb) {
        
      cb(null, Date.now()+"--"+file.originalname); 
    }
});

const upload = multer({ storage: storage });

app.route("/v1/create-session").get(getSessionId);
app.route("/v1/delete-session/:session_id").delete(deleteSessionId);
app.route("/v1/upload-file/:session_id").post(upload.array('files', 15), uploadFilesUsingSessionId);

export default app;