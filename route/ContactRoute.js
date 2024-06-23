import express from "express";
import { getContacts, getContact, createContact, deleteContact } from "../controller/Contact.js";

const router = express.Router();

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContact);
router.post("/contacts", createContact);
router.delete("/contacts/:id", deleteContact);

export default router;
