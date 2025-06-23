import Contact from "../db/Contact.js";

// Get all contacts of the user
export const listContacts = ({ owner }) => {
  return Contact.findAll({ where: { owner } });
};

// Get contact by ID and owner
export const getContactById = (id, owner) => {
  return Contact.findOne({ where: { id, owner } });
};

// Add a new contact
export const addContact = ({ name, email, phone, owner }) => {
  return Contact.create({
    name,
    email,
    phone,
    favorite: false,
    owner
  });
};

// Update contact by ID and owner
export const updateContactById = async (id, owner, data) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.update(data);
  return contact;
};

// Remove contact by ID and owner
export const removeContact = async (id, owner) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

// Update only "favorite" field
export const updateStatusContact = async (id, owner, { favorite }) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;

  await contact.update({ favorite });
  return contact;
};
