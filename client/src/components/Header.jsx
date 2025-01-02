import 'font-awesome/css/font-awesome.min.css';
const Header = ({ name, dots, backBtn, userProfile }) => {
    return <>
        <div className="header_comp">
            <div className="headerContainer">
                <div className="left">
                    {dots &&
                        <div className='squareDots'>
                            <div>
                                <p className='dots'></p>
                                <p className='dots'></p>
                            </div>
                            <div>
                                <p className='dots'></p>
                                <p className='dots'></p>
                            </div>
                        </div>
                    }
                    {backBtn && <i className='fa fa-chevron-left' style={{ cursor: "pointer" }} onClick={() => window.history.back()}></i>}
                    <p className='dashboard'>{name}</p>
                </div>
                <div className="right">
                    {userProfile && <i className='fa fa-user'></i>}
                </div>
            </div>
        </div>
    </>
}

export default Header