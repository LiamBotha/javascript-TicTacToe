const Gameboard = (() => {
    const gameBoard = document.querySelector("#game-board");
    const cells = [...gameBoard.querySelectorAll(".cell")];

    let boardArray = [
        "","","",
        "","","",
        "","","",
    ];

    for(cellId in cells)
    {   
        cells[cellId].addEventListener("click", event => {
            updateCell(event.target.getAttribute("data-index"));
        });
    }

    const updateCell = (index) => {
        if(boardArray[index] == "" && App.getGameState() == false)
        {
            cells[index].textContent = App.getTurnSymbol();
            boardArray[index] = App.getTurnSymbol();
            let gameState = checkForWin();

            console.dir("gs: " + gameState);
            if(gameState !== false)
            {
                App.displayWinner();
            }

            App.changePlayerTurn();
        }
    };


    const checkForWin = () => {

        for(let i = 0; i < 9; i += 3)
        {   
            if(boardArray[i] != "" && boardArray[i] === boardArray[i + 1] && boardArray[i + 1] === boardArray[i + 2])
            {
                return boardArray[i];
            }
        }

        for(let i = 0; i < 3; i++)
        {   
            if(boardArray[i] != "" && boardArray[i] === boardArray[i + 3] && boardArray[i + 3] === boardArray[i + 6])
            {
                return boardArray[i];
            }
        }

        if(boardArray[0] != "" && boardArray[0] === boardArray[4] && boardArray[4] == boardArray[8])
        {
            return boardArray[0];
        }
        else if(boardArray[2] != "" && boardArray[2] === boardArray[4] && boardArray[4] == boardArray[6])
        {
            return boardArray[2];   
        }

        return false;
    };

    const drawGrid = () => {
        for(let i = 0; i < boardArray.length; i++)
        {   
            console.dir( boardArray[i] + ", i: " + i );
            cells[i].textContent = boardArray[i];
        }
    };

    const clearGrid = () => {
        boardArray = [
            "","","",
            "","","",
            "","","",
        ];

        drawGrid();
    };

    return { updateCell, drawGrid, clearGrid };
})();

const Player = (symbol, name) => {

    console.dir("Nmae: " + name);
    return { symbol, name };
};

const App = (() => {

    Gameboard.drawGrid();

    let headerText = document.querySelector("#header-text");
    let restartBtn = document.querySelector("#restart-btn");
    let p1Input = document.querySelector("#p1-name");
    let p2Input = document.querySelector("#p2-name");

    p1Input.addEventListener("change", (event) => {
         player1.name = event.target.value;
         if(bIsP1Turn) headerText.textContent = player1.name + "'s Turn";
    });
    p2Input.addEventListener("change", (event) => {
         player2.name = event.target.value
         if(!bIsP1Turn) headerText.textContent = player2.name + "'s Turn";
    });

    p1Input.value = "Player 1";
    p2Input.value = "Player 2";

    let bIsP1Turn = true;
    let bGameOver = false;
    let player1 = Player("X", p1Input.value);
    let player2 = Player("0", p2Input.value);

    restartBtn.addEventListener("click", () => {
        Gameboard.clearGrid();
        bGameOver = false;
        changePlayerTurn(true);
    });

    const displayWinner = () => {
        console.dir("Winner");
        headerText.textContent = bIsP1Turn ? player1.name + " Has Won!" : player2.name + " Has Won!";
        bGameOver = true;
    }

    const getTurnSymbol = () => {
        return bIsP1Turn ? player1.symbol : player2.symbol;
    }

    const getGameState = () => bGameOver;

    const changePlayerTurn = (bool) => {
        if(bGameOver)
            return;

        if(bool)
            bIsP1Turn = bool;
        else    
            bIsP1Turn = !bIsP1Turn;

        headerText.textContent = bIsP1Turn ? player1.name + "'s Turn" : player2.name + "'s Turn"; 
    }

    return { getGameState, getTurnSymbol, changePlayerTurn, displayWinner };
    
})();