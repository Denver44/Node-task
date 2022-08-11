import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter your userName'],
  },
  change: {
    type: [String],
    required: [true, 'Select all the changes you would like to see'],
  },

  struggleWithSleep: {
    type: String,
    required: [
      true,
      'Please tell us you how long you are struggling with your sleep',
    ],
  },

  BedTime: {
    type: String,
    required: [true, 'Please tell us at what time do you go to bed'],
  },

  wakeUpTime: {
    type: String,
    required: [true, 'Please tell us at what time do you wake Up to'],
  },

  sleepHours: {
    type: Number,
    required: [true, 'Please tell us your Sleep hours'],
  },
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
