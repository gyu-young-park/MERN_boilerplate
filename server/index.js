const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8080
const {User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')
//application/x-www-form-urlencoded 이런 타입으로 오는 것을 분석할 수 있도록
app.use(bodyParser.urlencoded({extended: true}) )
//application/json 타입으로 오는 것을 분석할 수 있도록 한다.
app.use(bodyParser.json())

//이제 쿠키파서 사용가능
app.use(cookieParser())

//클라이언트에게서 오는 req, res는 응답으로 돌려보내는 것이다.
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connect...')).catch(err => console.log(err))


app.get('/',(req,res) => {
    res.send('hello world')
})

app.get('/api/hello',(req,res)=>{
    res.send("안녕하세요~")
})

app.post('/api/users/register', (req,res)=> {
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면, 그것들을 db에 저장해준다.
    //우리가 저번에 만든 유저모델을 가져오자

    //req.body안에 json 형식으로 값이 들어있다, 
    //{id: "hello"} 이렇게 들어있을 수 있도록 해주는 것은 bodyParser가 있기 때문이다. 그래서 app.use로 static하게 사용
    //User 스키마를 가져온다. 이 스키마의 파라미터로 들어가는 것이 있다면, 알아서 넣어준다.
    const user = new User(req.body)
    //user save시에 db에 저장된다.
    user.save((err,doc) => {
        if(err){
            return res.json({success: false, err})
        }
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login',(req,res)=>{
    //요청된 이메일이 데이터베이스에 있는 지 확인
    User.findOne({email: req.body.email}, (err, user) => {
        //한 명도 없다면 userInfo가 없다.
        if(!user){
            return res.json({
                loginSuccess:false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //다음은 비밀번호가 같은 지 확인한다.
        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            //비밀번호까지 맞다면 유저를 위한 토큰을 생성해준다.
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err)
                //token을 저장한다. -> 어디에? 쿠키? 로컬스토리지? , 세션?
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

//가운데에 두는 것은 미들웨어이다. callback을 받기 전에 미들웨어에서 처리해준다.
app.get('/api/users/auth', auth, (req,res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말이다. role -> 0이면 일반 유저, 1은 admin이라고 치자
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout',auth, (req,res) => {
    //id로 docs를 찾고, 두번째 인자에서는 바꾸려는 데이터를 넣어준다.
    User.findOneAndUpdate({_id: req.user._id}, {
        token: ""},
        (err,user)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})