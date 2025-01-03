import TextBox from '../../components/TextBox'
import logo from '../../images/logo.png'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import callApi from '../../utility/callApi'
import Toast from '../../components/Toast'

const Login = () => {
    const [apiData, setApidata] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [defaults, setDefaults] = useState({
        email: '',
        password: ''
    })
    const { email, password } = defaults
    const Navigate = useNavigate()

    const handlerSubmit = (e) => {
        e.preventDefault()
        callApi('/login', 'POST', defaults).then((data) => {
            if (data.auth === true) {
                return Navigate(data.resPath)
            }
            setApidata(data)
            setShowToast(true)
        })
    }

    const handlerChange = (e) => {
        const { name, value } = e.target
        setDefaults((prev) => ({
            ...prev, [name]: value,
        }))

    }
    return (
        <>
            <div className="login_comp">
                {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                <div className="header">
                    <div className="logo">
                        <img src={logo} alt="logo is here" width={230} />
                    </div>
                    <div className="loginDetails">
                        <h1>
                            Login here
                        </h1>
                        <p>Welcome back you've been missed!</p>
                    </div>
                    <div className="formDetails">
                        <form onSubmit={handlerSubmit}>
                            <div className="formElements">
                                <TextBox name="email" placeholder="Email" value={email} onChange={handlerChange}></TextBox>
                                <TextBox name="password" placeholder="Password" value={password} onChange={handlerChange}></TextBox>
                                <div className='forgotPass'><a href='#' >Forgot your password?</a></div>
                            </div>
                            <div className="btn">
                                <Button type="submit" name="Sign in" className="primary" style={{ width: "285px" }}></Button>
                                <Link to="/signup"> <Button name="Create new account" className="secondary createBtn" style={{ width: "285px" }}></Button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login