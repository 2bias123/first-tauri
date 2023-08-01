import React from 'react';
import './ButtonComponentStyle.css'

interface ResetButtonProps {
    onClick: () => void;
    text: string;
}


const ButtonComponent: React.FC<ResetButtonProps> = ({onClick, text}) => {
    const handleClick = () => {
        onClick();
    }

    return (
        <div className='myButton'>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}

export default ButtonComponent;