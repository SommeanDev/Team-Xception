import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

dotenv.config();

//Initialize app
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json())

//Load Service Account key
const serviceAccount = JSON.parse(await readFile('./firebaseDatabasePrivateKey.json'));

//Initialize firebase sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();
const auth = admin.auth();

app.post('/register', async(req, res) => {
    try {
        const { email, password, username } = req.body

        if(!email || !password || !username) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await auth.createUser({
            email,
            password,
            username
        })

        await db.collection('users').doc(user.uid).set({
            email,
            username,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })

        res.json({message: "user created successfully", uid: user.uid});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = await auth.getUserByEmail(email);
        const token = await auth.createCustomToken(user.uid);
        res.json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to login' });
    }
})


app.get('/users', async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/posts', async (req, res) => {
    try {
        const snapshot = await db.collection('posts').get();
        const data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/comments', async (req, res) => {
    try {
        const snapshot = await db.collection('comments').get();
        const data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/users', async (req, res) => {
    try {
        const newData = req.body;
        const docRef = db.collection('users').add(newData)
        res.json({id: docRef.id, ...newData});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/posts', async (req, res) => {
    try {
        const newData = req.body;
        const docRef = db.collection('posts').add(newData)
        res.json({id: docRef.id, ...newData});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/comments', async (req, res) => {
    try {
        const newData = req.body;
        const docRef = db.collection('comments').add(newData)
        res.json({id: docRef.id, ...newData});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})