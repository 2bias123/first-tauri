import React, { useState } from 'react';
import CircleComponent from '../CircleComponent/CircleComponent';
import LineComponent from '../LineComponent/LineComponent';
import { invoke } from '@tauri-apps/api/tauri';
import EdgeWeightDefinerComponent from '../EdgeWeightDefinerComponent/EdgeWeightDefinerComponent';


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
}

//Defines the conmponent. It uses the useState hook to keep track of the circles
const Canvas: React.FC = () => {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [, setLastClickedCircle] = useState<Circle[]>([]);   
    const [circlePairs, setCirclePairs] = useState<CirclePair[]>([]);
    const [alphabet, _] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const [index, setIndex] = useState<number>(0);

    const [savedEdgeWeight, setSavedEdgeWeight] = React.useState<number>();

    const [showEdgeWeightDefiner, setShowEdgeWeightDefiner] = React.useState<boolean>(false);


    //This is used to update the label of the circle
    const alphabetButtonClick = () => {
      const nextIndex = (index + 1) % alphabet.length;

      setIndex(nextIndex);
    }

  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
        setLastClickedCircle(prevCircle => {
          const newCircleArray = [...prevCircle, circle].slice(-2);
      
          if (newCircleArray.length === 2) {
            const frst = newCircleArray[0];
            const snd = newCircleArray[1];
            const pair: CirclePair = { start: frst, end: snd };
            setCirclePairs(prevPairs => [...prevPairs, pair]);
            invoke('add_bidirectional_edge', {node1_id: frst.id, node1_name: frst.label, node2_id: snd.id, node2_name: snd.label, edge_weight: 10})
            newCircleArray.length = 0; // Reset the array
            setShowEdgeWeightDefiner(true);
          }
      
          return newCircleArray;
        });
      };
       
      
    return (
      <div>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white'}} onClick={handleClick}>
        {circles.map((circle, index) => (
          <CircleComponent key={index} circle={circle} onClick={handleCircleClick}/>
        ))}     
        {circlePairs.map((pair, index) => (
            <LineComponent key={index} start={pair.start} end={pair.end} label = "hei" />
        ))}
      </div>
      {showEdgeWeightDefiner && (
        <EdgeWeightDefinerComponent
          setSavedEdgeWeight={setSavedEdgeWeight}
          setShowEdgeWeightDefiner={setShowEdgeWeightDefiner}
        />
      )}
      </div>
    );
  };
  
export default Canvas;
