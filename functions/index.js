/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });

// exports.helloWorld = onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = onRequest(async (request, response) => {
  const { url } = request.query.url;
  logger.info("Hello logs!", { structuredData: true });

  // Do any necessary processing with the provided URL
  // const processedUrl = processUrl(url);

  // Return the processed URL in the response
  response.json({ resURL: url, hello: "ok" });
});
