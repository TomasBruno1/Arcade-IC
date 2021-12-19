import React, {useState} from 'react';
import './GamePage.css';
import {Box, Button} from "@material-ui/core";
import SnakeCard from "../../components/snake/snakeCard";
import {useHistory} from "react-router-dom";
import PacmanCard from "../../components/pacman/pacmanCard";

const GamePage = () => {
    const history = useHistory();
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    return (
        <div className='background'>
            <div className='go-back-button'>
                <Button id='register-button' size={"large"} onClick={() => history.push('/home')}>Go Back</Button>
            </div>
            {window.location.pathname === '/snake' &&
            <Box className='flex-container-snake'>
                <div style={{display: 'flex', flexDirection: 'row', position: 'fixed'}}>
                    <div className={'snake-score'}>Score: {score}</div>
                    {gameOver && <div className={'snake-score'}>Game Over!</div>}
                </div>
                <Box id='snake-form-box'>
                    <SnakeCard setScore={setScore} setGameOver={setGameOver} gameOver={gameOver}/>
                </Box>
            </Box>}
            {window.location.pathname === '/pacman' &&
            <Box className='flex-container-pacman'>
                <Box id='pacman-form-box'>
                    <PacmanCard/>
                </Box>
            </Box>}
        </div>
    )
}

export default GamePage;