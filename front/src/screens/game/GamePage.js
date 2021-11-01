import React from 'react';
import './GamePage.css';
import {Box, Button} from "@material-ui/core";
import SnakeCard from "../../components/snek/snakeCard";
import {useHistory} from "react-router-dom";


const GamePage = () => {
  const history = useHistory();

  return (
      <div className='background'>
        <div className='buttons-position'>
          <Button id='register-button' size={"large"} onClick={() => history.push('/home')}>Go Back</Button>
        </div>
        <Box className='flex-container'>
          <Box id='snake-form-box'>
            <SnakeCard/>
          </Box>
        </Box>
      </div>
  )
}

export default GamePage;