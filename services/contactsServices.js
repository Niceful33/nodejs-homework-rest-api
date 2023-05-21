const { HttpError } = require("../helpers");
const Contact = require("../models/contact");

const getListContactsService = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactByIdService = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  return contact;
};

const removeContactService = async (contactId) => {
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw new HttpError(404, "Not found");
  }
  return contactId;
};

const addContactService = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};

const updateStatusContactService = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  return contact;
};
module.exports = {
  getListContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
