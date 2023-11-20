const express = require("express");
var cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const userRoutes = require('./routes/user_routes')
const carRoutes = require('./routes/car_routes')
const rentRoutes = require('./routes/rent_routes')
const returncarRoutes = require('./routes/returncar_routes')

const app = express();
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", carRoutes);
app.use("/api", rentRoutes);
app.use("/api", returncarRoutes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("==> Connect MongoDB Atlas"))
    .catch(() => console.error("Error conection") )

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
})