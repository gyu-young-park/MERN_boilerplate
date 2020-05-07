const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})
// 여기서 암호화를 실행한다. next는 save 다음 코드들, 즉 save에 있는 callback 코드를 말한다.
userSchema.pre('save',function(next){
    //호출된 시점에서의 userSchema
    var user = this
    //user가 비밀번호를 바꿀 때만 해당 코드를 실행하도록 한다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err)
            //암호화 하고 싶은거, salt, callback(err,hash) -> hash는 해싱된 비밀번호
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password = hash
                //callback 실행
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.statics.findByToken = function(token, callback){
    var user =this
    //토큰을 decode한다.
    jwt.verify(token,'secretToken',function(err, decoded){
        //decoded된 것이 userid이다.

        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라리언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token},function(err, user){
            if(err) return callback(err);
            callback(null, user)
        })
    })
}

userSchema.methods.comparePassword = function(plainPassword, callback){
    //plainPassword, 암호화된 비밀번호를 같은 지 체크한다. 이는 plainPassword를 암호화해서 db에 있는 비밀번호와 같은 지 체크하면 된다.
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return callback(err)
        //isMatch가 true가 된다.
        callback(null,isMatch)
    })
}

userSchema.methods.generateToken = function(callback){
    //jsonwebtoken을 이용해서 토큰 생성
    var user = this
    //user._id + 'secretToken' = token 이 나온다. 나중에 token을 해석할 때 secretToeken을 넣으면 user_id가 나온다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err,user){
        if(err) return callback(err)
        callback(null,user)
    })
}

//이렇게 model로 감싸주면 db에 추가되는 것이다.
const User = mongoose.model('User',userSchema)
module.exports = { User }
// trimm을 true로 하면 gyu name@naver.com라고 검색하면 빈칸을 없애준다.