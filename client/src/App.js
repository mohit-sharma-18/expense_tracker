import { useDispatch, useSelector } from 'react-redux';
import './App.css';
// import WelcomePage from './pages/welcome/welcome';
import './assests/styles/main.scss'
import AddExpense from './pages/expense/addExpense';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { Routes, Route, Navigate } from "react-router-dom";
import Toast from './components/Toast';
import { hideToast } from './redux/store/actions';
import Loader from './components/Loader';
import { useEffect } from 'react';

const App = () => {

  const toast = useSelector((state) => state.toast)
  const dispatch = useDispatch()
  console.log('toast', toast);
  useEffect(() => {
    console.log(' toast.showLoader', toast.showLoader)
  })
  return (
    <div className="App">
      {toast.showToast &&
        <Toast
          toastHeader={toast.toastHeader}
          toastMsg={toast.toastMsg}
          toastColor={toast.toastColor}
          toastIcon={toast.toastIcon}
          closeToast={() => dispatch(hideToast())}
        />

      }
      {

        toast.showLoader && <Loader loaderMsg="Loading" />
      }
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </div>
  );
}

export default App;
