import './Leaderboard.css';
import {Box, Button, Divider} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";

function Leaderboard () {

    const history = useHistory();

    const info = [
        {
            user: 'Tomas Berretta',
            position: '1st',
            score: '2093 pts'
        },
        {
            user: 'Tomas Bruno',
            position: '2nd',
            score: '1078 pts'
        },
        {
            user: 'K-TA',
            position: '3rd',
            score: '6 pts'
        },
    ]

    return(
        <div className={'home-background'}>
            <Box className='flex-box-home'>
                <Box mt={5} id='form-home-box'>
                    <div className='title'>Leaderboard (juego)</div>
                    <Divider variant="middle" id='home-divider'/>
                    <div className={'leader-information'}>
                        <div className={'title-leaderboard'}>Position</div>
                        <div className={'title-leaderboard'}>Player</div>
                        <div className={'title-leaderboard'}>Score</div>
                    </div>
                    {info.map((item, index) => (
                        <div className={'leader-information'}>
                            <div className='contact-button'>
                                <div style={{display: 'flex' }}>
                                    <div className={'position'}>{item.position}</div>
                                    <div className={'user'}>{item.user}</div>
                                    <div className={'score'}>{item.score}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={'go-home-button'}>
                        <Button id='go-home' onClick={() => history.push('/home')}>Go Home</Button>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Leaderboard;