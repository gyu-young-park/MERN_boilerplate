# 1, 리액트
1, 컴포넌트 별로 이루어져 있기 때문에 재사용성이 뛰어나다.
2, virtual dom
real dom vs virtual dom
10개의 리스트 중에 한 개가 변화가 이루어진 다면 real dom은 전체를 변화시켜야 한다.

virtual dom은 변화된 부분만 변화시킬 수 있다.

어떻게?? -> 우선 virtual dom과 real dom이 가진 property는 같다.
virtual dom에서 real dom의 스냅샷을 찍는다. 만약 하나가 변화된다면, virtual dom은 스냅샷 찍은 거랑 비교해서 real dom에서 바뀐 부분만 바꾸어 준다.

정리 : 스냅샷을 찍어두고 virtual dom이 감시하다가 바뀐 부분만 비교해서 바꾸는 것이다.

# 2, 바벨과 웹팩
이전에는 바벨, 웹팩을 설정해주어야 했다.

바벨 : 최신 자바스크립트 문법을 지원하지 않은 브라우저를 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환시켜 준다. es6 문법으로 변환시켜주는 것이다.

webpack : assets를 번들시켜준다. 이전에는 js, css ,html으로 간단하게 만들었는데, 요즘에는 웹사이트가 엄청 커지게 되고 라이브러리, 프레임워크들이 많아져 복잡하게 되어버렸다. 그래서 웹팩을 이용해서 번들시켜주어 묶어주는 것이다.
간단하게 많은 모듈들을 합해서 하나로 묶어준다고 생각하면 된다.

그러나 요즘에는 create-react-app 을 통해서 boiler plate를 만들 수 있다.

# 3, create-react-app 설치
```
npx create-react-app .
```
client폴더에 들어가서 해당 명령어를 치면 된다.
단 c컴파일러가 있어야 한다.

이전에는 npm(node package manager)을 이용해서 다운 받았다.
레지스트리, 저장소 역할을 한다.
npm install ~~~
이렇게 dependency -> 라이브러리을 설치했다.
또한, npm run start, 또 빌드를 할 때도 npm으로 빌드가 가능하다.
npm에 관한 것은 package.json에 적혀있다.

다운받을 때 -g라는 명령어를 주지않으면 local에 다운받는 것이다. -> node_modules에 다운받아진다.
-g로 다운받으면 글로벌로 다운받게 된다.

그래서 이전에는 create-react-app을 global로 다운받았다.
이제는 global로 다운받을 필요없이, npx로 레지스트리에 있는 react-create-app을 사용할 수 있다.

즉, 우리 디스크에 다운받지않고, npm registy에 있는 create-react-app을 가져오는 것이다.

npx장점
- 디스크 스페이스를 낭비하지 않을 수 있다.
- 항상 최신 버전을 사용할 수 있다.
만약 src가 안생긴다면, 이는 global로 설치된 creat-react-app 때문에 생긴 문제이므로, 이 라이브러리를 지우고, 다시 global로 설치후에 실행시켜주면 된다.
# 4 create-react-app 구성
실행
```
npm run start
```

app.js 부분이 렌더링된 것이 자동적으로 나오게 된다.
app.js는 index.js에서 컴포넌트로 만들어진 것이다.
index.html의 div의 id=root를 가져와서 해당 부분에 보여질 코드들을 reactDOM에서 컴포넌트로 바꾸어 보여주는 것이다.

webpack -> 웹팩이 관리해주는 곳은 src 부분이고, public은 안해준다.

이미지를 넣고 싶다면 public에 넣는 것이 아니라, src부분에 넣어주어야 한다.


# 5 구성 변화
현재까지는 react의 기본 틀만 가지고 있다.
우리가 앞으로 만들 boiler plate안에는 login, signup, logout 기능이 있으니 이에 맞도록 바꾸어주도록 하자

App.js는 라우팅 관련 처리를 해주고,
components폴더를 만들어주고 view들을 넣어주도록 하자
그리고 컴포넌트들을 넣어주어 라우팅 시켜주도록 하자

component/views -> page들을 넣는다
component/views/sections -> 이 안에는 해당 페이지에 관련된 css파일이나 component들을 넣어준다.

config.js는 환경 변수 설정
hoc는 higher order component => function인데, 다른 컴포넌트를 갖는 컴포넌트

Auth라는 hoc가 있다고 하자
어떤 사람이 자격이 있는 체크를 하는 컴포넌트,
그런데 관리자만이 들어갈 수 있는 컴포넌트가 있다면,
누군가가 들어올 때, auth로 admin 컴포넌트에 들어갈 수 있는지 없는지 체크하는 것이다.

하나 더 추가한다면, login 컴포넌트는 login된 유저만 들어갈 수 있도록 한다. auth가 그 역할을 해줄 수 있도록 한다.

