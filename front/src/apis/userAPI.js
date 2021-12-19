const url = "http://127.0.0.1:8000";
const cookie = "csrftoken=OD8OYJr0jJxVTKCWMvJUtLR1RCWRzrmTCMEFtvYWc5ktazrLkkd04F05qhOiUDAG; sessionid=choat2zzvkb4k5615ep0jcv46fvtzsjp";

class UserAPI {

    postData = async (data) => {
        let error = undefined
        await fetch(`${url}/users/`, {
            method: 'POST',
            body: data
        })
            .then((response) => {
                if(response.ok === true) {
                    window.location.replace("/login")
                    return response?.json()
                }else{
                    error = "Username is already taken"
                }
            })
        return error
    }


    loginData = async ( data = {}) => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", cookie);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        let error = undefined
        await fetch(`${url}/login/`, requestOptions)
            .then(response => {
                return response.json()})
            .then(result => {
                window.sessionStorage.setItem("user", result.username)
                window.location.replace("/home")
            })
            .catch(() => {
                error = "Invalid credentials"
            });
        return error
    }

    logoutData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", cookie);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        let error = undefined
        await fetch(`${url}/logout/`, requestOptions)
            .then(response => {
                return response.json()})
            .then(result => result)
            .catch(() => {
                error = "Invalid credentials"
            });
        return error
    }

    getData = async (game) => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", cookie);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let array;
        await fetch(`${url}/users/?game=${game}`, requestOptions)
            .then(response => {
                return response.json()})
            .then(result => {
                array = result
            })
        return array;
    }

    putData = async ( data = {}) => {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", cookie);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };
        await fetch(`${url}/users/`, requestOptions).then(response => {
                return response
        })
    }
}

export const userAPI = new UserAPI();

