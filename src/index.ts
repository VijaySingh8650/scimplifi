import express from 'express';
import session from 'express-session';
import router from "./routes";
import { globalError, invalidUrl } from './middleware';


const app = express();

app.use(express.json());

app.use(session({
    secret: '123123',
    resave: false,
    saveUninitialized: true
}));

app.use("/api",router);
app.use("/*", invalidUrl);

// app.use(globalError);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})
