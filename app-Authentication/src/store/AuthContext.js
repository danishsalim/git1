import { createContext, useState } from "react";


const AuthContext=createContext({
    token:null,
    loggedIn:false,
    login:()=>{},
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null)
    const userLoggedIn=!!token;
    const loginHandler=(token)=>{
        setToken(token)
    }
    const logoutHandler=()=>{
        console.log('logout')
        setToken(null)   
    }

    const contextValue={
        token:token,
        isLoggedIn:userLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }
    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;