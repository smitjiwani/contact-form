import express from 'express';
import asyncHandler from 'express-async-handler';
import { getContacts, getContact, createContact, updateContact, deleteContact } from '../controllers/contacts.controller.js';
const router = express.Router();

router.get('/', asyncHandler(getContacts));
router.get('/:id', asyncHandler(getContact));
router.post('/', asyncHandler(createContact));
router.put('/:id', asyncHandler(updateContact));
router.delete('/:id', asyncHandler(deleteContact));

export default router;