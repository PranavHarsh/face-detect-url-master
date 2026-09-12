const handleSignin = (store, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const user = store.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.hash))
    return res.status(401).json("wrong credentials");
  res.json(store.publicUser(user));
};

module.exports = {
  handleSignin: handleSignin,
};
