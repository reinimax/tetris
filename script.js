import { Game } from "./src/game.js";
import { GameBoard } from './src/GameBoard.js';
import { Input } from "./src/Input.js";
import { TetrisPieceFactory } from "./src/TetrisPieceFactory.js";
import { RunningState } from "./src/RunningState.js";
import { PausedState } from "./src/PausedState.js";
import { PauseOverlay } from "./src/PauseOverlay.js";
import { InGameUI } from "./src/InGameUi.js";

const canvas = document.querySelector('#canvas');

// Note that only one instance of Input should ever be created, 
// because it adds eventListeners to the document.
// TODO: Don't be lazy and turn this into a Singleton!
const input = new Input();
const game = new Game(canvas, 200, 400, input);
const factory = new TetrisPieceFactory(input);
const gameBoard = new GameBoard(canvas, factory);
const inGameUi = new InGameUI(gameBoard);

const runningState = new RunningState();
runningState.updateables.push(gameBoard);
runningState.renderables.push(gameBoard);
runningState.renderables.push(inGameUi);

const pausedState = new PausedState();
pausedState.renderables.push(gameBoard);
pausedState.renderables.push(inGameUi);
pausedState.renderables.push(new PauseOverlay());

game.addState('running', runningState);
game.addState('paused', pausedState);
game.transitionStateTo('running');

game.start(60);
