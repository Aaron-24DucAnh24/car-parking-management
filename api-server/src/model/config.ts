import editJsonFile from "edit-json-file";

const database: editJsonFile.JsonEditor = editJsonFile(
  `${__dirname}/../../storage/storage.json`,
  { autosave: true }
);

export default database;
