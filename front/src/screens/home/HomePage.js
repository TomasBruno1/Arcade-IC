import './HomePage.css';
import {useHistory} from "react-router-dom";
import {Box, Button, Divider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import pacman from '../../img/pacman.jpeg';
import snake from '../../img/snake.png';

const HomePage = () => {

    const history = useHistory();

    const [name, setName] = useState("");

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        setName(user)
    }, [])

    const games = [
        {
            name: 'Snake',
            img: snake,
            url: '/snek'
        },
        {
            name: 'Pacman',
            img: pacman,
            url: ''
        }
    ]

    return (
        <div className="background">
            <Box className='flex-box'>
                <Box mt={5} id='form-box'>
                    <div className='title'>Welcome {name}!</div>
                    <Divider variant="middle" id='divider'/>
                    {games.map((item, index) => (
                        <div className='game-form'>
                            <img src={item.img} className='game-img'/>
                            <div className='game-title'>{item.name}</div>
                            <div className='button-group'>
                                <Button id='game-button' onClick={() => history.push(item.url)}>Play</Button>
                                <Button id='game-button'>Leaderboard</Button>
                            </div>
                        </div>
                    ))}

                </Box>
            </Box>
        </div>
    )
}

export default HomePage;