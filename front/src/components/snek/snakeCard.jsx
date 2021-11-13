import Snake from "./snake";
import Food from "./food";
import React, {Component} from "react";
import {userAPI} from "../../apis/userAPI";
import {Button} from "@material-ui/core";
import './snake.css';

const widthBox = 100


const getRandomCoordinates = () => {
    let min = 1
    let max = widthBox - 2;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y]
}



const initialState = {
    food: getRandomCoordinates(),
    speed: 125, //180
    direction: 'RIGHT',
    score: 0,
    snakeDots: [
        [0, 0],
        [2, 0]
    ]
}

class SnakeCard extends Component {
    state = initialState;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat();
    }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
        }
    }

    moveSnake = () => {
        if(!this.props.gameOver){
            let dots = [...this.state.snakeDots];
            let head = dots[dots.length - 1];

            switch (this.state.direction) {
                case 'RIGHT':
                    head = [head[0] + 2, head[1]];
                    break;
                case 'LEFT':
                    head = [head[0] - 2, head[1]];
                    break;
                case 'DOWN':
                    head = [head[0], head[1] + 2];
                    break;
                case 'UP':
                    head = [head[0], head[1] - 2];
                    break;
            }
            dots.push(head);
            dots.shift();
            this.setState({
                snakeDots: dots
            })
        }

    }

    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= widthBox || head[1] >= widthBox || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }

    checkIfCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.onGameOver();
            }
        })
    }

    checkIfEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] === food[0] && head[1] === food[1]) {
            this.setState({
                food: getRandomCoordinates(),
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake,
            score: this.state.score + 1
        })
        this.props.setScore(this.state.score + 1)
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
    }

    onGameOver() {
        this.props.setGameOver(true)
        const formData = new FormData();
        formData.append("username", sessionStorage.getItem('user'))
        formData.append("score_snake", this.state.snakeDots.length - 2)
        userAPI.putData(formData).then(r => r)
    }

    render() {
        return (
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                {this.props.gameOver && <div className={'game-over-snake'}>
                    <Button variant={'outlined'} id={'refresh-button'} onClick={() => {
                        this.setState(initialState)
                        this.props.setGameOver(false)
                        this.props.setScore(0)
                    }}>Play Again!</Button>
                </div>
                }
                <Food dot={this.state.food}/>
            </div>
        );
    }
}

export default SnakeCard;