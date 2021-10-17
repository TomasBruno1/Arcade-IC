import {Box, Button, Divider } from "@material-ui/core";
import {useHistory} from "react-router-dom";
import './LoginPage.css';
import { FormGroup,  Input } from 'reactstrap';
import {useState} from "react";
import { WebcamCapture} from '../../components/webcam/webcam'


const LoginPage = () => {

    const history = useHistory();

    const [toggleFaceRecognition, setToggleFaceRecognition] = useState()
    const [username, setUsername] = useState("")
    const [picture, setPicture] = useState()

    const verifyUser = async () => {

        const formData  = new FormData();
        formData.append("username", username)
        formData.append("image", picture)

        console.log({
                formData
            })

        const response = await fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            body: formData
        });

        // const response = await fetch('localhost:8080/users', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         username,
        //         picture
        //     }),
        //     headers: {
        //         "Content-type": "multipart/form-data;",
        //     },
        // });
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
                                <Input id="custom-button" placeholder=" Username" onChange={(text) => setUsername(text.target.value)}/>
                            </FormGroup>
                        </div>
                        <div className='text-field'>
                            <Button id='face-recognition-button' variant="outlined" onClick={() => setToggleFaceRecognition(true)}>Face recognition</Button>
                            {/*{toggleFaceRecognition ? <WebcamCapture setPicture={setPicture}/> : null}*/}
                            <input type='file' onChange={(evt) => setPicture(evt.target.files[0])}/>

                        </div>
                        <div className='suggest-text'>Do not have an account?
                            <span className='link-text' onClick={() => history.push('/register')}>Register in here!</span>
                        </div>
                        <div className='sign-in-button'>
                            <Button id='button' onClick={verifyUser}>Sign In</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    )

}
export default LoginPage;