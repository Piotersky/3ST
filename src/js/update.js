// const uaup = require("uaup-js");

// const defaultStages = {
//     Checking: "Checking for updates...",
//     Found: "Update found!",
//     NotFound: "Update not found.",
//     Downloading: "Downloading...",
//     Unzipping: "Installing...",
//     Cleaning: "Finalizing...",
//     Launch: "Launching..."
// };

// const updateOptions = {
//     gitRepo: "3ST",
//     gitUsername: "Piotersky",

//     appName: "3ST",
//     appExecutable: "3ST.exe",

//     progressBar:
//     label:
//     stageTitles: defaultStages,
// };

// uaup.Update(updateOptions);

const fs = require("fs");
const { ipcRenderer } = require("electron");
const https = require("https");

var currentVer;

fs.readFile(`package.json`, (err, data) => {
  if (err) {
    throw err;
  }
  currentVer = JSON.parse(data).version;

  var newestVer = currentVer;

  fetch(
    "https://raw.githubusercontent.com/Piotersky/3ST/main/package.json"
  ).then((r) => {
    r.text().then((d) => {
      newestVer = d.split('"')[7];

      let bar = document.getElementById("download");
      let text = document.getElementById("download-label");

      if (newestVer != currentVer) {
        text.innerText = "Update found!";

        const file = fs.createWriteStream(
          `${process.env.APPDATA ||
          (process.platform == "darwin"
            ? process.env.HOME + "/Library/Preferences"
            : process.env.HOME + "/.local/share")
          }/3ST/newVer.zip`
        );
        const request = https.get(
          `https://raw.githubusercontent.com/Piotersky/3ST/tree/main/public/3ST.zip`,
          function (response) {
            response.pipe(file);

            // after download completed close filestream
            file.on("finish", () => {
              file.close();
              console.log("Download Completed");
            });
          }
        );
      } else {
        ipcRenderer.send("openIndex");
      }
    });
  });
});
