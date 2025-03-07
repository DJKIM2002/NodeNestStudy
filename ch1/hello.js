const http = require("http"); // http 모듈 불러오기
let cnt = 0; // 전역변수 cnt 선언 및 초기화

const server = http.createServer((req, res) => {
  // 서버 객체 생성
  console.log((cnt += 1)); // 카운트 증가, 로그
  res.statusCode = 200; // 요청 성공
  res.setHeader("Content-Type", "text/plain"); // 헤더 설정(평문으로 해석)
  res.write("hello\n");
  setTimeout(() => {
    res.end("Node.js");
  }, 2000); // 2초 후에 Node.js 출력
});

server.listen(8000, () => {
  console.log("8000번 포트에서 실행 중");
}); // 8000번 포트로 연결
