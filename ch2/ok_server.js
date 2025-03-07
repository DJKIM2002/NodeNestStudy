const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html"); // html로 해석
  res.end("ok"); // "ok"를 응답하고 종료
});

server.listen("3000", () => console.log("OK 서버 시작!")); // 3000번 포트 접속
