import {Box, Button, Divider, makeStyles, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {

    const history = useHistory();

    const useStylesCustomized = makeStyles((theme) => ({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 10,
            backgroundColor: '#e3e8e6',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#e3e8e6',
            },
            '&$focused': {
                backgroundColor: '#e3e8e6',
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
    }));

    function CustomTextField(props) {
        const classes = useStylesCustomized();
        return <TextField InputProps={{classes, disableUnderline: true}} {...props} />;
    }

    return (
        <div className='background'>
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/')}>Go Back</Button>
            </div>
            <Box className='flex-container'>
                <Box id='form-box' mt={5}>
                    <div className='box-title'>Sign In</div>
                    <Divider variant="middle" id='divider'/>
                    <div className='text-field'>
                        <CustomTextField label="Username" variant="filled" id='custom-button'/>
                    </div>
                    <div className='text-field'>
                        <Button id='face-recognition-button' variant="outlined">Face recognition</Button>
                    </div>
                    <div className='suggest-text'>Do not have an account?
                        <span className='link-text' onClick={() => history.push('/register')}>Register in here!</span>
                    </div>
                    <div className='sign-in-button'>
                        <Button id='button'>Sign In</Button>
                    </div>
                </Box>
            </Box>
        </div>
    )

}
export default LoginPage;