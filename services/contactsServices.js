const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const HttpError = require("../helpers/HttpError");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

const getListContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (contactId) => {
  const contacts = await getListContactsService();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  return contact;
};

const removeContactService = async (contactId) => {
  const contacts = await getListContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw HttpError(404, "Not found");
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactId;
};

const addContactService = async (body) => {
  const contacts = await getListContactsService();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contacts = await getListContactsService();
  let contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }
  contact = { ...contact, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};
module.exports = {
  getListContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
