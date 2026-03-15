const login = require("fca-unofficial");
const fs = require("fs");

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

login(
{
  appState: appState,
  forceLogin: true,
  listenEvents: true,
  selfListen: false
},
(err, api) => {

if (err) {
console.error("Login error:", err);
return;
}

console.log("✅ Bot connected!");

api.listenMqtt((err, event) => {

if (err) {
console.error("Listen error:", err);
return;
}

if (!event || event.type !== "message") return;

const msg = event.body;

if (!msg) return;

if (msg === "/ping") {
api.sendMessage("🏓 Pong!", event.threadID);
}

if (msg === "/hello") {
api.sendMessage("Hello 👋 I'm your bot!", event.threadID);
}

});

});
