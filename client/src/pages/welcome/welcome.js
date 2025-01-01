import logo from '../../images/logo.png'
import Button from '../../components/Button'
const welcomePage = () => {
    return <>
        <div className="welcome_page_comp">
            <div className="logo">
                <img src={logo} alt="logo is here" width={200} />
            </div>
            <div className="paraSection">
                <p>Expense Tracker</p>
                <p>Tracking your daily spending</p>
            </div>
            <div className="btn">
                <Button name='Login' className="primary"></Button>
                <Button name='Register' className="secondary"></Button>
            </div>
        </div>
    </>
}

export default welcomePage