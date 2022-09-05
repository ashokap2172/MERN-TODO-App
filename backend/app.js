const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(require('./routes'));

app.listen(5000,()=>{
    console.log("listening at PORT 5000");
});