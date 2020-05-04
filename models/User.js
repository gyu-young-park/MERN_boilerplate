const mongoose = require('mongoose');
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
//이렇게 model로 감싸주면 db에 추가되는 것이다.
const User = mongoose.model('User',userSchema)
module.exports = { User }
// trimm을 true로 하면 gyu name@naver.com라고 검색하면 빈칸을 없애준다.