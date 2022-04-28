const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();

require('./models/db');

const usersRouter = require('./routes/usersRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const productsRouter = require('./routes/productsRoutes');
const cartRouter = require('./routes/orderRoutes');

app.use(express.json());
app.use(cors());
//app.use(express.static(__dirname + '/views/Fruitkha/src/assets'));

app.use(['/auth'], usersRouter);
app.use(['/categories'], categoriesRouter);
app.use(['/products'], productsRouter);
app.use(['/cart'], cartRouter);

app.listen(3000, ()=>{
    console.log("app is listen on port 3000");
})