import { createContext,useState } from "react"


export const ScoreContext = createContext(null)

export function ScoreProvider({children}){
    
    const [score,setScore] =useState(0)
    const updateScore = (newScore)=>{
        setScore(newScore)
    }
    return (
        <ScoreContext.Provider value={{score,updateScore}}>
            {children}
        </ScoreContext.Provider>
    )
}