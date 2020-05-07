import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'
function LoginPage(props){
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPassword = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //이게 없으면 누르면 누를 때마다 리프레쉬가 된다.
        event.preventDefault()
        console.log('email ', email)
        console.log('password ', password)
        let body = {
            email: email,
            password: password
        }
        //리덕스를 사용해서 분리하자
        dispatch(loginUser(body)).then(res =>{
            if(res.payload.loginSuccess){
                props.history.push('/')
            }else{
                alert('error')
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center' , alignItems : 'center', width: '100%' , height: '100vh'}}>
            <form style={{display: 'flex' , flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPassword} />
                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)