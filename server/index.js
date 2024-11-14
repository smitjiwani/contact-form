import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './src/routes/index.route.js';
import connectDB from './src/db/db.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use('/api', routes);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Mongoose Connection Error', error);
  });

export default app;