import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'
function Register(props) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onPassword = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //이게 없으면 누르면 누를 때마다 리프레쉬가 된다.
        event.preventDefault()
        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }
        let body = {
            email: email,
            password: password,
            name: name
        }
        //리덕스를 사용해서 분리하자
        dispatch(registerUser(body)).then(res =>{
            if(res.payload.success){
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
                
                <label>Name</label>
                <input type='text' value={name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type='password' value={password} onChange={onPassword}/>
                
                <label>Confirm Password</label>
                <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />

                <br/>
                <button type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(Register)
