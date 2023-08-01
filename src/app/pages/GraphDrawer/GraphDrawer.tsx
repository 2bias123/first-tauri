import React, { useState } from 'react';
import Canvas from '../../components/CanvasComponent/CanvasComponent';
import EdgeWeightDefinerComponent from '../../components/EdgeWeightDefinerComponent/EdgeWeightDefinerComponent';
import './GraphDrawerStyle.css'
import { invoke } from '@tauri-apps/api/tauri';


//Defines the structure of the circle object
interface Circle {
    x: number;
    y: number;
    label: string;
    id: number;
  }
  
  interface CirclePair {
      start: Circle;
      end: Circle;
      edgeWeight: number;
  }

const GraphDrawer: React.FC = () => {

    const [showEdgeWeightDefiner, setShowEdgeWeightDefiner] = React.useState<boolean>(false);
    const [, setLastClickedCircle] = useState<Circle[]>([]);   
    const [circlePairs, setCirclePairs] = useState<CirclePair[]>([]);
    const [edgeWeight, setEdgeWeight] = React.useState<number | ''>('');
    const [newCircleArray, setNewCircleArray] = useState<Circle[]>([]);
    
    const handleCircleClick = (circle: Circle) => {
        if (showEdgeWeightDefiner) return;
    
        setLastClickedCircle((prevCircle) => {
          const updatedArray = [...prevCircle, circle].slice(-2);
    
          if (updatedArray.length === 2) {
            setShowEdgeWeightDefiner(true);
            setNewCircleArray(updatedArray);
          }
    
          return updatedArray;
        });
      };

        const handleSubmit = (e: { preventDefault: () => void }) => {
            e.preventDefault();
            if (edgeWeight === '') {
              alert('Please enter a number');
            } else {
                const frst = newCircleArray[0];
                const snd = newCircleArray[1];
      
                const pair: CirclePair = { start: frst, end: snd, edgeWeight: edgeWeight || 0};
                setCirclePairs(prevPairs => [...prevPairs, pair]);
                invoke('add_bidirectional_edge', {
                    node1_id: pair.start.id,
                    node1_name: pair.start.label,
                    node2_id: pair.end.id,
                    node2_name: pair.end.label,
                    edge_weight: pair.edgeWeight
                    })
                newCircleArray.length = 0; // Reset the array
                setShowEdgeWeightDefiner(false);
                setEdgeWeight('');
            }
          };

    return (
        <div>
            <Canvas 
            circlePairs={circlePairs}
            setCirclePairs={setCirclePairs}
            setLastClickedCircle={setLastClickedCircle}
            handleCircleClick={handleCircleClick}
            showEdgeWeightDefiner={showEdgeWeightDefiner}
            />
            {showEdgeWeightDefiner && (
            <div className="edge-weight-definer-container">
            <EdgeWeightDefinerComponent
                setShowEdgeWeightDefiner={setShowEdgeWeightDefiner}
                handleSubmit={handleSubmit}
                edgeWeight={edgeWeight}
                setEdgeWeight={setEdgeWeight}
                />
            </div>
           
      )}
        </div>
    )   
};

export default GraphDrawer;