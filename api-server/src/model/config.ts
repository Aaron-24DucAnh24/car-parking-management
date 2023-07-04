import editJsonFile from "edit-json-file";

const database: editJsonFile.JsonEditor = editJsonFile(
  `${__dirname}/database.json`,
  { autosave: true }
);

export default database;
