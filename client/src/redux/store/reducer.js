import { showToast, hideToast } from "./actions";

const initialState = {
    toastHeader: '',
    toastMsg: '',
    toastColor: '',
    toastIcon: '',
    showToast: false
};

const toastReducer = (state = initialState, action) => {
    console.log('action',action);
    switch (action.type) {
        case 'SHOW_TOAST':
            return {
                ...state,
                toastHeader: action.payload.toastHeader,
                toastMsg: action.payload.toastMsg,
                toastColor: action.payload.toastColor,
                toastIcon: action.payload.toastIcon,
                showToast: true
            };
        case 'HIDE_TOAST':
            return {
                ...state,
                showToast: false
            }
        default:
            return state
    }

}

export default toastReducer