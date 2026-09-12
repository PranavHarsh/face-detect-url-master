const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "data");
const dataFile = path.join(dataDirectory, "store.json");

const ensureStore = () => {
  fs.mkdirSync(dataDirectory, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ users: [] }, null, 2));
  }
};

const readStore = () => {
  ensureStore();
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
};

const writeStore = (store) => {
  ensureStore();
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
};

const findUserByEmail = (email) =>
  readStore().users.find((user) => user.email === email);

const findUserById = (id) => readStore().users.find((user) => user.id === id);

const publicUser = (user) => {
  if (!user) return null;
  const { hash, ...safeUser } = user;
  return safeUser;
};

const createUser = ({ email, name, hash }) => {
  const store = readStore();
  const user = {
    id: String(Date.now()),
    email,
    name,
    hash,
    entries: 0,
    joined: new Date().toISOString(),
  };
  store.users.push(user);
  writeStore(store);
  return publicUser(user);
};

const incrementEntries = (id) => {
  const store = readStore();
  const user = store.users.find((candidate) => candidate.id === id);
  if (!user) return null;
  user.entries += 1;
  writeStore(store);
  return user.entries;
};

module.exports = {
  findUserByEmail,
  findUserById,
  publicUser,
  createUser,
  incrementEntries,
};
