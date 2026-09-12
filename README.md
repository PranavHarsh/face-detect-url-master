# Face Detect URL

A React face-detection app with a portable Express API.

## Run locally

1. Start the API:

   ```sh
   cd face-detect-url-api-master
   npm install
   CLARIFAI_API_KEY=your_key npm start
   ```

2. In a second terminal, start React from the repository root:

   ```sh
   npm start
   ```

The React app uses `http://localhost:3000` by default. Set `REACT_APP_API_URL` before `npm start` when the API runs elsewhere.

Accounts and entry counts are stored in `face-detect-url-api-master/data/store.json`. Face detection requires a Clarifai API key; authentication and profile routes work without one.
