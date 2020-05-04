먼저 노드 js를 다운로드 하자
node - v
를 터미널에 치면 version이 나온다.

다운로드 받기 위해서는 nodejs라고 구글에 치고, LTS버전을 다운로드하자
0, 원하는 폴더를 만든다.

1, 처음에는 npm package를 만든다
```
npm init
```
2, index.js를 만든다.
시작점을 두는 것이다.

3, express js를 다운받도록 하자
```
npm install express --save
```
이렇게 치면, packaege에 express가 추가된다.
--save를 치면 package에 표시되게 된다. dependecy를 표시해주는 것이다.

node_modules가 추가되는데, 우리가 다운받은 dependency가 여기에 추가된다.

4, index.js에 기본적인 express 코드를 써보자
docs에 있는 기본 코드를 가져오자
```
const express = require('express')
const app = express()
const port = 8080
//클라이언트에게서 오는 req, res는 응답으로 돌려보내는 것이다.
app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
```

5, package에 실행 스크립트를 추가하도록 하자
```
"start": "node index.js",
```

그 다음
```
npm run start
```
를 실행하면 웹이 실행된다.

6, 몽고 db 연결
몽고 db사이트에 가서, 회원 가입을 한 다음에 로그인을 하도록 하자
클러스터 만들기가 있다.
build a new cluster가 있다.
클라우드 마다 db를 지원해준다.
aws를 클릭하고, 나라를 선택하는데 공짜 티어가 있는 싱가포르를 선택하자
mo sandbox를 선택
클러스터 네임은 원하는 것으로 설정하자
5~7분 정도가 소요된다.

connect로 가서 몽고 db 유저를 만들도록 하자
아이디 gyu 비번 p~~

choose method -> connect your application -> connection string only 부분을 copy

mongodb+srv://gyu:<password>@boilerplate-omkra.mongodb.net/test?retryWrites=true&w=majority

7, 몽구스
몽고 db를 간단하게 편하게 쓸 수 있도록 한다.
OMT(object modeling tool)

```
npm install mongoose --save
```

몽구스를 이용해서 application과 mongodb를 연결하도록 하자

연결이 안된다면 mongodb console에서 network부분에 가서 현재 ip를 집어넣어주도록 하자
그러나 production에서는 이렇게 사용하지 않도록 하자

8, 유저 모델을 생성
회원가입을 하게되면 -> 유저 데이터 베이스에 저장된다.
따라서 유저 모델(스키마)를 만드는 시간을 갖자

모델은 스키마를 감싸주는 역할을 한다.
스키마는 무엇인가??

게시판 글 -> 작성자 type: objectid, 포스트 제목 type: string, 포스트 내용 type: string, 시간
스키마가 구조이다. -> db에 들어가는 데이터의 구조가 스키마,
이 스키마를 감싸는게 모델

9, models 폴더를 만들자, 그리고 models 폴더안에 파일을 만든다.
이 파일이 데이터의 스키마이다.

10, git설치
git이 없다면 다운로드하면 된다.

```
git --version
```

터미널을 켜서 git으로 버전 관리를 하도록하자
```
git status
```
를 누르면, untracked files라고 나온다.
git에는 다음과 같이 저장소가 있다.

working directory , staging area , git repository(LOCAL), git repository(REMOTE)
(초기 상태)
git add . 를 하면 working directory에서 staging area로 간다.
staging area은 git repo에 넣기전에 임시적으로 보관하는 것이다.

사실 너무 많은 것들이 git 저장소에 올라가 있다.
node_modules를 넣을 필요가 없다

.gitignore를 만들자

그리고 node_modules를 쓰면된다.
이제 저장소에서 없어져야 하는데, git add . 하기 전에 했어야 했다.
그래서 관련된 모든 정보를 지워줘야한다.
```
git rm --cached node_modules -r
```

