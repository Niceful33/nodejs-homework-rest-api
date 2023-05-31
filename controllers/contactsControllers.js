const { controllerWrapper } = require("../helpers");
const {
  getListContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsServices");

const listContacts = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const contacts = await getListContactsService(owner, page, limit, favorite);
  res.status(200).json(contacts);
});

const getContactById = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  res.status(200).json(contact);
});

const addContact = controllerWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await addContactService({ ...req.body, owner });
  res.status(201).json(newContact);
});

const updateContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactService(contactId, req.body);
  res.status(200).json(updatedContact);
});
const updateStatusContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateStatusContactService(contactId, req.body);
  res.status(200).json(updatedContact);
});
const removeContact = controllerWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  await removeContactService(contactId);
  res.status(200).json({ message: "contact deleted" });
});

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
