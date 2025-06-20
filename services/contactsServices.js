import Contact from "../db/Contact.js";


// Get all contacts
export const listContacts = () => Contact.findAll();

// Get contact by ID
export const getContactById = (id) => Contact.findByPk(id);

// Add a new contact
export const addContact = ({ name, email, phone }) => {
    return Contact.create({
        name,
        email,
        phone,
        favorite: false, // optional: default is false
    });
};

// Update contact by ID
export const updateContactById = async ({ id, ...data }) => {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    await contact.update(data);
    return contact;
};


// Remove a contact by ID
export const removeContact = async (id) => {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    await contact.destroy();
    return contact;
};

export const updateStatusContact = async (contactId, { favorite }) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.update({ favorite });
    return contact;
};

