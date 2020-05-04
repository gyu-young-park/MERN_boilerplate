const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8080
const {User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')
//application/x-www-form-urlencoded 이런 타입으로 오는 것을 분석할 수 있도록
app.use(bodyParser.urlencoded({extended: true}) )
//application/json 타입으로 오는 것을 분석할 수 있도록 한다.
app.use(bodyParser.json())

//클라이언트에게서 오는 req, res는 응답으로 돌려보내는 것이다.
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connect...')).catch(err => console.log(err))


app.get('/',(req,res) => {
    res.send('hello world')
})

app.post('/register', (req,res)=> {
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

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})