const fs = require('fs').promises;
const path = require('path');

const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async body => {
  const contacts = await listContacts();
  const result = { ...body, id: v4() };
  contacts.push(result);
  await writeContacts(contacts);
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };
  await writeContacts(contacts);
  return contacts[idx];
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await writeContacts(contacts);
  return result;
};

async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};