const handleSignup = (req, res, store, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  if (store.findUserByEmail(email))
    return res.status(409).json("email already registered");
  try {
    res.json(
      store.createUser({ email, name, hash: bcrypt.hashSync(password) }),
    );
  } catch (err) {
    res.status(400).json("unable to register");
  }
};

module.exports = {
  handleSignup: handleSignup,
};
