import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {

    const history = useHistory();

    return (
        <div className='background'>
            <div className='buttons-position'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/')}>Go Back</Button>
            </div>
        </div>
    )

}
export default RegisterPage;