import React from 'react';
import './DjikstraInputStyle.css';

interface DjikstraInputProps {
    setShowDjikstraInput: React.Dispatch<React.SetStateAction<boolean>>;
    setStartNode: React.Dispatch<React.SetStateAction<string>>;
    setEndNode: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}



const DjikstraInput:React.FC<DjikstraInputProps> = ({setShowDjikstraInput,setStartNode,setEndNode,handleSubmit}) => {

    const handleInputChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartNode(event.target.value);
    };

    const handleInputChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndNode(event.target.value);
    };

    return(
        <form className='container' onSubmit={handleSubmit}>
            <div className='instructionsContainer'>
                <h3>Find the shortest path from</h3>
                <input className='nodeinput' type='text' placeholder='Start' onChange={handleInputChangeStart}></input>
                <h3>to</h3>
                <input className ='nodeinput' type='text' placeholder='End' onChange={handleInputChangeEnd}></input>
            </div>
            <div className='buttonContainer'>
                <button type='submit' className='button'>Find</button>
                <button className='button' onClick={()=>setShowDjikstraInput(false)}>Cancel</button>
            </div>
        </form>
    );
}

export default DjikstraInput;