import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {userAPI} from "../../../apis/userAPI";

export default function Scores({ score, lost }) {
    let gameOver = null;

    if (lost) {
        gameOver = (
            <span className="game-over">{'Game over!'}</span>
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

