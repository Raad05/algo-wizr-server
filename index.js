const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const categories = require('./Data/categories.json');

const uri = "mongodb+srv://dbUser01:wMnkxV8aWZGDtgyy@cluster0.dq2ahkq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const userCollection = client.db('mongodbCRUD').collection('courses');
        const orderCollection = client.db('mongodbCRUD').collection('orders');

        app.get('/course-categories', (req, res) => {
            res.send(categories);
        });

        app.get('/courses', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses)
        });

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = {};
            const cursor = userCollection.find(query);
            const courses = await cursor.toArray();

            if (id === '00')
                res.send(courses);
            else {
                const category = courses.filter(course => course.category_id === id);
                res.send(category);
            }
        });

        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.customer) {
                query = {
                    customer: req.query.customer
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        });
    }
    finally { }
}

run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Server is active.');
});

app.listen(port, () => {
    console.log('Server is active on port: ', port);
});