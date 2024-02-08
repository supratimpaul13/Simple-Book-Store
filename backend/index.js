import express, { response } from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { Book } from './models/bookmodels.js'
import { request } from "http";


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of CORS(*)
app.use(cors());
// option 2: Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN stack Tutorial");
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });