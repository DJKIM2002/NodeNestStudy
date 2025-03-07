const http = require("http");
const url = require("url"); // url 모듈 할당

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // path명 할당
    /**
     * 예를 들어 url이 "http://localhost:3000/user" 이면
     * pathname은 "/user"가 된다.
     * 요청 url 뒤의 인수 true :
     *  url 뒤의 Query String도 함께 파싱할지 여부를 설정하는 변수
     */
    res.setHeader("Content-Type", "text/html; charset=utf-8"); // charset=utf-8 : 한글 깨짐 방지

    if (path in urlMap) {
      urlMap[path](req, res); // urlMap에 path 값으로 매핑된 함수 실행
    } else {
      notFound(req, res); // 없으면 404 에러를 뱉음
    }
  })
  .listen("3000", () => console.log("라우터 생성")); // 3000번 포트 접속

/*
 * 라우터 분리
 */
const user = (req, res) => {
  // /user 라우트
  // 정적 응답
  //   res.end(`[user] name : andy, age: 30`);
  // 동적 응답
  const userInfo = url.parse(req.url, true).query; // 쿼리 스트링 데이터를 userInfo에 할당
  res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
};

const feed = (req, res) => {
  // /feed 라우트
  res.end(
    `
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `
  );
};

const notFound = (req, res) => {
  // 에러 처리(404)
  res.statusCode = 404;
  res.end("404 - 페이지를 찾을 수 없습니다.");
};

// 가독성을 높이기 위해 "맵 자료구조"를 활용
// 분기문에 사용되는 매개변수가 같은 패턴을 보일 때 유용
// 라우터 규칙 매핑 키로 path가 들어가고 값에 함수를 할당
const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};

/** 가장 아래에 urlMap을 선언한 이유?
 * urlMap에서 user, feed 함수를 사용 중
 * 그런데 user, feed 함수보다 위에 있으면
 * user, feed가 읽히지 않아 에러가 발생
 * 따라서, urlMap이 위 두 함수보다 아래에 존재해야 함
 *
 * Hoisting : 함수, 클래스, 변수를 끌어올려서 선언되기 전에 사용하도록 하는 기능
 * var로 선언한 함수, 클래스, 변수는 호이스팅되지만
 * let, const, 함수 표현식, 클래스 표현식은 호이스팅되지 않는다.
 */
