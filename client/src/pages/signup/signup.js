import TextBox from '../../components/TextBox'
import logo from '../../images/logo.png'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { use, useEffect, useState } from 'react'
import Toast from '../../components/Toast'
import callApi from '../../utility/callApi'
import Loader from '../../components/Loader'

const Signup = () => {
    const Navigate = useNavigate()
    const [showToast, setShowToast] = useState(false)
    const [loader, setLoader] = useState(false)
    const [defaults, setDefaults] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
    })
    const [apiData, setApiData] = useState([])

    const { username, email, password, confirmPass } = defaults

    const handlerSubmit = (e) => {
        setLoader(true)
        e.preventDefault()
        callApi('/signup', 'POST', defaults,setLoader).then((data) => {
            setApiData(data)
            setShowToast(true)
        })
    }
    const handlerInput = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value,
        }))

    }
    useEffect(() => {
        if (apiData.toastHeader === 'Success') {
            setTimeout(() => {
                Navigate('/login')
            }, 2500);
        }

    }, [apiData])
    
     //i will handle state later with redux or contxt
     useEffect((e) => {
        let timeout;
        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false)
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [showToast])

    return (

        <>
         {loader && <Loader loaderMsg="Please wait while we finish setting up your account" />}
            <div className="signup_comp">
                {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                <div className="header">
                    <div className="logo">
                        <img src={logo} alt="logo is here" width={230} />
                    </div>
                    <div className="signUpDetails">
                        <h1>
                            Create Account
                        </h1>
                        <p>Create an account so you can explore all the features</p>
                    </div>
                    <div className="formDetails">
                        <form onSubmit={handlerSubmit}>
                            <div className="formElements">
                                <TextBox name="username" placeholder="Username" value={username} onChange={handlerInput}></TextBox>
                                <TextBox name="email" placeholder="Email" value={email} onChange={handlerInput}></TextBox>
                                <TextBox name="password" placeholder="Password" value={password} onChange={handlerInput}></TextBox>
                                <TextBox name="confirmPass" className="confirmPass" placeholder="Confirm Password" value={confirmPass} onChange={handlerInput}></TextBox>
                            </div>
                            <div className="btn">
                                <Button type="submit" name="Sign Up" className="primary" style={{ width: "285px" }}></Button>
                                <Link to='/login'> <Button name="Already have an account" className="secondary createBtn" style={{ width: "285px" }}></Button></Link>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Signup
