import mongoose from 'mongoose';

import Scenario from './scenario';
import User from './user';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = {
  User, 
  Scenario,
};

export { connectDb };

export default models;
