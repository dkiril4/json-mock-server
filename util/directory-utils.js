const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const jsonUtil = require("./json-utils");

module.exports = {
  /**
     * Walks the provided directory including all its sub-directories, and
     * gets all the .json files from it. Returns a combined object of all the
     * JSON files, keyed by the first property.
    
     * If we have 2 files in the provided directory:
    
     *   file1.json
    
     *   file2.json
     * 
     * with the following contents:
     
     *   file1.json --> { property1: { ... } }
    
     *   file2.json --> { property2: { ... } }
    
     * This would return:
    
       {
           property1: { ... },
           property2: { ... }
       }
     */
  getJSONFilesFromDBDirectory: function () {
    let dir = "./db";
    let files = {};

    const flatten = (arr) =>
      arr.reduce(
        (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
        []
      );

    Array.prototype.flatten = function () {
      return flatten(this);
    };

    const walkSync = (dir) =>
      fs.readdirSync(dir).map((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          return walkSync(path.join(dir, file));
        } else {
          if (file.indexOf(".json") > -1) {
            jsonObject = JSON.parse(fs.readFileSync(path.join(dir, file)));

            if (jsonUtil.isJson(fs.readFileSync(path.join(dir, file)))) {
              _.extend(
                files,
                require(path.resolve(process.cwd(), path.join(dir, file)))
              );
            }
          }
        }
      });
    walkSync(dir);

    return files;
  },
};
