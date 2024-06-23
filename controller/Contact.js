import Contact from "../model/ContactModel.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { email, phone, subject, message, userId } = req.body;
    const newContact = await Contact.create({
      email,
      phone,
      subject,
      message,
      userId,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.delete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};
