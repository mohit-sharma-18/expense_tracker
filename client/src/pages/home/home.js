import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import ExpenseList from '../../components/ExpenseList';
import Header from '../../components/Header';
import { Link } from 'react-router-dom'
import callApi from '../../utility/callApi';
import Toast from '../../components/Toast';
import noDataFoundImage from '../../images/nodatauser.png'
import Loader from '../../components/Loader'

const Home = (props) => {

    const [apiData, setApiData] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [loader, setLoader] = useState(true)
    const [defaults, setDefaults] = useState({
        totalSum: '0',
        day: '',
        password: '',
        confirmPass: '',
    })
    useEffect(() => {
        callApi('/home', 'GET', null, setLoader).then((data) => {
            setApiData(data)
        })
    }, [])

    console.log('apidata', apiData);

    useEffect((e) => {
        if (apiData.length > 0) {
            apiData.filter((e) => {
                e.expense_type == 'Total' && setDefaults(prev => ({
                    ...prev,
                    totalSum: e.amount
                }))
            })
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

    const { totalSum, day, password, confirmPass } = defaults
    return ( 
        <>
            {loader && <Loader />}
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
                        <div className="allExpense">All Expenses {apiData.length > 0 ? `(${apiData.length - 1})` : '(0)'}</div>
                        <div className="viewAll">View All</div>
                    </div>
                    <div className="expenseDay">
                        <div className="day">{day}</div>
                    </div>
                    {/* <div className="clearfix"></div> */}
                    {apiData.length > 0 ?
                        <div className="expenseList">
                            <ExpenseList apiData={apiData} />
                        </div>
                        :
                        <div className='noDataFoundContainer'> <div className="clearfix"></div>
                            <img src={noDataFoundImage} alt="" width={300} />
                            <div className="noDataFound">No expenses added</div>
                            <p className='noDataFoundPara'>Start tracking your expenses to see them here!</p></div>
                    }
                    <div className="addIcon">
                        <Link to='/addExpense'> <i className="fa fa-plus"></i> </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home