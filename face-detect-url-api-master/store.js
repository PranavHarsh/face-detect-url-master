const Redis = require("ioredis");

// REDIS_URL should be the internal connection string from your Render
// Key Value (Valkey) instance, e.g. redis://red-xxxxxxxx:6379
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

const userKey = (id) => `user:${id}`;
const emailKey = (email) => `email:${String(email).toLowerCase()}`;

const findUserById = async (id) => {
  const data = await redis.hgetall(userKey(id));
  if (!data || !data.id) return null;
  return { ...data, entries: Number(data.entries) };
};

const findUserByEmail = async (email) => {
  const id = await redis.get(emailKey(email));
  if (!id) return null;
  return findUserById(id);
};

const publicUser = (user) => {
  if (!user) return null;
  const { hash, ...safeUser } = user;
  return safeUser;
};

const createUser = async ({ email, name, hash }) => {
  const existingId = await redis.get(emailKey(email));
  if (existingId) {
    const err = new Error("email already registered");
    err.code = "EMAIL_TAKEN";
    throw err;
  }

  const id = String(Date.now());
  const user = {
    id,
    email,
    name,
    hash,
    entries: 0,
    joined: new Date().toISOString(),
  };

  await redis.hset(userKey(id), user);
  await redis.set(emailKey(email), id);

  return publicUser(user);
};

const incrementEntries = async (id) => {
  const exists = await redis.exists(userKey(id));
  if (!exists) return null;
  const entries = await redis.hincrby(userKey(id), "entries", 1);
  return entries;
};

module.exports = {
  findUserByEmail,
  findUserById,
  publicUser,
  createUser,
  incrementEntries,
};
