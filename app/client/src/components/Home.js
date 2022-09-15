import React from 'react'
import Dashboard from './Dashboard'
import Login from './Login';
import { useUserInfo } from '../contexts/UserInfoProvider'

export default function Home() {
    const { id, setId } = useUserInfo();
    return (
        <>
            {id ? <Dashboard/> : <Login onIdSubmit={setId}/>}
        </>
    )
}
