import React from 'react';
import './DjikstraResultStyle.css';

interface DjikstraResultProps {
  shortestPath: { name: string }[]; // Adjust the data structure if needed
}

const DjikstraResult: React.FC<DjikstraResultProps> = ({ shortestPath }) => {
  return (
    <div className="djikstra-result-container">
      <h2>Shortest Path</h2>
      <ul>
        {shortestPath.map((node, index) => (
          <li key={index}>{node.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DjikstraResult;
