import { Game } from "./src/game.js";
import { GameBoard } from './src/GameBoard.js';
import { TetrisPiece } from "./src/TetrisPiece.js";
import { Input } from "./src/Input.js";

const canvas = document.querySelector('#canvas');

const game = new Game(canvas, 200, 400);
const gameBoard = new GameBoard(canvas);
const input = new Input();
const demoPiece = new TetrisPiece([
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
], input);
gameBoard.placeTetrisPieceInitial(demoPiece, 1);

game.updateables.push(gameBoard);
game.renderables.push(gameBoard);
game.updateables.push(input);

game.start(1);
