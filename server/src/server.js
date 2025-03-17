const express = require('express');
const cors = require('cors');
const { getDogsData, getCatsData, getOtherData } = require('./controllers/petController');
const { handleAdoption } = require('./controllers/adoptionController');

const app = express();
app.use(express.json());
app.use(cors());


app.post("/adoption", handleAdoption); 
app.get("/dogs", getDogsData);
app.get("/cats", getCatsData);
app.get("/others", getOtherData);

const PORT = 8080;
app.listen(PORT);

