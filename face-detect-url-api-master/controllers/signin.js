const handleSignin = (store, bcrypt) => async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  try {
    const user = await store.findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.hash)) {
      return res.status(401).json("wrong credentials");
    }
    res.json(store.publicUser(user));
  } catch (err) {
    res.status(500).json("unable to sign in");
  }
};

module.exports = {
  handleSignin: handleSignin,
};
