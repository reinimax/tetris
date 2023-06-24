import { Game } from "./src/game.js";
import { GameBoard } from './src/GameBoard.js';
import { TetrisPiece } from "./src/TetrisPiece.js";

const canvas = document.querySelector('#canvas');

const game = new Game(canvas, 200, 400);
const gameBoard = new GameBoard(canvas);
const demoPiece = new TetrisPiece([
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]);
gameBoard.placeTetrisPiece(demoPiece, 1);

game.updateables.push(gameBoard);
game.renderables.push(gameBoard);

game.start(5);
