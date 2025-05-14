import { WebSocketServer } from "ws";

let globalCounter = 0;

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connecttion(ws) {
  console.log("client connected");
  ws.send(JSON.stringify({ type: "update", count: globalCounter }));

  ws.on("message", function message(data) {
    let msg = data.toString();
    if (msg === "increment") {
      globalCounter++;
    } else if (msg === "decrement") {
      globalCounter--;
    }
    wss.clients.forEach(function Each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ type: "update", count: globalCounter }));
      }
    });
  });
});
console.log("running on port 3001");
