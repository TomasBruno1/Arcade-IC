import './Leaderboard.css';
import {Box, Button, Divider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {userAPI} from "../../apis/userAPI";

function Leaderboard() {

    const history = useHistory();
    const [info, setInfo] = useState([])
    const [users, setUsers] = useState([])
    const [userPos, setUserPos] = useState(0)


    useEffect(() => {
        userAPI.getData().then(res => {
            setInfo(res)
            getPositions(res)
        })
    }, [])

    const getPositions = (response) => {
        const filtered = response.filter(u => u.username !== 'admin')
        let sorted;
        if (window.location.pathname === '/snake') sorted = filtered.sort(u => u.score_snake)
        else sorted = filtered.sort(u => u.score_pacman)
        let taked = sorted.slice(0, 5)
        if (taked.find(u => u.username === sessionStorage.getItem('user')) !== undefined) {
            setUsers(taked)
            const pos = sorted.map(u => u.username).indexOf(sessionStorage.getItem('user'))
            setUserPos(pos + 1)
        }
        else {
            taked = sorted.slice(0, 4)
            const pos = sorted.map(u => u.username).indexOf(sessionStorage.getItem('user'))
            setUserPos(pos + 1)
            const user = sorted.map(u => u.username).find(sessionStorage.getItem('user'))
            taked = [...taked, user]
            console.log(taked)
        }
    }

    return (
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
                    {users.map((item, index) => (
                        <div className={'leader-information'}>
                            <div className='contact-button'>
                                <div style={{display: 'flex'}}>
                                    {item.username !== sessionStorage.getItem('user') ? <div className={'position'}>{index + 1}</div> : <div className={'position'}>{userPos}</div> }
                                    <div className={'user'}>{item.username}</div>
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