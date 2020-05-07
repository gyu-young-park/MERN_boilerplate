const {User} = require('../models/User')
//인증 처리 로직
let auth = (req,res,next) => {
    //클라리언트 쿠키에서 토큰을 가져온다. -> cookies이용, 이전에 x_auth로 쿠키를 만들었으니 이렇게 가져오면 된다.
    let token = req.cookies.x_auth
    //토큰을 복호화 한 다음에 유저를 찾아야 한다. -> token에 user_id가 있다.
    //db에서 유저가 token이 있다면 인증 ok 
    //
    User.findByToken(token, (err,user)=> {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        req.token = token
        req.user = user
        //미들웨어 이므로 다 할거 했으면, next로 갈 수 있도록 한다.
        next()
    })
}

module.exports = { auth}