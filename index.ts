import { Request, Response, Application } from 'express';
import { ObjectId } from 'mongodb';
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require("dotenv").config();

const app: Application = express();
const port: number = 5000 || process.env.PORT;

// ---> middle ware
app.use(cors());
app.use(express.json());


// ---> database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.76zc9vk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        // ---> db collections
        const postsCollection = client.db("knowledgeTunes").collection("Posts");
        const usersCollection = client.db("knowledgeTunes").collection("Users");


        // ---> test
        app.get('/', (req: Request, res: Response): void => {
            res.send('server is running');
        });

        // ---> all post get
        app.get('/posts', async (req: Request, res: Response) => {
            const query = {};
            const result = await postsCollection.find(query).toArray();
            res.send(result)
        });
        // ---> post details  get
        app.get('/post/:id', async (req: Request, res: Response) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await postsCollection.findOne(query);
            res.send(result)
        });

        // ---> category get
        app.get('/category/:name', async (req: Request, res: Response) => {
            const name = req.params.name;
            const query = { category: name };
            const result = await postsCollection.find(query).toArray();
            res.send(result)
        });

        // ---> userinfo store
        app.put('/users', async (req: Request, res: Response) => {
            const users = req.body;
            const query = { email: users.email };
            const findUser = await usersCollection.findOne(query);
            if (findUser) {
                return res.send({ acknowledged: true })
            }
            const result = await usersCollection.insertOne(users);
            res.send(result)
        })


    } finally { }
}
run().catch(err => console.log(err))





app.listen(port, (): void => {
    console.log('Knowledge Tunes server running from port', port);
});

