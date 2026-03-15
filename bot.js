const login = require("fca-unofficial");
const fs = require("fs");

function startBot() {

const appState = JSON.parse(fs.readFileSync("appstate.json","utf8"));

login(
{
appState: appState,
forceLogin: true,
listenEvents: true,
autoMarkDelivery: false,
autoMarkRead: false
},
(err, api) => {

if(err){
console.log("Login error:", err);
setTimeout(startBot, 30000);
return;
}

console.log("✅ Bot connected!");

const fs = require("fs");

// Auto-save updated appstate
fs.writeFileSync(
  "fbstate.json",
  JSON.stringify(api.getAppState(), null, 2)
);

api.listenMqtt((err, event) => {

if(err){
console.log("⚠️ Connection lost. Reconnecting...");
return startBot();
}

if(!event || event.type !== "message") return;

const msg = event.body;

if(msg === "/ping"){
api.sendMessage("🏓 Pong!", event.threadID);
}

if(msg === "/hello"){
api.sendMessage("Hello 👋 I'm your bot!", event.threadID);
}

});

});
}

startBot();
