import React, { useState } from "react";
import {Link} from 'react-router-dom';
import ClearButton from "./ClearButton";
import NumberButton from "./NumberButton";
import Equation from "./Equation";
import Score from "./Score";
import Timer from "./Timer";
import './Game.css';
import { randInt } from '../helpers/helpers';
import Keyboard from './Keyboard';

function Game({ operation, maxNumber }) {
    let randNums = getRandNumbers(operation, 0, maxNumber);
    const [operands, setOperands] = useState(randNums);
    const question = operands.num1 + ' ' + operation + ' ' + operands.num2;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const numberButtons = numbers.map((number) =>
        <NumberButton value={number} key={number}
            handleClick={appendToAnswer} />
    );
    const [answered, setAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const gameLength = 60;
    const [timeLeft, setTimeLeft] = useState(gameLength);

    function getRandNumbers(operator, low, high) {
        let num1 = randInt(low, high);
        let num2 = randInt(low, high);
        const numHigh = Math.max(num1, num2);
        const numLow = Math.min(num1, num2);

        if (operator === '-') {
            num1 = numHigh;
            num2 = numLow;
        }

        if (operator === '/') {
            if (num2 === 0) { //no division by zero
                num2 = randInt(1, high);
            }
            num1 = (num1 * num2); //product
        }
        return { num1, num2 };
    }

    function appendToAnswer(num) {
        setUserAnswer(String(Number(userAnswer + num)));
    }

    function checkAnswer(userAnswer) {
        if (isNaN(userAnswer)) return false; // user has not answered

        let correctAnswer;
        switch (operation) {
            case '+':
                correctAnswer = operands.num1 + operands.num2;
                break;
            case '-':
                correctAnswer = operands.num1 - operands.num2;
                break;
            case 'x':
                correctAnswer = operands.num1 * operands.num2;
                break;
            default: // division
                correctAnswer = operands.num1 / operands.num2;
        }
        return (parseInt(userAnswer) === correctAnswer);
    }

    const equationClass = answered
        ? 'row my-2 text-primary fade'
        : 'row my-2 text-secondary';
        

    if (!answered && checkAnswer(userAnswer)) {
        setAnswered(true);
        setScore(score + 1);
        setTimeout(newQuestion, 300);
    }

    function newQuestion() {
        setUserAnswer('');
        setAnswered(false);
        randNums = getRandNumbers(operation, 0, maxNumber);
        setOperands(randNums);
    }

    function restart() {
        setTimeLeft(gameLength);
        setScore(0);
        newQuestion();
    }

    if (timeLeft === 0) {
        return (
            <div className="text-center" id="game-container">
                <h2>Time's up!</h2>
                <strong style={{fontSize: "1.5em"}}>You Answered</strong>
                <div style={{fontSize: "5em"}}>{score}</div>
                <strong style={{fontSize: "1.5em"}}>Questions Correctly</strong>
                <button className="btn btn-primary form-control m-1"
                onClick={restart}>Play Again with Same Settings!</button>
                <Link className="btn btn-secondary form-conrol m-1" to="/">Change Settings</Link>
            </div>
        )
    }

    return (
        <main className="text-center" id="game-container">
            <div className="row border-bottom" style={{ fontSize: "1.5em" }}>
                <div className="col px-3 text-left">
                    <Score score={score} />
                </div>
                <div className="col px-3 text-right">
                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
                </div>
            </div>
            <div className={equationClass} id="equation">
                <Equation question={question} answer={userAnswer} />
            </div>
            <div className="row" id="buttons">
                <div className="col">
                    {numberButtons}
                    <ClearButton handleClick={setUserAnswer} />
                </div>
            </div>
            <Keyboard setUserAnswer={setUserAnswer} />
        </main>
    )
}

export default Game;