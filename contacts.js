const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsGet = await listContacts();
  const contact = contactsGet.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  const contactsList = await listContacts();
  const newContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
