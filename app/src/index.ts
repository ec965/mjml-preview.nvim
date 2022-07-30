export {};

const WS_URL = "ws://localhost:5000/ws";

const root = document.getElementById("root");
if (root && root instanceof HTMLIFrameElement) {
  const ws = new WebSocket(WS_URL);
  ws.onclose = (ev) => {
    console.log("WS was closed", ev);
  };
  ws.onmessage = (ev) => {
    const { type, message } = JSON.parse(ev.data);
    console.log({ type, message });
    if (type === "html") {
      root.srcdoc = message;
    }
  };
  setInterval(() => {
    ws.send("GIMMIEDALOOT");
  }, 500);
}