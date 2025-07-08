import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import {createContactSchema, updateContactSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", contactsController.getContactById);

contactsRouter.delete("/:id", contactsController.removeContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), contactsController.updateContactById);

contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), contactsController.updateStatusContact);


export default contactsRouter;