import { useEffect, useState } from "react"
import callApi from "../utility/callApi"
const UserProfile = ({ onClick, openSidebar, overlayHandle }) => {
    const [apiData, setApiData] = useState([])
    const [loader, setLoader] = useState(true)
    const [defaults, setDefaults] = useState({
        username: ''
    })

    useEffect(() => {
        callApi('/userProfile', 'GET', null,setLoader).then((data) => {
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
                    <div className="userDetails">
                        <div className="profile">
                            <i className="fa fa-user"></i>
                            <p className="username"> {defaults.username}</p>
                        </div>
                        <div className="otherDetails">
                            <ul>
                                <li><p className="signOut" onClick={onClick}> <i className="fa fa-sign-out"></i>Logout</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfile