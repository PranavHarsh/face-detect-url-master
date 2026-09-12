const handleSignup = async (req, res, store, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  try {
    const existing = await store.findUserByEmail(email);
    if (existing) return res.status(409).json("email already registered");

    const user = await store.createUser({
      email,
      name,
      hash: bcrypt.hashSync(password),
    });
    res.json(user);
  } catch (err) {
    res.status(400).json("unable to register");
  }
};

module.exports = {
  handleSignup: handleSignup,
};
