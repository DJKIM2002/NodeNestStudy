const express = require("express"); 
const app = express(); 
const port = 3000;

// prettier-ignore
app.get("/", (req, res) => { 
  res.set({ "Content-Type": "text/html; charset=utf-8" }); 
  res.end("헬로 Express");
});

// prettier-ignore
app.listen(port, () => { 
  console.log(`START SERVER : use ${port}`);
});
