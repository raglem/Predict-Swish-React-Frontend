import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "../constants"

function ProtectedRoute({ children }){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        try{
            auth()
        } catch(err){
            console.log(err)
        }
    }, [])

    function auth(){
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        if(decoded.exp < Date.now()/1000){ 
            localStorage.clear()
            setIsAuthorized(false)
            return
        }

        setIsAuthorized(true)
    }

    if(isAuthorized === null)   return
    return isAuthorized ? children : <Navigate to="/"/>
}
export default ProtectedRoute