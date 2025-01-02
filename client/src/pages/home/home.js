import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';
import ExpenseList from '../../components/ExpenseList';
import Header from '../../components/Header';
import { Link } from 'react-router-dom'


const Home = (props) => {
    const [defaults, setDefaults] = useState({
        totalSum: '12,345',
        day: 'Today'
    })
    const { totalSum, day } = defaults
    return (
        <>
            <div className="home_comp">
                <div className="container">
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