import React, { useState } from 'react';
import CircleComponent from '../CircleComponent/CircleComponent';
import LineComponent from '../LineComponent/LineComponent';
import { invoke } from '@tauri-apps/api/tauri';
import ResetButton from '../ResetButton/ResetButton';

interface CanvasProps {
  showEdgeWeightDefiner: boolean;
  circlePairs: CirclePair[];
  setLastClickedCircle: React.Dispatch<React.SetStateAction<Circle[]>>;
  setCirclePairs: React.Dispatch<React.SetStateAction<CirclePair[]>>;
  handleCircleClick: (circle: Circle) => void;
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
const Canvas: React.FC<CanvasProps>= ({
  showEdgeWeightDefiner,
  circlePairs,
  setCirclePairs,
  setLastClickedCircle,
  handleCircleClick
}) => {
    const [circles, setCircles] = useState<Circle[]>([]);
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

    return (
      <div>
        <ResetButton emptyHooks={emptyHooks} showEdgeWeightDefiner = {showEdgeWeightDefiner}/>
        {/* <button onClick={invoke()}>Run djikstra</button> */}
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
