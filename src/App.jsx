import { useState } from 'react'


// eslint-disable-next-line react/prop-types
function Square({statusValue, eventClick}) {


    return <button onClick={eventClick} className="squareclass">{statusValue}</button>;
}

// eslint-disable-next-line react/prop-types
function HistoryComponent( {setSquares, history, setHistory, winStatus, setStatus, setxIsNext} ) {

    function handleclicker(index) {

        const anotherhistory = [...history]
        winStatus(false);
        setHistory(anotherhistory.slice(0, index + 1))
        setSquares(anotherhistory[index])
        setStatus(index % 2 === 0 ? "O" : "X")
        setxIsNext(index % 2 === 0 ? false : true)
    }
    function handleclicker1(index) {
        setHistory([])
        setSquares(Array(9).fill(null))
        winStatus(false)
        setStatus("First Player : X")
        setxIsNext(true)
    }

    return (



        <ol>
            
            
            {// eslint-disable-next-line react/prop-types
            history.map((move, index) => (
                <>
                {index < 1 ? <><button onClick={(() => handleclicker1(index))}>Reset</button><br /></> : <></>}
                <li key={index}>
                    
                    
                    <button onClick={() => handleclicker(index)}>Go To Move {index + 2}</button>
                </li>
                </>
            ))}
        </ol>
    )
}

function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setxIsNext] = useState(true);
    const [status, setStatus] = useState("First Player : X");
    const [winStatus, setWinStatus] = useState(false);
    const [history, setHistory] = useState([]);
    

    function myOnClick(i) {
        
        if (squares[i]) return;
        if (winStatus) return;

        const mysquare = [...squares];

        mysquare[i] = xIsNext ? "X" : "O";
        
        setSquares(mysquare);
        setHistory([...history, mysquare]);

        

        const winner = CalculateTheWinner(mysquare);
        if (winner) {
            setStatus("Player Win : " + winner);
            console.log("win");
            setWinStatus(true);
        }
        else if (mysquare.every(square => square !== null)) {
            setStatus("Draw!");
            console.log("draw");    
        }
        else {
            setStatus("Player's turn : " + (xIsNext ? "O" : "X"));
            console.log("lose");
        }

        
        setxIsNext(!xIsNext);
        
        
    }


return (
 <>

<div>{status}</div>
<div className='board'>


    <Square statusValue={squares[0]} eventClick={() => myOnClick(0)} />
    <Square statusValue={squares[1]} eventClick={() => myOnClick(1)} />
    <Square statusValue={squares[2]} eventClick={() => myOnClick(2)} />
    <Square statusValue={squares[3]} eventClick={() => myOnClick(3)} />
    <Square statusValue={squares[4]} eventClick={() => myOnClick(4)} />
    <Square statusValue={squares[5]} eventClick={() => myOnClick(5)} />
    <Square statusValue={squares[6]} eventClick={() => myOnClick(6)} />
    <Square statusValue={squares[7]} eventClick={() => myOnClick(7)} />
    <Square statusValue={squares[8]} eventClick={() => myOnClick(8)} />
</div>
<HistoryComponent setxIsNext={setxIsNext} history={history} setSquares={setSquares} setHistory={setHistory} winStatus={setWinStatus} setStatus={setStatus} />

</>
 )
}


function CalculateTheWinner(dataStatus) {
    let winPatterns = [];


    //for horizontal pattern
    for (let row = 0; row < 3; row++) {
        const a = row * 3;
        winPatterns.push([a, a + 1, a + 2]);
        }

    //for vertical pattern
    for (let col = 0; col < 3; col++) {
        const a = col;
        winPatterns.push([a, a + 3, a + 6]);
    }

    winPatterns.push([0, 4, 8]);
    winPatterns.push([2, 4, 6]);

    for (let item of winPatterns) {

        const [a, b, c] = item;
        
        if (dataStatus[a] !== null && dataStatus[a] === dataStatus[b] && dataStatus[a] === dataStatus[c]) {
            return dataStatus[a];
        }
            
    }
    return false;
}


export default function Game() {

    
    return (
        <>
        <Board />
        
        </>
    )
}
