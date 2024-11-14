import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    unique: [true, 'Phone already exists']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  company: {
    type: String,
    required: [true, 'Company is required']
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required']
  }
},
{
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;