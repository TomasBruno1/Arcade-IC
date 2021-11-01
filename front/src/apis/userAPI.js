const url = "http://127.0.0.1:8000"

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
        myHeaders.append("Cookie", "csrftoken=OD8OYJr0jJxVTKCWMvJUtLR1RCWRzrmTCMEFtvYWc5ktazrLkkd04F05qhOiUDAG; sessionid=choat2zzvkb4k5615ep0jcv46fvtzsjp");

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
        myHeaders.append("Cookie", "csrftoken=OD8OYJr0jJxVTKCWMvJUtLR1RCWRzrmTCMEFtvYWc5ktazrLkkd04F05qhOiUDAG; sessionid=choat2zzvkb4k5615ep0jcv46fvtzsjp");

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


}

export const userAPI = new UserAPI();

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
