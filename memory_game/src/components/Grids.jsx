import React, { useEffect, useState } from 'react'
import Grid from './Grid';
import './style.css';
export default function Grids() {
    // 6 * 6 = 36

    const [grids, setGrids] = useState([]);
    const [flipedArr, setFilpedArr] = useState([]);


    useEffect(()=>{
        // generate all grid  1-18
        const numbers = Array.from({length: 18}, (_, index)=>(index+1)); 
        // 36 
        const allGrids = [...numbers, ...numbers].sort(()=>Math.random() - 0.5);
         // 36 [1,2,]
        
        setGrids((prevGrids)=>{
          const newArr= allGrids.map((item, index)=> ({value:item , id: index, flip: false})); 
          // console.log(newArr)    
          return [ ...newArr];
        })
     
    },[])

     const onClicked = (id)=>{
          
        if(flipedArr.length > 2){
            setFilpedArr([]);
        }
         console.log(id)
        // finding the element 
        const elem = grids.find(item=> item.id === id);
        // 
        //console.log(elem)
        if(elem && !elem.flip){
            console.log('kdfjkl')
            const newFlipedArr = grids.map((item)=> (
                item.id === id ? { ...item, flip: true } : item
            ))
           console.log(newFlipedArr)
            setGrids(newFlipedArr); 
            setFilpedArr(prevState => [...prevState, elem]);
        }
       
     }

    useEffect(()=>{
      //  check two grids is match or not  // two case : 1: two grids == match what shoud i do ???
         //  two grids is not the value === what should i do ? 
         
        if(flipedArr.length == 2){  
          console.log('jdfkjkjkjj')
            const [first, second] = flipedArr;
            if(first.value == second.value){
               setFilpedArr([]);

            }else{
              console.log('not match')
                setTimeout(() => {
                    console.log('not match')
                    const updatedTiles = grids.map(tile =>{
                      //flipedArr.includes(tile) ? { ...tile, flip: false } : tile
                      if(first.id === tile.id) {
                          return {...tile, flip: false };
                      }
                      if(second.id === tile.id) {
                        return {...tile, flip: false };
                    }else
                    return tile;
                });
                    console.log(updatedTiles);
                   setGrids(updatedTiles);
                    setFilpedArr([]);
                    console.log('finish');
                  }, 1000);
            }
        }
     }, [flipedArr, grids])
    return (
      <>
         <h2 className='game-name'>Memory Game</h2>
      
        <div  className='game'>{
           grids.map((item)=>(
             <Grid key={item.id} value={item.value} flip={item.flip} onClicked={()=>onClicked(item.id)}></Grid>
          )) 
        }</div>
      </>
    )
}
