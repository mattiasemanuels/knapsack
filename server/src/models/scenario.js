import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const scenarioSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
  },
  items: {
    type: [itemSchema]
  }
});

const Scenario = mongoose.model('Scenario', scenarioSchema);

export default Scenario;