import mongoose from 'mongoose';
import { ENUM_CHANGE } from '../utils/constant.js';

const leadSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter your userName'],
  },

  change: {
    type: [String],
    required: [true],
    enum: {
      values: ENUM_CHANGE,
      message: 'change can be either : ' + ENUM_CHANGE.join(' or '),
    },

    validate: {
      validator: function (arr) {
        if (
          !Array.isArray(arr) ||
          arr.length == 0 ||
          arr.forEach((str) => typeof str !== 'string')
        )
          throw new Error('Select at least one change you would like to see');
      },
    },
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
