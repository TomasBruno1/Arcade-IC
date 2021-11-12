import {Box, Button, Divider, FormHelperText, Snackbar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import {FormGroup, Input} from 'reactstrap';
import React, {useState} from "react";
import {WebcamCapture} from '../../components/webcam/webcam'
import {userAPI} from "../../apis/userAPI";
import {Alert} from "@material-ui/lab";


const LoginPage = () => {

    const history = useHistory();

    const [username, setUsername] = useState("")
    const [picture, setPicture] = useState()
    const [usernameError, setUsernameError] = useState("")
    const [pictureError, setPictureError] = useState("")
    const [errorUsername, setErrorUsername] = useState(true)
    const [errorPicture, setErrorPicture] = useState(true)
    const [loginError, setloginError] = useState(false)
    const [loginErrorMessage, setloginErrorMessage] = useState("")

    const onSubmit = () => {
        if (username === "") {
            setUsernameError("* Username is required")
        }
        if (picture === undefined) {
            setPictureError("* Picture is required")
        }
        if (errorUsername === false && errorPicture === false) {
            const formData = new FormData();
            formData.append("username", username)
            formData.append("image", picture)
            userAPI.loginData(formData).then(r => {
                if (r === "Invalid credentials") {
                    setloginError(true)
                    setloginErrorMessage(r)
                } else {
                    setloginError(false)
                    setloginErrorMessage("")
                }
            })
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
                                       onChange={(text) => {
                                           setUsername(text.target.value)
                                           setUsernameError('')
                                           if (text.target.value === "") setErrorUsername(true)
                                           else setErrorUsername(false)
                                       }}
                                       name="username"
                                       error={(!!usernameError).toString()}
                                />
                                <FormHelperText id='helper-text'
                                                error>{!!usernameError ? usernameError : ' '}</FormHelperText>
                            </FormGroup>
                        </div>
                        <WebcamCapture setPicture={setPicture} setPictureError={setPictureError} error={pictureError}
                                       user={username} setErrorPicture={setErrorPicture}/>
                        <FormHelperText id='picture-text' error>{!!pictureError ? pictureError : ' '}</FormHelperText>

                        <div className='suggest-text'>Do not have an account?
                            <span className='link-text'
                                  onClick={() => history.push('/register')}>Register in here!</span>
                        </div>
                        <div className='sign-in-button'>
                            <Button id='button' onClick={onSubmit}>Sign In</Button>
                        </div>
                    </form>

                    <Snackbar
                        open={loginError}
                        autoHideDuration={6000}
                        onClose={() => {
                            setloginError(false)
                            setloginErrorMessage("")
                        }}
                    >
                        <Alert severity="error">
                            Login was not successful: {loginErrorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </div>
    )

}
export default LoginPage;