import './HomePage.css';
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";

const HomePage = () => {

    const history = useHistory();

    const [ name, setName ] = useState("");

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        setName(user)
    }, [])


    return (
        <div className="background">
            <div className='buttons-position'>
                <Button id='register-button' size={"large"}>Register</Button>
                <Button id='login-button' size={"large"}>Login</Button>
            </div>
            <div className="welcomeText">Welcome to</div>
            <div className="welcomeText" style={{color: '#0C45D9'}}>RetroMOVE</div>
            <p className='description'> Home with username: {name} </p>
        </div>
    )
}

export default HomePage;