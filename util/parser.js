const csv = require("csv-parser");
const fs = require("fs");
const result = [];

const dbData = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(__dirname + "/../database/SearchTermsDB.csv")
      .pipe(csv(["Search Terms", "Num Searches"]))
      .on("data", (data) => result.push(data))
      .on("end", async () => {
        const searched = "Search Terms";
        let unsorted = result;
        let sortedarr = new Array(26)
          .fill(null)
          .map(() => new Array().fill(null));
        unsorted.map((node) => {
          if (node["Search Terms"] && node["Search Terms"] != "Search Terms") {
            let smallLetter = node["Search Terms"].toLowerCase();
            let index = smallLetter.charCodeAt(0) - 97;
            if (index >= 0 && index != 65182) {
              sortedarr[index].push(node);
              sortedarr[index].sort(
                (a, b) => b["Num Searches"] - a["Num Searches"]
              );
            }
          }
        });
        sortedarr.map((node) => {
          node.sort((a, b) => a["Nums Searches"] - b["Nums Searches"]);
        });
        resolve(sortedarr);
      });
  });
};

module.exports = dbData;
