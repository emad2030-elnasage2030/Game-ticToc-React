 import { useState } from 'react'
import Player from './Components/player.jsx'
import GameBoard from './Components/GameBoard.jsx'
import Log from './Components/Log.jsx';
import GameOver from './Components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './WINNING_COMBINATIONS.jsx';

const PLAYERS={
  x:'player 1',
  O:'player 2'
}
const Intial_Game_Board =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
  ];

function deriveActiveplayer(gameTurns){
  let currentplayer='x';
  
if(gameTurns.length>0 && gameTurns[0].Player === 'x'){
  currentplayer='0';
}
return currentplayer;

}
function deriveGameBoard(gameTurns){
 let gameBoard=[...Intial_Game_Board.map(Array=>[...Array])];

 for(const turn of gameTurns){
     const {square,Player}=turn;
     const {row,col}=square;
     gameBoard[row][col]= Player;
 }
 return gameBoard;
 }
 function derivewinner(gameBoard,player){
  let winner; 
  for(const combination of WINNING_COMBINATIONS ){
    const firstSquareSymbol =gameBoard[combination[0].row][combination[0].column];
    const SecondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol &&
      firstSquareSymbol===SecondSquareSymbol&&
     firstSquareSymbol===thirdSquareSymbol)
     {
      //come from usestate
       winner =player[firstSquareSymbol];
     
     }

    
  }
  return winner;

  }

function App() {
  const [players, setPlayers]=useState(PLAYERS)

//يتم التحكم في لعبتنا من خلال حالة اللعبة هذه.
//هذا هو مصدرنا الوحيد للحقيقة لهذه اللعبة بأكملها.
  const [gameTurns,setGameTurns]=useState([]);

  const activPlayer= deriveActiveplayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner= derivewinner(gameBoard,players);
//التعادل عدد المرات 9
const hasDraw = gameTurns.length===9&& !winner;

//هذه الوظيفة، بطبيعة الحال، سيتم تشغيلها كلما تم تحديد مربع 
function handleSelectSquare(rowIndex,colIndex){
 // setactivPlayer((currentActiveplayer)=>currentActiveplayer==='x'?'o':'x');
 setGameTurns((prevturns)=>{
     const currentplayer =deriveActiveplayer(prevturns);
  const updateTurns=[
  {square:{row: rowIndex, col:colIndex},Player:currentplayer},
    ...prevturns,
  ];
  return updateTurns;
  });
}

//restart app
function handleRestart(){
  setGameTurns([]);
}
function HandlePlayerNameChange(symbol, NewName){
  setPlayers(prevplayers=>{
    return{
      ...prevplayers,
      [symbol]:NewName
    }
  });
}
return (

  <main>
     
 <div id="game-container">
  <ol id="players" className='highlight-player'>
 <Player initialname={PLAYERS.x}
  symbol="x"
 isActive={activPlayer==='x'} 
 onchangeName={HandlePlayerNameChange}
 />
 <Player initialname={PLAYERS.O}
  symbol="O"
  isActive={activPlayer==='O'}
  onchangeName={HandlePlayerNameChange}
  />

 </ol>
{(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/> }

<GameBoard onSelectSquare={handleSelectSquare}  board={gameBoard} />
    </div>
   <Log turns={gameTurns}/>
  </main>
  
  );

}

export default App
