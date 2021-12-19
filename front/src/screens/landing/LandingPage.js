import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import './LandingPage.css';

const LandingPage = () => {

    const history = useHistory();

    const developers = [
        {
            name: "Tomás Berretta",
            github: "https://github.com/tomasberretta"
        },
        {
            name: "Tomás Bruno",
            github: "https://github.com/TomasBruno1"
        },
        {
            name: "Catalina Mendizabal",
            github: "https://github.com/CatalinaMendizabal"
        },
        {
            name: "Numa Leone Elizalde",
            github: "https://github.com/NumaLeoneElizalde"
        },
    ]

    return (
        <div className="background">
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/register')}>Register</Button>
                <Button id='login-button' size={"large"} onClick={() => history.push('/login')}>Login</Button>
            </div>
            <div className="welcomeText">Welcome to</div>
            <div className="welcomeText" style={{color: '#0C45D9'}}>RetroMOVE</div>
            <p className='description'> RetroMove is a gaming platform where you can play using your WebCam as
                input and test your motor skills with players all around the globe.</p>
            <div className='description-dev'>Developed by:</div>
            {developers.map((item, index) => (
                <div style={{marginBottom: 8}}>
                    <a href={item.github} className={'link-users'}>- {item.name}</a>
                </div>
            ))}


        </div>
    )
}

export default LandingPage;