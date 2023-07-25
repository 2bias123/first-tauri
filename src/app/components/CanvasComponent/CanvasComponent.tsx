import React, { useState } from 'react';
import CircleComponent from '../CircleComponent/CircleComponent';
import LineComponent from '../LineComponent/LineComponent';
import { invoke } from '@tauri-apps/api/tauri';
import ResetButton from '../ResetButton/ResetButton';

interface CanvasProps {
  savedEdgeWeight: number | undefined;
  setShowEdgeWeightDefiner: React.Dispatch<React.SetStateAction<boolean>>;
  showEdgeWeightDefiner: boolean;
}
  

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

//Defines the conmponent. It uses the useState hook to keep track of the circles
const Canvas: React.FC<CanvasProps>= ({savedEdgeWeight,setShowEdgeWeightDefiner,showEdgeWeightDefiner}) => {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [, setLastClickedCircle] = useState<Circle[]>([]);   
    const [circlePairs, setCirclePairs] = useState<CirclePair[]>([]);
    const [alphabet, _] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const [index, setIndex] = useState<number>(0);

    const emptyHooks = () => {
      setCircles([]);
      setLastClickedCircle([]);
      setCirclePairs([]);
      setIndex(0);
    }

    //This is used to update the label of the circle
    const alphabetButtonClick = () => {
      const nextIndex = (index + 1) % alphabet.length;
      setIndex(nextIndex);
    }

  
    const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (showEdgeWeightDefiner) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - 25;
      const y = event.clientY - rect.top - 25;
      const clickedCircle: Circle = { x, y, label: alphabet[index], id: index};
  
      const isOverlapping = circles.some((circle) => {
        const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
        const minDistance = 50;
        return distance < minDistance;
      });
  
      if (!isOverlapping) {
        setCircles((prevCircles) => [...prevCircles, clickedCircle]);
        alphabetButtonClick();
        invoke('add_node', {node_id: index, node_name: alphabet[index]})
      } 
    };

    const handleCircleClick = (circle: Circle) => {
      if (showEdgeWeightDefiner) return;

      setLastClickedCircle(prevCircle => {
        const newCircleArray = [...prevCircle, circle].slice(-2);
      
        if (newCircleArray.length === 2) {
          const frst = newCircleArray[0];
          const snd = newCircleArray[1];
          const pair: CirclePair = { start: frst, end: snd, edgeWeight: savedEdgeWeight || 0 };
          setCirclePairs(prevPairs => [...prevPairs, pair]);
          setShowEdgeWeightDefiner(true);
          invoke('add_bidirectional_edge', {node1_id: pair.start.id, node1_name: pair.start.label, node2_id: pair.end.id, node2_name: pair.end.label, edge_weight: pair.edgeWeight})
          newCircleArray.length = 0; // Reset the array
        }
        invoke('print_graph')
        return newCircleArray;
        });
      };
       

    return (
      <div>
        <ResetButton emptyHooks={emptyHooks} showEdgeWeightDefiner = {showEdgeWeightDefiner}/>
        <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white'}} onClick={handleCanvasClick}>
        {circles.map((circle, index) => (
          <CircleComponent key={index} circle={circle} onClick={handleCircleClick}/>
        ))}     
        {circlePairs.map((pair, index) => (
            <LineComponent key={index} start={pair.start} end={pair.end} label = {pair.edgeWeight} />
        ))}
        </div>
      </div>
    );
  };
  
export default Canvas;
