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
            url: '/snake'
        },
        {
            name: 'Pacman',
            img: pacman,
            url: '/pacman'
        }
    ]

    return (
        <div className="home-background">
            <div className='buttons-position'>
                <Button id='log-out-button' size={"large"} onClick={() => {
                    window.sessionStorage.removeItem("user");
                    history.push('/')
                }}>Log out</Button>
            </div>
            <Box className='flex-box-home'>
                <Box mt={5} id='form-home-box'>
                    <div className='title'>Welcome {name}!</div>
                    <Divider variant="middle" id='home-divider'/>
                    {games.map((item, index) => (
                        <div className='game-form'>
                            <img src={item.img} className='game-img' alt={''}/>
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