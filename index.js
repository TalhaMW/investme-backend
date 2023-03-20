const express = require('express');
const { errorMiddleware } = require('./Middleware/errorMiddleware');
const connectDB = require('./config/db');

const app = express();

connectDB();

// using express parser so we can parse body and urlEncoded value
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// endpoints
app.use('/api/user', require('./routes/api/users'));
//

// error middleware
app.use(errorMiddleware);
//

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Slowly Slowly started Server on PORT ' + PORT);
});
