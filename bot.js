const login = require("fca-unofficial");
const fs = require("fs");

login(
{appState: JSON.parse(fs.readFileSync("appstate.json","utf8"))},
(err, api) => {

if(err) return console.error(err);

console.log("Bot connected!");

api.listenMqtt((err, event) => {

if(event.type !== "message") return;

const msg = event.body;

if(msg === "/ping"){
api.sendMessage("🏓 Pong!", event.threadID);
}

if(msg === "/hello"){
api.sendMessage("Hello 👋 I'm your bot!", event.threadID);
}

});
});
