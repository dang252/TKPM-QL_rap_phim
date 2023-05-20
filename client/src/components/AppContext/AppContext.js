import React, { useEffect, useState, } from 'react'
import { Context } from '../../context/UserContext'

const AppContext = ({children}) => {
    const [username, setUsername] = useState("")
    //doc thong  tin user trong local storage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data !== null) {
            const names = data["name"].split(" ")
            const name = names[names.length - 1]
            setUsername(name)
        }
    }, [])

    return (
        <Context.Provider value = {{username}}>
            {children}
        </Context.Provider>
    )
}

export default AppContext