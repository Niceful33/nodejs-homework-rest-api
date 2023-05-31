const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

const router = express.Router();
const { isValidId, validateBody, authenticate } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchema");
router.use(authenticate);
router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(updateSchema), updateContact);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);
module.exports = router;
