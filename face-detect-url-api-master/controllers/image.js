let Clarifai;
try {
  Clarifai = require("clarifai");
} catch (error) {
  Clarifai = null;
}

const apiKey = process.env.CLARIFAI_API_KEY;
const app = apiKey && Clarifai ? new Clarifai.App({ apiKey }) : null;

const handleApiCall = (req, res) => {
  if (!app) return res.status(503).json("CLARIFAI_API_KEY is not configured");
  if (!req.body.input) return res.status(400).json("image URL is required");
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, store) => {
  const { id } = req.body;
  const entries = store.incrementEntries(id);
  if (entries === null) return res.status(404).json("user not found");
  res.json(entries);
};

module.exports = {
  handleImage,
  handleApiCall,
};
