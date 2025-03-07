const url = require("url"); // url 모듈 할당
const express = require("express"); // express 프레임워크 사용
const app = express();
const port = 3000; // 3000번 포트 사용

app.listen(port, () => {
  console.log("express로 라우터 리팩터링");
});

// get 메소드 라우팅 설정
// 수백개의 url이 있다면, 그것들은 전부 일일이 매핑시켜줘야 하는 번거로움이 있음
// express에서는 app.get()에 설정을 추가하여, 위 단점을 극복할 수 있음음
app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

/*
 * 라우터 분리
 */
function user(req, res) {
  // /user 라우트
  // 정적 응답
  //   res.end(`[user] name : andy, age: 30`);
  // 동적 응답
  const userInfo = url.parse(req.url, true).query; // 쿼리 스트링 데이터를 userInfo에 할당
  // res.json : 응답을 json 타입으로 보여줌(자동으로 charset=utf-8 적용)
  res.json(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
}

function feed(_, res) {
  // 사용하지 않는 변수는 빼는 것이 원칙이나, 인터페이스 구조 상 넣을 수 밖에 없을 때는 '_'을 사용
  // /feed 라우트
  res.json(
    `
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `
  );
}
