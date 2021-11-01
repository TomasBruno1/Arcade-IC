import React from 'react';
import './GamePage.css';
import {Box, Button} from "@material-ui/core";
import SnakeCard from "../../components/snek/snakeCard";
import {useHistory} from "react-router-dom";


const GamePage = (props) => {
  const history = useHistory();

  return (
      <div className='background'>
        <div className='go-back-button'>
          <Button id='register-button' size={"large"} onClick={() => history.push('/home')}>Go Back</Button>
        </div>
        <Box className='flex-container-snake'>
          <Box id='snake-form-box'>
              {window.location.pathname === '/snake' && <SnakeCard/>}
              {/*{window.location.pathname === '/pacman' && <PacmanCard/>}*/}
          </Box>
        </Box>
      </div>
  )
}

export default GamePage;