import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';


const app = express();

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('review-me');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}

app.get('/api/reviews/:name', async (req, res) => {
    withDB(async (db) => {
        const reviewName = req.params.name;

        const reviewsInfo = await db.collection('reviews').findOne({ name: reviewName });
        res.status(200).json(reviewsInfo);
    }, res);
})

app.post('/api/reviews/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const reviewName = req.params.name;

        
        const reviewsInfo = await db.collection('reviews').findOne({ name: reviewName });
        await db.collection('reviews').updateOne({ name: reviewName }, {
            '$set': {
                upvotes: reviewsInfo.upvotes + 1,
            },
        });
        const updatedReviewInfo = await db.collection('reviews').findOne({ name: reviewName });

        res.status(200).json(updatedReviewInfo);
    }, res);
});

app.post('/api/reviews/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const reviewName = req.params.name;

    withDB(async (db) => {
        const reviewsInfo = await db.collection('reviews').findOne({ name: reviewName });
        await db.collection('reviews').updateOne({ name: reviewName }, {
            '$set': {
                comments: reviewsInfo.comments.concat({ username, text }),
            },
        });
        const updatedReviewInfo = await db.collection('reviews').findOne({ name: reviewName });

        res.status(200).json(updatedReviewInfo);
    }, res);
});


app.listen(8000, () => console.log('Listening on port 8000'));