utils -> login page, register page 등등 여러 페이지에서도 쓰이는 그러한 기능들을 utils에 넣어준다.

# 6 react router dom
react router dom으로 라우팅이 가능하다.
<Route>안에 컴포넌트들이 들어있고, 이 컴포넌트로 라우팅이 되는 것이다.
```
npm install react-router-dom -save
```
app.js에 코드를 넣어주도록 하자
<Route exact path=> 이렇게 써주는데 exact를 안써주면
path가 / 인 것과 path /login 인 것이 /가 겹쳐서 먼저 나오는 컴퍼넌트에 라우팅되게 된다.

# 7 data flow axios
클라이언트 -> 로그인 - > 서버에 요청 -> 서버에서는 이메일, 비밀번호 체크 -> 응답으로 client에게 보내준다.
그래서 클라이언트 안에서 요청을 보낼 때는 axios를 사용한다.
jquery의 ajax와 비슷하다.
```
npm install axios --save
```
axios.get('/app/hello') 라고 해도
서로 포트가 다르기 때문에 안보내진다.
axios.get('http://loacahlost:8080/api/hello')
라고 치면 CORS 에러가 난다.

CORS 정책 -> 다른 웹사이트에서 우리 서버에 무언가를 보낸다면 문제가 생기기 때문이다.
Cross - Origin - Resource - Sharing => 보안 정책
도메인 a.com에서 도메인 a.com에 자원을 요청, 보내면 문제가 안생기지만,
도메인 b.com에서 도메인 a.com에 자원을 요청하면 문제가 생긴다.

1, 해결 방법 - 프론트엔드만 고칠 수 있는 상황이다.
- jsonp 라는 방식을 사용
모든 req를 get req로 바꾸어서 해결하는 방법

2, 해결 방법 - 프론트, 백엔드 둘 다 고칠 수 있는 상황
- 둘 다 허용할 수 있도록 한다.

3, 프록시 사용
임의로 프록시를 사용하는 것이다.
```
npm install http-proxy-middleware --save
```
다음 src/setupProxy.js 를 만든다음, 코드를 복사해서 붙여놓는다.
target에 서버 포트를 맞추자

프록시가 무엇인지??
원래는 포트가 다른 클라이언트 서버와 백엔드 서버가 서로 요청, 응답을 한다.
그런데, 이 가운데에 프록시 서버를 두는 것이다.
가령
111 .  11 111 .111 아이피로 유저가 인터넷에 보내는데 가운데에 프록시 서버를 두면
아이피를 다른걸로 바꿀 수도 있다.
1, 보내는 데이터도 임의로 바꿀 수 있다.
2, 방화벽 기능
3, 웹필터 기능
4, 캐쉬 데이터, 공유 데이터 제공 기능

프록시 서버를 사용하는 이유
1, 회사에서 직원들이나 집안에서 아디들 인터넷 사용 제어
2, 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3, 더 나은 보안 제공
4, 이용 제한된 사이트 접근 가능

# 8 concurrent를 이용해서 백엔드 , 프론트 엔드 서버 같이 켜기
라이브러리
```
npm install concurrently --save
```
사용 방법
pacakge.json의 start부분에 켜고 싶은 것들을 "  \" ??? \" \" ???\" \" ??? \" "  이렇게 나열 하면 된다.

# css framework
css framework를 사용하자 -> ant design -> 디자인이 깔끔, 단, 사이즈가 크다.
가장 큰 장점은 쓰기가 좀 편하다
```
npm install antd
```

index.js에 스타일 sheet을 import해야한다.
```
import 'antd/dist/antd.css'
```
# 9 Redux
predictable state container이다.
state가 무엇인가??
react는 state와 props가 있다.
props는 property의 줄임말이다.
props는 부모 컴포넌트 안에 자식 컴포넌트가 있다면, 부모가 자식에게 주는 값이다.
propt는 소통 방식이 위에서 아래로 만 보낸다. 
즉, 컴포넌트 간의 값을 전달하는 방식이다.
props는 변하지 않는다. 즉, 부모컴포넌트에서 자식 컴포넌트에게 주는 값인 props는 자식에서 값을 바꿀 수 없다.

state는 컴포넌트 안에서 값을 저장하는 것이다. mutable이다.
그리고, state가 2에서 3으로 변하면 리렌더링되는 성격도 가지고 있다.

그래서 redux는 이러한 state(props, state)를 관리해주는 것이다.
가장 상위 컴포넌트에서 comment들의 정보를 보관한다고 하자
그러면 상위 컴포넌트에서 계속해서 값을 내려주어야하고, 값도 바꾸는 방법이 불편하다
그래서 redux를 사용하면 값을 변경하기 편하여 사용이 된다.

redux데이터 flow(unidirectional 이다 -> 한방향)
react component -> action -> reducer -> store -> react component
              (dispatch)                   (subscribe)

