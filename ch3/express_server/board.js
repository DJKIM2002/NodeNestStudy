const express = require("express");
const app = express();
let posts = []; // 게시글 리스트로 사용할 posts에 빈 리스트 할당

// req.body를 사용하려면 json 미들웨어를 사용해야 함
app.use(express.json()); // json 미들웨어 활성화

// POST 요청 시 컨텐츠 타입이 application/x-www-form-urlencoded인 경우 파싱
/**
 * application/x-www-form-urlencoded : body에 키1 = 값1 & 키2 = 값2 & 키3 = 값3 & ...의 형태로 오는 데이터 형식
 */
app.use(express.urlencoded({ extended: true })); // json 미들웨어와 함께 사용

// 응답 헤더에 한글 인코딩 설정
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// 게시글 조회 api
app.get("/", (req, res) => {
  res.json(posts); // 게시글 리스트를 json 형식으로 보여줌
});

// 게시글 등록 api
app.post("/posts", (req, res) => {
  const { title, name, text } = req.body; // HTTP 요청의 body 데이터를 변수에 할당
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
  res.json({ title, name, text });
});

// 게시글 삭제 api
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // path 정보에서 id 파라미터 값을 가져옴
  const filteredPosts = posts.filter((post) => post.id !== +id); // 글 삭제 로직
  const isLengthChanged = posts.length !== filteredPosts.length; // 삭제 확인

  posts = filteredPosts;
  if (isLengthChanged) {
    // 삭제 성공 시 응답
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED"); // 변경되지 않았을 때 응답
});

app.listen(3000, () => {
  console.log("게시판 서버 작동");
});
