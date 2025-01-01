const callApi = (apiPath, apiMethod, apibody) => {

    return fetch(apiPath, {
        method: apiMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apibody)
    })
        .then((res) => {
            if (!res.ok) {
                console.log('Error')
            }
            return res.json()
        })
        .then((data) => {
            console.log('Response', data)
            return data
        })
        .catch((err) => {
            console.log('Error while post req', err);
        })
}

export default callApi

 // fetch('/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(defaults)
        // })
        //     .then((res) => {
        //         if (!res.ok) {
        //             console.log('Error')
        //         }
        //         return res.json()
        //     })
        //     .then((data) => {
        //         console.log('Response', data)
        //         setApiData(data)
        //         setShowToast(true)
        //     })
        //     .catch((err) => {
        //         console.log('Error while post req', err);

        //     })