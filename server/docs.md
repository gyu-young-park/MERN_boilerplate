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

이렇게 지워주면 된다.

```
git commit -m ""
```
을 하고난 뒤에 git status를 해주면 아무것도 없다.
이제 staging area에 있던게 git repo(local)에 들어가는 것이다.
이제 remote에 올려야한다.

11, github에 올리기
git은 tool이다. 소스코드를 관리하는 툴이다.
git으로 관리하는 코드를 많은 사람들과 수정, 관리할 수 있도록 해주는 클라우드 서비스가 github이다.

github -> 아이디가 있어야 한다.

원격 저장소를 만들고, 여기에 있는 코드들을 쓰면 된다.
그런데, 에러가 난다??
ssh(secure shell)을 설정해야한다.
이는 local git과 github가 안전하게 통신할 방법이 없기 때문이다.
그래서 ssh를 설정해야 한다.

없다면 구글에 git ssh라고 친다.

먼저 ssh를 만들고,
generating -> ssh

ssh 키를 만들었다면, ssh agent를 백그라운드에 켜주면 된다.
id_rsa => priavete key
id_rsa_pub => public key

이제 pub key를 github에 연결해야한다.
계정의 setting에 가서 설정해주면 된다.

그 다음 이제 git 코드를 입력해주면 소스가 배포된다.

12, 회원가입 기능 만들기
클라이언트(브라우저) -> 서버로 정보를 보낸다.
받을 때, body-parser라는 dependecy가 필요하다.
이름, 이메일, 비번 등을 받을 수 있다.

```
npm install body-parser --save
```

postman으로 클라이언트를 대신해 테스트를 해보도록 하자

다음으로 register router를 만들자 -> 회원 가입을 위한 라우터
require 후에 다음의 처리를 해주어야 한다.
```
//application/x-www-form-urlencoded 이런 타입으로 오는 것을 분석할 수 있도록
app.use(bodyParser.urlencoded({extended: true}))
//application/json 타입으로 오는 것을 분석할 수 있도록 한다.
app.use(bodyParser.json())
```

13, nodemon
서버를 내리지 않고, 서버를 킨 상태에서 변화를 감지해 코드 변화를 적용하는 기술
```
npm install nodemon --save-dev
```
dev를 붙이면 local -> development모드에서만 사용하도록 하겠다는 것이다.

14, 소스안에 있는 비밀정보 보호하기
가령 mongodb 연결에 있어서 아이디와 비밀번호가 노출되는 것을 막기위한 것
다른 곳으로 따로 떼어놓고 gitignore에 추가하도록 하자

config 폴더 -> dev.js 에다가 몽고db uri를 옮겨주자

우리가 개발할 때 두가지 환경에서 가능
local, production
이는 배포 전 후로 나뉜다.

이 두 가지 경우를 따로 생각해야 한다.
dev모드일 때는 config에서 가져올 수 있다.
그런데, deploy모드에서는 따로 설정해주어야 한다
heroku일 경우는 heroku에서 따로 설정해주어야 한다.

그래서 prod.js를 따로 하나 더 만들어주어 prod, dev 모드일 때의 경우를 다르게 해주자
또한, 한 가지 더 파일을 만드는데, key.js를 만들어주도록 하자

15, bcryt를 이용해서 비밀번호 암호화 시키기
보낼 때는 1234567로 보내도, db에 그대로 저장하는 것이 아니라, 암호화를 해주고 보내는 것이다.

```
npm install bcrypt@3.0.6 --save
```
비크립트가 c로 되어있기 때문에 node에서는 버전 차이로 사용이 안되는 경우가 있다.

암호화 순서
1, Register router -> 데이터 save 전에 비밀번호 암호화를 시켜줘야 한다.
    그러기 위해서는 mongoose의 기능을 이용 userSchema.pre('save', function(next){}) 
    이것은 userSchema가 save 되기 전에 callback을 수행하고, 파라미터로 받은 next함수를 실행하겠다는 것이다.

2, bcrypt를 사용하기 위해 require를 사용, 또, saltRounder 라는 게 있다.
    bcrypt 사이트에 가면 , technique1에 보면 salt를 생성하고, 생성된 salt로 비밀번호를 암호화 시키는 것이다.
    즉, salt를 이용해서 비밀번호를 암호화 해야하는 것이다. 
    그러기 위해서는 salt를 먼저 생성, saltRounds = 10 -> 10자리인 salt를 만들어서 비밀번호를 암호화 시키는 것,
    정리하면 saltRounds 숫자만큼의 자리 수를 가지는 salt를 만들고, 이 salt로 암호화 진행하는 방식

16, 로그인 기능 구현
post로 login 엔드포인트를 갖도록 만들자
3단계로 구분
//요청된 이메일이 데이터베이스에 있는 지 확인
//다음은 비밀번호가 같은 지 확인한다.
//비밀번호까지 맞다면 유저를 위한 토큰을 생성해준다.

17, 토큰 생성
먼저 라이브러리가 필요하다
```
npm install jsonwebtoken --save
```

사이트에 들어가서 사용 방법을 참조하자
sign을 사용해서 token을 만들 수 있다.

18, 쿠키
쿠키를 사용하기 위해서는 cookie-parser를 사용해야 한다.
```
npm install cookie-parser --save
```

19, AUTH 기능
왜 필요? 사이트에서는 어떤 곳은 로그인된 유저만 볼 수 있고, 어떤 곳은 로그인되지 않은 곳은 못쓰게 해야한다.
또, admin만 관리할 수 있도록 auth를 설정해줄 수 있도록 해야한다.
token을 쿠키에 적어주고, server에서는 user db에 저장했다.
쿠키와 server db내용을 계속 비교하는 것이다.
그럼, user가 a에서 b페이지로 움직일 때, 쿠키를 가져와서 비교하는 것이다.
user_id를 이용해서 , 해당 유저 db에 token이 있다면 되는 것이고, 아니면 원하는 것을 할 수 없도록 만드는 것이다.

    1, 쿠키에 있는 token을 서버에서 가져와서 복호화 한다.

20, 로그아웃 기능
로그아웃 라우터 -> 로그아웃 하려는 유저를 찾고, -> db에서 해당 유저의 토큰을 지워주면 된다.
auth기능에서 cookie의 token을 가져와서 db token과 비교했기 때문이다.

그래서 db에서 token을 지워주면 token이 맞지않게 되어 로그아웃되었다는 것을 알게된다.


