import Contact from '../models/contacts.model.js';

const handleUniqueFieldError = (error) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return field === 'email' ? 'Email must be unique' : 'Phone must be unique';
  }
  return error.message;
};

export const createContact = async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    const errorMessage = handleUniqueFieldError(error);
    res.status(400).json({ error: errorMessage });
  }
};

export const getContacts = async (req, res) => {
  const { offset, limit } = req.query;

  try {
    const contacts = await Contact.find().skip(parseInt(offset)).limit(parseInt(limit));
    res.status(200).json({
      contacts,
      total: await Contact.countDocuments(),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
  } catch (error) {
    const errorMessage = handleUniqueFieldError(error);
    res.status(400).json({ error: errorMessage });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};