// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi.yaml'));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Cheat Buster API is running!');
});

// Use our user routes for any path starting with /api
app.use('/api', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server start
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});