import {Box, Button, Divider, FormHelperText} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {FormGroup, Input} from "reactstrap";
import {WebcamCapture} from "../../components/webcam/webcam";
import React, {useEffect, useState} from "react";
import "./RegisterPage.css";
import {userAPI} from "../../apis/userAPI";

const RegisterPage = () => {

    const history = useHistory();
    const [username, setUsername] = useState("")
    const [picture, setPicture] = useState()
    const [usernameError, setUsernameError] = useState("")
    const [pictureError, setPictureError] = useState("")
    const [errorUsername, setErrorUsername] = useState(true)
    const [errorPicture, setErrorPicture] = useState(true)

    const onSubmit = async () => {
        console.log(username)
        if (username === "") {
            setUsernameError("* Username is required")
            setErrorUsername(true)
        }
        if (picture === undefined) {
            setPictureError("* Picture is required")
            setErrorPicture(true)
        }
        console.log(errorUsername)
        console.log(errorPicture)
        if (errorUsername === false && errorPicture === false) {
            const formData = new FormData();
            formData.append("username", username)
            formData.append("image", picture)
            console.log(formData)
            userAPI.postData(formData).then((response) =>  {
                history.push('/login')
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
                                        setUsername(text.target.value)
                                        setUsernameError('')
                                        if(text.target.value === "") setErrorUsername(true)
                                        else setErrorUsername(false)
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
                </Box>
            </Box>
        </div>
    )

}
export default RegisterPage;