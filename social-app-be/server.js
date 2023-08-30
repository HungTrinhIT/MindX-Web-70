import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { connectToDB } from './configs/db.config.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
const PORT = 3001;

const whitelist = ['http://localhost:3000'];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

//Connect to database
connectToDB();

// Define globals middlewares
app.use(express.json());
app.use(cors('*'));

// routes
app.use('/api/v1', router);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running at PORT ${PORT}`);
});
