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
    const [usernameError, setUsernameError] = useState("")
    const [pictureError, setPictureError] = useState("")
    const [errorUsername, setErrorUsername] = useState(true)
    const [errorPicture, setErrorPicture] = useState(true)
    const [signUpError, setSignUpError] = useState(false)
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("")

    const onSubmit = async () => {
        if (username === "") {
            setUsernameError("* Username is required")
            setErrorUsername(true)
        }
        if (picture === undefined) {
            setPictureError("* Picture is required")
            setErrorPicture(true)
        }
        if (errorUsername === false && errorPicture === false) {
            const formData = new FormData();
            formData.append("username", username)
            formData.append("image", picture)
            userAPI.postData(formData).then((response) =>  {
                if(response === "Username is already taken") {
                    setSignUpError(true)
                    setSignUpErrorMessage(response)
                }
                else {
                    setSignUpError(false)
                    setSignUpErrorMessage("")
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
                        <div className='box-title'>Create your account</div>
                        <Divider variant="middle" id='divider'/>
                        <div className='text-field'>
                            <FormGroup>
                                <Input
                                    id="custom-button"
                                    placeholder=" Username"
                                    onChange={(text) => {
                                        const name = text.target.value
                                        if(/^[a-zA-Z0-9-_]+$/.test(name) === true){
                                            setUsername(name)
                                            setUsernameError('')
                                            if(text.target.value === "") setErrorUsername(true)
                                            else setErrorUsername(false)
                                        }else{
                                            setErrorUsername(true)
                                            setUsernameError('* Invalid characters')
                                        }

                                    }}
                                    name="username"
                                    error={(!!usernameError).toString()}
                                />
                                <FormHelperText id='helper-text' error>{!!usernameError ? usernameError : ' '}</FormHelperText>
                            </FormGroup>
                        </div>
                        <WebcamCapture setPicture={setPicture} setPictureError={setPictureError} error={pictureError} user={username} setErrorPicture={setErrorPicture}/>
                        <FormHelperText id='picture-text' error>{!!pictureError ? pictureError : ' '}</FormHelperText>
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
                        }}
                    >
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