1, action 객체 -> 무엇이 일어났는지 쓰는 객체
{
    type : "무엇을 했다' , data: ??,
}

2, reducer -> 액션이 이루어짐에 의해서 다음 stat로 변하는 것을 설명해주는 것이다.
(previousState, action) => nextState

3, store
전체적인 application state을 감싸주는 역할
여기에 있는 메서드들을 이용하여 state를 관리가능

# 10 redux 설치 및 사용
redux 미들웨어 -> redux, react-redux, redux-promise, redux-thunk
```
npm install redux react-redux redux-promise redux-thunk --save
```

redux-promise와 redux-thunk를 쓰는 이유
redux는 redux store가 있다.
이 안에 모든 state를 관리하게 된다.
이 store의 state를 바꾸는 방법은 단 한가지 action을 dispatch시키는 것이다.
이 action은 객체 형식이다. 그러나 이 store에서 언제나 객체 형식의 action을 받는 것이 아니라, promise, functions 형식을 받을 수도 잇다.
redux-thunk는 dispatch에게 어떻게 function을 받을 수 있는지, redux-promise는 dispatch에게 어떻게 promise를 받을 수 있는지 알려주는 것이다.
간단히 말해, redux를 도와주는 것이다.

- 기본 연결
Provider를 이용한다.
우리 application과 redux를 연결하고 싶다면 index.js에 <App/>을 Provider로 감싸주자
그리고 Provider안에 속성으로 store설정가능

redux에 redux-thunk , redux-promise와 같은 미들웨어를 사용하고 싶다면 redux에 있는 applyMiddleware 함수를 사용하면 된다.
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
이런식으로 둔다.

_reducers폴더에 이제 값들을 만들어주자

root_reducer를 두는 이유는 reducer가 여러개 있을 수 있기 때문이다.
reducer는 action을 받고 next값으로 변화시키는 기능을 한다. 즉 state가 변하는 로직을 보여준 다음, 변하는 값을 리턴해준다.
그래서 user에 관한 reducer, post에 관한 reducer 등등이 여러개 있을 수 있다.
그래서 combineReducer라는 기능을 통해 rootReducer 하나로 묶어 라우팅 시킨다고 생각하면 된다.

# 11, react hooks
react에는 class component와 functional component 두 가지로 이루어진다.
class component는 많은 특징, 더 긴 코드, 더 복잡한 코드, 느린 성능
functional component는 적은 기능, 짧은 코드, 간단한 코드, 빠른 성능

어떤 기능을 functional component에서 사용하지 못하는가??

mounting -> updating -> unmouting 이런 순서로 컴포넌트들이 생겨난다.
componentDidMount -> 처음 시작 준비할 때 실행되는 라이프 사이클
componentDidUpdate -> 업데이트 될 때 실행되는 라이프 사이클
componentWillUnmount -> 컴포넌트가 죽을 때 실행되는 라이프 사이클

그런데, functional component는 이런 걸 쓰지 못한다.
즉, 라이프 사이클이 없다.
또한, state가 없었다.
그래서 class component만 썼었다.
이후 리액트 16.8 이후에서도

functional component에서도 라이프 사이클 기능들을 쓸 수 있게 되었다.

react 실행 순서, constructor 먼저 실행 -> render함수 실행 -> 그 다음 componentDidMount가 실행된다. ->update도 비슷한 순서
죽을 때 unmount가 실행된다.

# 12 로그인 기능

# auth 기능
페이지를 정리해보자

아무나 진입 가능 페이지
로그인한 회원만 진입 가능 페이지
로그인 안한 회원은 못들어가는 페이지
관리자만 들어가는 페이지

이렇게 정리하고, 인증에 관한 것들을 처리해보자
HOC를 쓰자, 16강 정도에 썼었다.
higher order component는 function인데, 다른 컴포터는를 받아서 새로운 component를 주는 것
Auth가 hoc이고, 새로운 component를 받아서 인증 받은 컴포넌트를 주도록 하는 것이다.

auth에서 먼저 backend에 req를 보내고, 상태 정보를 가져온다.
가져온 정보를 바탕으로 landingpage면 누구든 들어올 수 있다.
그런데, admin page라면??
관리자가 아니면 못들어오게 한다.
로그인 페이지이면 상태를 가져왔더니 로그인 안했던 유저이다. 그럼 들어올 수 있도록 한다.
그런데, 이미 로그인 한 사람이라면? 다른 곳으로 가도록 한다.

app.js의 route에 모든 컴포넌트들이 모여있으니 이걸 이용하자

에러 수정, props.history.push 를 쓰려면 react-router-dom을 사용해야한다.
그러므로 withRouter로 컴포넌트들을 묶어주어야 한다. 
export default withRouter(component)
이렇게
