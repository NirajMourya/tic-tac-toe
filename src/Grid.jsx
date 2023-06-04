const cellStyle = {
    backgroundColor:'#fff',
    height: 100,
    width: 100
}

function Cell({value,onClick})
{
    console.log(onClick);
    
    return <div style={cellStyle}>
        <button type="button" onClick={onClick} style={{fontSize:'2.5 rem', width:'100%',height:'100%'}}>
        {value}
        </button>
        </div>
}

function Grid({grid,handleClick}){
    return (
        <div style={{ display: 'inline-block' }}>
            <div style={{
                    backgroundColor:'#444',
                    display:'grid',
                    gridTemplateRows:`repeat(${grid.length},1fr)`,
                    gridTemplateColumns:`repeat(${grid[0].length},1fr)`,
                    gridGap:2
                }}
            >
                {
                    grid.map((row,rowIdx) => 
                       row.map((value, colIdx) => (
                        <Cell key={`${colIdx}-${rowIdx}`} value={value} onClick={() => {handleClick(colIdx,rowIdx)}}/>
                       ))
                    )
                }
            </div>
        </div>
    )
}
 export default Grid;