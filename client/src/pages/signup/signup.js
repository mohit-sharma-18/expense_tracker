import TextBox from '../../components/TextBox'
import logo from '../../images/logo.png'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import callApi from '../../utility/callApi'
import Loader from '../../components/Loader'

const Signup = () => {
    const Navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [defaults, setDefaults] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
    })
    const [apiData, setApiData] = useState([])
    const [fieldError, setFieldError] = useState({})

    const { username, email, password, confirmPass } = defaults

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setLoader(true)
            callApi('/signup', 'POST', defaults, setLoader).then((data) => {
                setApiData(data)
            })
        }
        return

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


    const validate = () => {
        let errors = {}
        for (let key in defaults) {
            if (defaults[key].trim().length < 1) {
                errors[key] = 'error'
            }
            else if (!/\S+@\S+\.\S+/.test(defaults.email)) {
                errors.email = 'error'
            }
            else if (defaults.password !== defaults.confirmPass) {
                errors.password = 'error'
                errors.confirmPass = 'error'
            }
        }
        setFieldError(errors)
        return Object.entries(errors).length > 0 ? false : true
    }

    return (

        <>
            {loader && <Loader loaderMsg="Please wait while we finish setting up your account" />}
            <div className="signup_comp">
                <div className="header">
                    <div className="logo">
                        <img src={logo} alt="logo is here" width={230} />
                    </div>
                    <div className="signUpDetails">
                        <h1>
                            Create an account
                        </h1>
                        <p>Create an account so you can explore all the features</p>
                    </div>
                    <div className="formDetails">
                        <form onSubmit={handlerSubmit}>
                            <div className="formElements">
                                <TextBox id="username" name="username" className={`username ${fieldError.username ? 'error' : ''}`} placeholder="Username" value={username} onChange={handlerInput}></TextBox>
                                <TextBox id="email" name="email" className={`email ${fieldError.email ? 'error' : ''}`} placeholder="Email" value={email} onChange={handlerInput}></TextBox>
                                <TextBox id="password" name="password" className={`password  ${fieldError.password ? 'error' : ''}`} placeholder="Password" value={password} onChange={handlerInput}></TextBox>
                                <TextBox id="confrimPass" name="confirmPass" className={`confirmPass  ${fieldError.confirmPass ? 'error' : ''}`} placeholder="Confirm Password" value={confirmPass} onChange={handlerInput}></TextBox>
                            </div>
                            <div className="btn">
                                <Button type="submit" name="Sign Up" className="primary" style={{ width: "325px" }}></Button>
                                {/* <Link to='/login'> <Button name="Already have an account" className="secondary createBtn" style={{ width: "325px" }}></Button></Link> */}
                                <div className="login" style={{ "fontSize": "15px", "margin": "16px", fontWeight: "500", "color": "grey" }}>Already have an account? <Link to="/login">Login</Link> </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Signup
