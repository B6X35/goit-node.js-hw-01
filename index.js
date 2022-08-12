const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const colors = require("colors");

colors.setTheme({
  done: "green",
  warn: "yellow",
  error: "red",
});

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact === "") {
        return console.log(
          `there is no such contact with such id: ${id}`.error
        );
      }
      console.log("your contact has been found".done);
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("Add new contact".done);
      console.table(newContact);
      break;

    case "remove":
      const deletContact = await removeContact(id);
      if (deletContact === "") {
        console.log(`there is no such contact with such id: ${id}`.error);
        return;
      }
      console.log(`contact with this id: ${id} deleted`.warn);
      console.table(deletContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
