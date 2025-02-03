export const showToast = (toastData) => ({
    type: 'SHOW_TOAST',
    payload: toastData
})

export const hideToast = () => ({
    type: 'HIDE_TOAST'
})

