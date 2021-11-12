import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {userAPI} from "../../../apis/userAPI";
import {Button} from "@material-ui/core";
import getInitialState from "../state";
import Pacman from "../index";

export default function Scores({ score, lost, resetState }) {
    let gameOver = null;

    if (lost) {
        gameOver = (
            <>
                <div className="game-over">{'Game over!'}</div>
                <div style={{marginTop: 15}}>
                    <Button variant={'outlined'} id={'refresh-button'} onClick={() => window.location.reload()}>Play Again!</Button>
                </div>
            </>
        );
        const formData = new FormData();
        formData.append("username", sessionStorage.getItem('user'))
        formData.append("score_pacman", score)
        userAPI.putData(formData).then(r => r)
    }

    return (
        <div className="pacman-scores">
            <span className="running-score">
                {'Score: '}{score}
            </span>
            {gameOver}
        </div>
    );
}

Scores.propTypes = {
    lost: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired
};

