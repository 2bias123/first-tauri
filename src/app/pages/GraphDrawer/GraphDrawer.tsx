import React, { useState } from 'react';
import Canvas from '../../components/CanvasComponent/CanvasComponent';
import EdgeWeightDefinerComponent from '../../components/EdgeWeightDefinerComponent/EdgeWeightDefinerComponent';
import './GraphDrawerStyle.css'
import { invoke } from '@tauri-apps/api/tauri';
import DjikstraInput from '@/app/components/DjikstraInput/DjikstraInput';


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
    const [showDjikstraInput, setShowDjikstraInput] = React.useState<boolean>(false);
    const [startDjikstra, setStartDjikstra] = React.useState<string>('');
    const [endDjikstra, setEndDjikstra] = React.useState<string>('');
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
                node1_name: pair.start.label,
                node2_name: pair.end.label,
                edge_weight: pair.edgeWeight
                })
            newCircleArray.length = 0; // Reset the array
            setShowEdgeWeightDefiner(false);
            setEdgeWeight('');
        }
      };
    

      const validateDijkstraInput = async (nodeValue: string) => {
        // Remove whitespace from input
        const testValue = nodeValue.replace(/\s/g, '');
      
        // Regular expression to match uppercase letters only
        const re = /^[A-Z]+$/;
      
        if (testValue === '') {
          alert('Please enter a node.');
          return false;
        }
      
        if (!re.test(testValue)) {
          alert('The node name must consist of uppercase letters only.');
          return false;
        }
      
        try {
          // Assuming 'invoke' returns a Promise, handle errors appropriately
          const result = await invoke('is_node_in_graph', { node_name: testValue });
      
          if (!result) {
            alert('The node you entered is not in the graph.');
            return false;
          }
      
          return true;
        } catch (error) {
          console.error('Error occurred:', error);
          alert('An error occurred while validating the node.');
          return false;
        }
      };
              
    const handleDjikstra = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const validationStart = await validateDijkstraInput(startDjikstra);
      const validationEnd = await validateDijkstraInput(endDjikstra);

      if (!((validationStart) && (validationEnd))) {
          return;
      } if (startDjikstra === endDjikstra) {
          alert('Start and end nodes cannot be the same');
      } else {
          invoke('get_shortest_path', {
            start_node_name: startDjikstra.trim(),
            end_node_name: endDjikstra.trim()
              }).then((res) => {
                  console.log(res);
              })
      setShowDjikstraInput(false);
      }
    }

    return (
        <div>
            <Canvas 
            circlePairs={circlePairs}
            setCirclePairs={setCirclePairs}
            setLastClickedCircle={setLastClickedCircle}
            handleCircleClick={handleCircleClick}
            showEdgeWeightDefiner={showEdgeWeightDefiner}
            setShowDjikstraInput={setShowDjikstraInput}
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
      {showDjikstraInput && (
        <div className="djikstra-input-container">
          <DjikstraInput
            setShowDjikstraInput={setShowDjikstraInput}
            setStartNode={setStartDjikstra}
            setEndNode={setEndDjikstra}
            handleSubmit={handleDjikstra}
          />
        </div>
      )
        }
        </div>
    )};

export default GraphDrawer;