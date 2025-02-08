import { useEffect, useState } from "react"
import callApi from "../utility/callApi"
import Loader from "./Loader"
import { useNavigate } from "react-router"
const UserProfile = ({ onClick, openSidebar, overlayHandle }) => {
    const Navigate = useNavigate()
    const [defaults, setDefaults] = useState({
        username: localStorage.getItem("username") || null
    })

    useEffect(() => {
        if (!defaults.username) {
            callApi('/userProfile', 'GET', null).then((data) => {
                setDefaults(prev => ({
                    ...prev,
                    username: data.username
                }))
                localStorage.setItem("username", data.username)
            })
        }
        return
    }, [])

    const handlerLogout = () => {
        localStorage.removeItem("username")
        callApi('/logout', 'POST', { username: "dummy" }).then((data) => {
            if (data.auth === false) {
                return Navigate(data.resPath)
            }
        })
    }

    return (
        <>
            <div className="userProfileComp">
                <div className="overlay" onClick={overlayHandle}></div>
                <div className={`sideBarContainer ${openSidebar ? 'open' : ''}`}>
                    <div className="userDetails">
                        <div className="profile">
                            <i className="fa fa-user"></i>
                            <p className="username"> {defaults.username}</p>
                        </div>
                        <div className="otherDetails">
                            <ul>
                                <li><p className="signOut" onClick={handlerLogout}> <i className="fa fa-sign-out"></i>Logout</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfile