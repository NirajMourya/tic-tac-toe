import React from "react";
import Grid from "./Grid";

const checkThree = (a,b,c) => {
    if(!a || !b || !c)
       return false;
    return a===b && b===c
}

const flatten = array => array.reduce((acc,cur) => [...acc,...cur], [])
function checkForWin(flatGrid) 
{
   const [nw,n,ne,w,c,e,sw,s,se] = flatGrid
   return (
     checkThree(nw,n,ne) ||
     checkThree(w,c,e) ||
     checkThree(sw,n,se) ||
     checkThree(nw,w,sw) ||
     checkThree(n,c,s) ||
     checkThree(ne,e,se) ||
     checkThree(nw,c,se) ||
     checkThree(ne,c,sw) 
   )

}

function checkDraw(flatGrid)
{
    return ( !checkForWin(flatGrid) && flatGrid.filter(Boolean).length === flatGrid.length )
}
const newTicTacToeGrid = () => generateGrid(3,3,() => null)

function generateGrid(rows, columns, mapper)
{
    return Array(rows)
           .fill()
           .map(() =>
               Array(columns)
               .fill()
               .map(mapper)   
           )
}
const clone = x => JSON.parse(JSON.stringify(x))

const NEXT_TURN = {
    O:'X',
    X:'O'
}

const  getInitialState = () => ({
    grid: newTicTacToeGrid(),
    turn:'X',
    state:'inprogress'
})
const reducer = (state,action) => {
    if(state.status === "success" && action.type !== "RESET")
      return state
    switch(action.type){
        case 'RESET':
             return getInitialState()
        case 'CLICK': {
            const {x,y} = action.payload
            const nextState = clone(state)
            const {grid,turn} = nextState

            if(grid[y][x])
            {
                return state
            }

            nextState.grid[y][x] = turn
            
            const flatGrid = flatten(nextState.grid)
            if(checkForWin(flatGrid))
            {
                nextState.status = 'success'
                return nextState;
            }
            if(checkDraw(flatGrid))
            {
                return getInitialState()
            }
            nextState.turn = NEXT_TURN[turn]
            return nextState
        }

        default: return state
    }
}

function Game()
{
    const [state,dispatch] = React.useReducer(reducer,getInitialState())
    const {grid,turn,status} = state
    const handleClick = (x,y) => {
        dispatch({type:'CLICK',payload:{x,y} })
    }
    const reset = () => {
        dispatch({ type:'RESET'})
    }
    return (
    <div style={{display:'inline-block'}}>
    <div style={{display:'flex', justifyContent:'space-between'}}>
    <div>Next up: {turn}</div>
    <div>
        {
            status === 'success'
            ? `${turn} won!`
            : null
        }
    </div>
    <button onClick={reset} type="button">Reset</button>
    </div>
    <Grid grid={grid}  handleClick={handleClick}/>
    </div>
    );
}

export default Game;