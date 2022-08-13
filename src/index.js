const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const sigkeyRouter = require('./router/sigkey');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./lib/swaggerDoc');

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

mongoose.connect(process.env.MONGO_HOST, {
  maxPoolSize: 20,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useFindAndModify: false,
});

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/sigkey', sigkeyRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
