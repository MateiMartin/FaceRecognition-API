require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controlers/register');
const signin = require('./controlers/signin');
const image = require('./controlers/image');
const clarifai = require('./controlers/imageURL');
const top = require('./controlers/top3');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
});



const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.json('server is working') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handelRegister(req, res, db, bcrypt) })

app.put('/image', (req, res) => { image.handelImage(req, res, db) });

app.post('/imageUrl', (req, res) => { clarifai.handelApiCall(req, res) });

app.get('/top3', (req, res) => { top.top(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})
