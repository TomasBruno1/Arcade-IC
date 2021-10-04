import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import './LandingPage.css';

const LandingPage = () => {

    const history = useHistory();

    return (
        <div className="background">
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/register')}>Register</Button>
                <Button id='login-button' size={"large"} onClick={() => history.push('/login')}>Login</Button>
            </div>
            <div className="welcomeText">Welcome to</div>
            <div className="welcomeText" style={{color: '#0C45D9'}}>RetroMOVE</div>
            <p className='description'> RetroMove is a ... Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        )
}

export default LandingPage;