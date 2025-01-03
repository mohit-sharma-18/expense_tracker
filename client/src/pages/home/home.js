import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import ExpenseList from '../../components/ExpenseList';
import Header from '../../components/Header';
import { Link } from 'react-router-dom'
import callApi from '../../utility/callApi';
import Toast from '../../components/Toast';


const Home = (props) => {

    const [apiData, setApiData] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [defaults, setDefaults] = useState({
        totalSum: '',
        day: '',
        password: '',
        confirmPass: '',
    })
    useEffect(() => {
        callApi('/home', 'GET', null).then((data) => {
            setApiData(data)
        })
    }, [])

    console.log('apidata', apiData);
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

    const { totalSum, day, password, confirmPass } = defaults
    return (
        <>
            <div className="home_comp">
                <div className="container">
                    {showToast && <Toast toastHeader={apiData.toastHeader} toastMsg={apiData.toastMsg} toastColor={apiData.toastColor} toastIcon={apiData.toastIcon} />}
                    <div className="clearfix"></div>
                    < Header dots={true} name="Dashboard" userProfile={true} />
                    <div className="clearfix"></div>
                    <div className="expenseContainer">
                        <div className="totalMoney"> <span className="rupess">&#x20b9;</span> {totalSum}</div>
                        <div className="currency">INR</div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="expenseDetails">
                        <div className="allExpense">All Expenses</div>
                        <div className="viewAll">View All</div>
                    </div>
                    <div className="expenseDay">
                        <div className="day">{day}</div>
                    </div>
                    {/* <div className="clearfix"></div> */}
                    <div className="expenseList">
                        <ExpenseList listHeader="Coffee" listPara="with anyone" expense="100" />
                    </div>
                    <div className="addIcon">
                        <Link to='/addExpense'> <i className="fa fa-plus"></i> </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home