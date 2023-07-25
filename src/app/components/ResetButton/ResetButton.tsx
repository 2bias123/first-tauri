import React from 'react';
import './ResetButtonStyle.css'
import { invoke } from '@tauri-apps/api/tauri';

interface ResetButtonProps {
    emptyHooks: () => void;
    showEdgeWeightDefiner: boolean;
}


const ResetButton: React.FC<ResetButtonProps> = ({emptyHooks, showEdgeWeightDefiner}) => {
    const handleClick = () => {
        if (showEdgeWeightDefiner) return;
        invoke('reset_graph');
        emptyHooks();
    }

    return (
        <div className='resetButton'>
            <button onClick={handleClick}>Reset</button>
        </div>
    )
}

export default ResetButton;


