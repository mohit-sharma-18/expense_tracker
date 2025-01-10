const ExpenseList = (props) => {
    const { listHeader, listPara, expense,icon } = props
    return (
        <>
            <div className="expenseList_comp">
                <div className="container">
                    <ul className="exListBox">
                        <li className="exListItem">
                            <div className="expenseListContainer">
                                <div className="left">
                                    <div className="icon">
                                        <i className={`fa ${icon}`}></i>
                                    </div>
                                    <div className="details">
                                        <h4 className="listHeader">{listHeader}</h4>
                                        <p className="listPara">{listPara}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <p className="expense"> <span className="rupess">&#x20b9;</span>{expense}</p>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default ExpenseList