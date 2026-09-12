const handleProfileGet = (req, res, store) => {
  const { id } = req.params;
  const user = store.findUserById(id);
  if (user) res.json(store.publicUser(user));
  else res.status(404).json("not found");
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
