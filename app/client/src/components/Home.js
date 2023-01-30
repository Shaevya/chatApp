import React, { useEffect } from 'react'
import Dashboard from './Dashboard'
import { useUserInfo } from '../contexts/UserInfoProvider'
import Login from './Login';


export default function Home() {
    const { id } = useUserInfo();
    return (
        <>
            {id ? <Dashboard/> : <Login/>}
        </>
    )
}

