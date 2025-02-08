export const showToast = (toastData) => ({
    type: 'SHOW_TOAST',
    payload: toastData
})

export const hideToast = () => ({
    type: 'HIDE_TOAST'
})

export const showLoader = (loaderState) => ({
    type: 'SHOW_LOADER',
    payload: loaderState
})

export const hideLoader = (loaderState) => ({
    type: 'HIDE_LOADER',
    payload: loaderState
})