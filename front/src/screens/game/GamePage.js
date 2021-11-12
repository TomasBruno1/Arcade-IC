import React from 'react';
import './GamePage.css';
import {Box, Button} from "@material-ui/core";
import SnakeCard from "../../components/snek/snakeCard";
import {useHistory} from "react-router-dom";
import PacmanCard from "../../components/pacman/pacmanCard";


const GamePage = (props) => {
    const history = useHistory();

    return (
        <div className='background'>
            <div className='go-back-button'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/home')}>Go Back</Button>
            </div>
            {window.location.pathname === '/snake' &&
            <Box className='flex-container-snake'>
                <Box id='snake-form-box'>
                    <SnakeCard/>
                </Box>
            </Box>
            }
            {window.location.pathname === '/pacman' &&
            <Box className='flex-container-pacman'>
                <Box id='pacman-form-box'>
                    <PacmanCard/>
                </Box>
            </Box>
            }

        </div>
    )
}

export default GamePage;