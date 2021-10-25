const url = "http://127.0.0.1:8000"

class UserAPI {

    postData = async (data) => {
        try {
            return await fetch(`${url}/users/`, {
                method: 'POST',
                body: data
            })
                .then((response) => {
                    window.location.replace("/login")
                    return response?.json()
                });
        }catch (err) {
            console.log(err)
        }
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

        fetch("http://127.0.0.1:8000/login/", requestOptions)
          .then(response => { return response.json()})
          .then(result => {
              console.log(result)
              console.log(result.username)
              window.sessionStorage.setItem("user", result.username)
              window.location.replace("/home")
          })
          .catch(error => console.log('error', error));
    }


}

export const userAPI = new UserAPI();

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
