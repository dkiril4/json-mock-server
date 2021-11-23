module.exports = {
  /**
   * Convert any of the following into a GET: POST, PUT, DELETE, PATCH
   *
   * Additionally we append the corresponding incoming HTTP as a prefix
   * to the resource path so that we can identify the correct .json file
   * inside the /db folder. Since json-server only works well with GET
   * requests, this effectively lets us identify the correct json file
   * to serve for the corresponding method.
   *
   * @example If we have a json file with the key [POST] my__resource__route
   * and we want to access it via a POST method, our incoming POST would get
   * converted as follows:
   *
   * - Incoming Request: [POST] --> /my__resource__route
   * - Outgoing Request: [GET]  --> /[POST]/my__resource__route
   */
  convertHTTPRequestsToGET: function (serverRef, baseUrlRef) {
    serverRef.get(`${baseUrlRef}/*`, (req, res, next) => {
      const prefix = req.url.replace(baseUrlRef, "");
      req.url = `${baseUrlRef}/GET${prefix}`;
      next();
    });
    serverRef.post(`${baseUrlRef}/*`, (req, res, next) => {
      const prefix = req.url.replace(baseUrlRef, "");
      req.url = `${baseUrlRef}/POST${prefix}`;
      req.method = "GET";
      next();
    });
    serverRef.put(`${baseUrlRef}/*`, (req, res, next) => {
      const prefix = req.url.replace(baseUrlRef, "");
      req.url = `${baseUrlRef}/PUT${prefix}`;
      req.method = "GET";
      next();
    });
    serverRef.patch(`${baseUrlRef}/*`, (req, res, next) => {
      const prefix = req.url.replace(baseUrlRef, "");
      req.url = `${baseUrlRef}/PATCH${prefix}`;
      req.method = "GET";
      next();
    });
    serverRef.delete(`${baseUrlRef}/*`, (req, res, next) => {
      const prefix = req.url.replace(baseUrlRef, "");
      req.url = `${baseUrlRef}/DELETE${prefix}`;
      req.method = "GET";
      next();
    });
  },
};
