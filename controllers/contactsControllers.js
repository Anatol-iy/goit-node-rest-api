import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as contactsService from "../services/contactsServices.js";


// GET /api/contacts
const listContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

// GET /api/contacts/:id
const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
};

// REMOVE /api/contacts/:id
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// POST /api/contacts
const createContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  };

// PUT /api/contacts/:id
const updateContactById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    const result = await contactsService.updateContactById({ id, ...updates });
  
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
};