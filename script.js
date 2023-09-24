import { Game } from "./src/game.js";
import { GameBoard } from './src/GameBoard.js';
import { Input } from "./src/Input.js";
import { TetrisPieceFactory } from "./src/TetrisPieceFactory.js";

const canvas = document.querySelector('#canvas');

const game = new Game(canvas, 200, 400);
// Note that only one instance of Input should ever be created, 
// because it adds eventListeners to the document.
// TODO: Don't be lazy and turn this into a Singleton!
const input = new Input();
const factory = new TetrisPieceFactory(input);
const gameBoard = new GameBoard(canvas, factory);

game.updateables.push(gameBoard);
game.renderables.push(gameBoard);
game.updateables.push(input);

game.start(1);
