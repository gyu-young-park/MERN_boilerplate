import React, {useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'
//컴포넌트, 로그인 옵션, admin인지 아닌지
export default function (SpecificComponent, option, adminRoute = null){
    //option
    //null -> 아무나 출입이 가능한 페이지
    //true -> 로그인한 유저만 출입 가능한 페이지
    //false -> 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props){
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res)
                //로그인이 불가능한 상태
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                    //로그인한 상태
                }
            })
            axios.get('/api/users/auth')
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}