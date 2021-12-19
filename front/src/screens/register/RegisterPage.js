import {Box, Button, Divider, FormHelperText, Snackbar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {FormGroup, Input} from "reactstrap";
import {WebcamCapture} from "../../components/webcam/webcam";
import React, {useState} from "react";
import "./RegisterPage.css";
import {userAPI} from "../../apis/userAPI";
import {Alert} from "@material-ui/lab";

const RegisterPage = () => {

    const history = useHistory();

    const [username, setUsername] = useState("")
    const [picture, setPicture] = useState()
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
    const [pictureErrorMsg, setPictureErrorMsg] = useState("")
    const [errorUsername, setErrorUsername] = useState(true)
    const [errorPicture, setErrorPicture] = useState(true)
    const [signUpError, setSignUpError] = useState(false)
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("")

    const onSubmit = async () => {
        if (username === "") {
            setUsernameErrorMsg("* Username is required")
            setErrorUsername(true)
        }
        if (picture === undefined) {
            setPictureErrorMsg("* Picture is required")
            setErrorPicture(true)
        }
        if (errorUsername === false && errorPicture === false) {
            const formData = new FormData();
            formData.append("username", username)
            formData.append("image", picture)
            userAPI.postData(formData).then((response) => {
                if (response === "Username is already taken") {
                    setSignUpError(true)
                    setSignUpErrorMessage(response)
                } else {
                    setSignUpError(false)
                    setSignUpErrorMessage("")
                }
            })
        }
    }

    const validateText = (text) => {
        const name = text.target.value
        if (/^[a-zA-Z0-9-_]+$/.test(name) === true) {
            setUsername(name)
            setUsernameErrorMsg('')
            if (text.target.value === "") setErrorUsername(true)
            else setErrorUsername(false)
        } else {
            setErrorUsername(true)
            setUsernameErrorMsg('* Invalid characters')
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
                        <div className='box-title'>Create your account</div>
                        <Divider variant="middle" id='divider'/>
                        <div className='text-field'>
                            <FormGroup>
                                <Input
                                    id="custom-button"
                                    placeholder=" Username"
                                    onChange={(text) => validateText(text)}
                                    name="username"
                                    error={(!!usernameErrorMsg).toString()}
                                />
                                <FormHelperText id='helper-text' error>
                                    {!!usernameErrorMsg ? usernameErrorMsg : ' '}
                                </FormHelperText>
                            </FormGroup>
                        </div>
                        <WebcamCapture setPicture={setPicture} setPictureError={setPictureErrorMsg}
                                       error={pictureErrorMsg}
                                       user={username} setErrorPicture={setErrorPicture}/>
                        <FormHelperText id='picture-text' error>
                            {!!pictureErrorMsg ? pictureErrorMsg : ' '}
                        </FormHelperText>
                        <div className='suggest-text'>Already have an account?
                            <span className='link-text'
                                  onClick={() => history.push('/login')}>Log in here!</span>
                        </div>
                        <div className='register-button'>
                            <Button id='create-account-button' onClick={onSubmit}>Create Account</Button>
                        </div>
                    </form>
                    <Snackbar
                        open={signUpError}
                        autoHideDuration={6000}
                        onClose={() => {
                            setSignUpError(false)
                            setSignUpErrorMessage("")
                        }}>
                        <Alert severity="error">
                            Sign up was not successful: {signUpErrorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </div>
    )
}

export default RegisterPage;