import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import ExpenseList from '../../components/ExpenseList';
import Header from '../../components/Header';
import { Link } from 'react-router-dom'
import callApi from '../../utility/callApi';
import Toast from '../../components/Toast';
import noDataFoundImage from '../../images/nodatauser.png'
import Loader from '../../components/Loader';
import UserProfile from '../../components/userProfile';

const Home = (props) => {

    const [apiData, setApiData] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState([])
    const [loader, setLoader] = useState(true)
    const [sideBarFlag, setSideBarFlag] = useState(false)
    const [showSignOut, setShowSignOut] = useState(false)
    const [activeCls, setActiveCls] = useState("todayDate")
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

    useEffect((e) => {
        if (apiData.length > 0) {
            apiData.filter((e) => {
                e.expense_type == 'Total' && setDefaults(prev => ({
                    ...prev,
                    totalSum: e.amount
                }))
            })
        }
        else setDefaults(prev => ({
            ...prev, totalSum: "0"
        }))
    }, [apiData])

    //i will handle state later with redux or contxt
    useEffect((e) => {
        let timeout;
        if (showToast) {
            let activeTab = document.getElementsByClassName('active')[0].getAttribute('value')
            timeout = setTimeout(() => {
                setShowToast(false)
                callApi(`/home?date=${activeTab}`, 'GET', null, setLoader).then((data) => {
                    setApiData(data)
                })
            }, 2000);
        }
        return (() => clearTimeout(timeout))
    }, [showToast])

    const handleDate = (e) => {
        e.target.getAttribute('value') === 'todayDate'
            ? setActiveCls('todayDate')
            : e.target.getAttribute('value') === 'last7Days'
                ? setActiveCls('last7Days')
                : setActiveCls('last30Days')
    }
    useEffect(() => {
        callApi(`/home?date=${activeCls}`, 'GET', null, setLoader).then((data) => {
            setApiData(data)
        })
    }, [activeCls])

    const handleUserData = (data) => {
        setSideBarFlag(true)
    }
    const handlersideBar = (data) => {
        setSideBarFlag(!sideBarFlag)
    }
    const handleGetData = (data) => {
        setShowToast(true)
        setToastData(data)
    }

    const { totalSum, day, password, confirmPass } = defaults
    return (
        <>
            {sideBarFlag && <UserProfile openSidebar={sideBarFlag} overlayHandle={handlersideBar} />}
            {loader ? <Loader loaderMsg="Loading" /> :
                <div className="home_comp">
                    <div className="container">
                        {showToast && <Toast toastHeader={toastData.toastHeader} toastMsg={toastData.toastMsg} toastColor={toastData.toastColor} toastIcon={toastData.toastIcon} />}
                        <div className="clearfix"></div>
                        < Header dots={true} name="Dashboard" userProfile={true} sideBarFlagData={handleUserData} />
                        <div className="clearfix"></div>
                        <div className="expenseContainer">
                            <div className="totalMoney"> <span className="rupess">&#x20b9;</span> {totalSum}</div>
                            <div className="currency">INR</div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="expenseDetails">
                            <div className="allExpense">All Expenses {apiData.length > 0 ? `(${apiData.length - 1})` : '(0)'}</div>
                            {/* <div className="viewAll">View All</div> */}
                        </div>
                        <div className="dateTimeContainer">
                            <div className={`todayDate ${activeCls == "todayDate" ? 'active' : ''}`} value="todayDate" onClick={handleDate}>Today</div>
                            <div className={`last7Days ${activeCls == "last7Days" ? 'active' : ''}`} value="last7Days" onClick={handleDate}>Last 7 Days</div>
                            <div className={`last30Days ${activeCls == "last30Days" ? 'active' : ''}`} value="last30Days" onClick={handleDate}>Last Month</div>
                        </div>
                        <div className="expenseDay">
                            <div className="day">{day}</div>
                        </div>
                        {apiData.length > 0 ?
                            <div className="expenseList">
                                <ExpenseList apiData={apiData} onSendData={handleGetData} />
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
            }
        </>
    )
}

export default Home
