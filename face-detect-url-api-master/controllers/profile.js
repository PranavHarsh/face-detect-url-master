const handleProfileGet = async (req, res, store) => {
  const { id } = req.params;
  try {
    const user = await store.findUserById(id);
    if (user) res.json(store.publicUser(user));
    else res.status(404).json("not found");
  } catch (err) {
    res.status(500).json("unable to fetch profile");
  }
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
