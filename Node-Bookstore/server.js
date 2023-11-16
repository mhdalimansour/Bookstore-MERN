/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Error Handlers
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!\nShutting down...');
  console.log(err);
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION!\nShutting down...');
  console.log(err);
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});
// End

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(err);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
