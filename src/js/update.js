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
    r.text().then(async (d) => {
      newestVer = d.split('"')[7];

      let bar = document.getElementById("download");
      let text = document.getElementById("download-label");

      if (newestVer != currentVer) {
        text.innerText = "Update found!";
        bar.setAttribute("value", 35)

        let result = ""

        fetch(
          "https://github.com/Piotersky/3ST/blob/main/public/3ST.zip"
        ).then((r) => {
          r.text().then((d) => {
            //console.log();
            result = d;
          });
        });

        // Step 1: start the fetch and obtain a reader
        // let response = await fetch(
        //   "https://github.com/Piotersky/3ST/blob/main/public/3ST.zip?raw=true"
        // );

        // const reader = response.body.getReader();

        // // Step 2: get total length
        // const contentLength = +response.headers.get("Content-Length");

        // text.innerText = "Downloading..."

        // // Step 3: read the data
        // let receivedLength = 0; // received that many bytes at the moment
        // let chunks = []; // array of received binary chunks (comprises the body)
        // while (true) {
        //   const { done, value } = await reader.read();

        //   if (done) {
        //     break;
        //   }

        //   chunks.push(value);
        //   receivedLength += value.length;

        //   bar.setAttribute("value", Math.round((receivedLength / contentLength) * 100))
          
        // }

        // // Step 4: concatenate chunks into single Uint8Array
        // let chunksAll = new Uint8Array(receivedLength); // (4.1)
        // let position = 0;
        // for (let chunk of chunks) {
        //   chunksAll.set(chunk, position); // (4.2)
        //   position += chunk.length;
        // }

        // // Step 5: decode into a string
        // let result = new TextDecoder("utf-8").decode(chunksAll);

        // text.innerText="Installing..."

        fs.writeFileSync(`${
          process.env.APPDATA ||
          (process.platform == "darwin"
            ? process.env.HOME + "/Library/Preferences"
            : process.env.HOME + "/.local/share")
        }/Local/Programs/3-sides-of-triangle/newVer.zip`, result)

        text.innerText="Starting up..."

        //Uruchom

        //Usuń stare pliki
      } else {
        ipcRenderer.send("openIndex");
      }
    });
  });
});
