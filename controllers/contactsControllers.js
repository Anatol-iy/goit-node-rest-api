import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as contactsService from "../services/contactsServices.js";

// GET /api/contacts
const listContacts = async (req, res) => {
  const { id: userId } = req.user;
  const result = await contactsService.listContacts({ owner: userId });
  res.json(result);
};

// GET /api/contacts/:id
const getContactById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const result = await contactsService.getContactById(id, userId);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// DELETE /api/contacts/:id
const removeContact = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const result = await contactsService.removeContact(id, userId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// POST /api/contacts
const createContact = async (req, res) => {
  const { id: userId } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner: userId });
  res.status(201).json(result);
};

// PUT /api/contacts/:id
const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const result = await contactsService.updateContactById(id, userId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// PATCH /api/contacts/:id/favorite
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { id: userId } = req.user;

  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Missing or invalid 'favorite' field");
  }

  const result = await contactsService.updateStatusContact(id, userId, { favorite });

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  createContact: ctrlWrapper(createContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
