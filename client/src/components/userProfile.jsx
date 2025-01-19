import { useEffect, useState } from "react"
import Header from "./Header"
import callApi from "../utility/callApi"
const UserProfile = ({ onClick, openSidebar, overlayHandle }) => {
    const [apiData, setApiData] = useState([])
    const [defaults, setDefaults] = useState({
        username: ''
    })

    useEffect(() => {
        callApi('/userProfile', 'GET', null).then((data) => {
            console.log('data', data[0].username)
            setApiData(data)
            setDefaults(prev => ({
                ...prev,
                username: data[0].username
            }))
        })
    }, [])

    return (
        <>
            <div className="userProfileComp">
                <div className="overlay" onClick={overlayHandle}></div>
                <div className={`sideBarContainer ${openSidebar ? 'open' : ''}`}>
                    < Header dots={true} name="User Profile" />
                    <div className="userDetails">
                        <p className="username"> <i className="fa fa-user"></i>{defaults.username}</p>
                        <p className="signOut" onClick={onClick}> <i className="fa fa-sign-out"></i>Sign Out</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfile