import {Box, Button, Divider, FormHelperText} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import {FormGroup, Input} from 'reactstrap';
import React, {useState} from "react";
import {WebcamCapture} from '../../components/webcam/webcam'
import {userAPI} from "../../apis/userAPI";


const LoginPage = () => {

    const history = useHistory();

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [picture, setPicture] = useState()
    const [pictureError, setPictureError] = useState("")

    const onSubmit = () => {
        if (username === "") {
            setUsernameError("* Username is required")
        }
        if (picture === undefined) {
            setPictureError("* Picture is required")
        }
        if(false) {
            const formData = new FormData();
            formData.append("username", username)
            formData.append("image", picture)
            userAPI.loginData(formData).then((response) =>  {
                console.log(response)
            })
            console.log(formData)
        }

    }


    return (
        <div className='background'>
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/')}>Go Back</Button>
            </div>
            <Box className='flex-container'>
                <Box id='form-box' mt={5}>
                    <form>
                        <div className='box-title'>Sign In</div>
                        <Divider variant="middle" id='divider'/>
                        <div className='text-field'>
                            <FormGroup>
                                <Input id="custom-button" placeholder=" Username"
                                       onChange={(text) => setUsername(text.target.value)}/>
                                <FormHelperText id='helper-text' error>{!!usernameError ? usernameError : ' '}</FormHelperText>
                            </FormGroup>
                        </div>
                        <WebcamCapture setPicture={setPicture} user={username}/>
                        <FormHelperText id='picture-text' error>{!!pictureError ? pictureError : ' '}</FormHelperText>

                        <div className='suggest-text'>Do not have an account?
                            <span className='link-text'
                                  onClick={() => history.push('/register')}>Register in here!</span>
                        </div>
                        <div className='sign-in-button'>
                            <Button id='button' onClick={onSubmit}>Sign In</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    )

}
export default LoginPage;