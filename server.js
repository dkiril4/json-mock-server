const jsonServer = require("json-server");
const _ = require("lodash");

const directoryUtil = require("./util/directory-utils");
const requestConverter = require("./middleware/request-converter");

const port = 3000;
const baseUrl = "";

const server = jsonServer.create();
server.use(jsonServer.defaults());

/**
 * Middlware:
 */
requestConverter.convertHTTPRequestsToGET(server, baseUrl);

server.get(`${baseUrl}/*`, (req, res, next) => {
  console.log("[Incoming Request]: ", req.url);
  next();
});

/**
 * JSON Server Setup:
 */

// Get all the .json files from the db directory and its subdirectories.
const JSONFiles = directoryUtil.getJSONFilesFromDBDirectory();

const fileKeys = Object.keys(JSONFiles).sort();

// Configure the custom routes re-router. This will take the 'routeTo' property
// from each JSON file, and a a re-route from that custom route to the file.
const customRoutes = require("./routes");

let rewriterMappings = { ...customRoutes };
fileKeys.forEach((key) => {
  rewriterMappings[JSONFiles[key].routeTo] = "/" + key;
});

const rewriter = jsonServer.rewriter(rewriterMappings);
server.use(rewriter);

// Configure the router. This will map each JSON file's 'key' to serve its file.

const routerMappings = {};
fileKeys.forEach((key) => {
  routerMappings[key] = JSONFiles[key];
});

const router = jsonServer.router(routerMappings);
server.use(router);

/**
 * Transform Request:
 */

router.render = (req, res) => {
  const type = _.get(res, "locals.data.response.type", null);
  const status = _.get(res, "locals.data.response.status", 200);

  switch (type) {
    case "string": {
      res.status(status).send(res.locals.data.response.payload);
      break;
    }
    case "json": {
      res.status(status).send(res.locals.data.response.payload);
      break;
    }
    default: {
      res.jsonp(res.locals.data);
      break;
    }
  }
};

server.listen(port, () => {
  console.log(
    "\n⛴    JSON Server is running at http://localhost:" + port + "\n"
  );
});
