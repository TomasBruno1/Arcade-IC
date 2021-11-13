import './Leaderboard.css';
import {Box, Button, Divider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {userAPI} from "../../apis/userAPI";

function Leaderboard() {

    const history = useHistory();
    const [users, setUsers] = useState([])
    const [userPos, setUserPos] = useState(0)
    const {game} = useParams()


    useEffect(() => {
        userAPI.getData().then(res => {
            getPositions(res)
        })
    }, [])

    const getPositions = (response) => {
        const filtered = response.filter(u => u.username !== 'admin')
        let sorted;
        if (game === 'snake') sorted = filtered.sort((a,b) =>{
            if (a.score_snake < b.score_snake) {
                return 1;
            }
            if (a.score_snake > b.score_snake) {
                return -1;
            }
            return 0;
        })
        else sorted = filtered.sort((a,b) =>{
            if ( a.score_pacman< b.score_pacman ){
                return 1;
            }
            if ( a.score_pacman > b.score_pacman ){
                return -1;
            }
            return 0;
        })

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
            const user = sorted.find(u => u.username === sessionStorage.getItem('user'))
            taked = [...taked, user]
            setUsers(taked)
        }
    }

    return (
        <div className={'home-background'}>
            <Box className='flex-box-home'>
                <Box mt={5} id='form-home-box'>
                    <div className={'title-leaderboard-box'}>
                        <div className='title'>Leaderboard: {game === 'snake' ? <span className={'name-game'}>Snake</span> : <span className={'name-game'}>Pacman</span> }</div>
                        <div className={'go-home-button'}>
                            <Button id='go-home' onClick={() => history.push('/home')}>Go Home</Button>
                        </div>
                    </div>
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
                                    {item.username !== sessionStorage.getItem('user') ? <div className={'user'}>{item.username}</div> : <div className={'user'} style={{textDecorationLine: "underline"}}>{item.username}</div> }
                                    {game === 'snake' ? <div className={'score'}>{item.score_snake}</div> : <div className={'score'}>{item.score_pacman}</div> }
                                </div>
                            </div>
                        </div>
                    ))}
                </Box>
            </Box>
        </div>
    )
}

export default Leaderboard;