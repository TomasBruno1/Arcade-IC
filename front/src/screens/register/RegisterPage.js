import {Box, Button, Divider} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {FormGroup, Input} from "reactstrap";
import {WebcamCapture} from "../../components/webcam/webcam";
import {useState} from "react";
import "./RegisterPage.css";

const RegisterPage = () => {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [picture, setPicture] = useState()


    return (
        <div className='background'>
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/')}>Go Back</Button>
            </div>
            <Box className='flex-container'>
                <Box id='form-box' mt={5}>
                    <form method='POST' encType='multipart/form-data'>
                        <div className='box-title'>Create your account</div>
                        <Divider variant="middle" id='divider'/>
                        <div className='text-field'>
                            <FormGroup>
                                <Input id="custom-button" placeholder=" Username" onChange={(text) => setUsername(text.target.value)}/>
                            </FormGroup>
                        </div>
                        <WebcamCapture setPicture={setPicture}/>
                        <div className='suggest-text'>Already have an account?
                            <span className='link-text'
                                  onClick={() => history.push('/login')}>Log in here!</span>
                        </div>
                        <div className='register-button'>
                            <Button id='create-account-button'>Create Account</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    )

}
export default RegisterPage;