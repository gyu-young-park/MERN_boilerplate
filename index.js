const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8080
//클라이언트에게서 오는 req, res는 응답으로 돌려보내는 것이다.
mongoose.connect('mongodb+srv://gyu:p3891010!@boilerplate-omkra.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connect...')).catch(err => console.log(err))


app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})