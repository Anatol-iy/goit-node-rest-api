import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export async function getContactById(id) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

export async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export async function updateContactById({ id, name, email, phone }) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) return null;
    contacts[idx] = {...contacts[idx], 
        name, 
        email, 
        phone};
    await updateContacts(contacts);
    return contacts[idx];
}

export async function removeContact(id) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) return null;
    const [result] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return result;
}