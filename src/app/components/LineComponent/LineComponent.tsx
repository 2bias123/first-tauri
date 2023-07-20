import React from 'react';

interface Circle {
  x: number;
  y: number;
}

interface LineProps {
  start: Circle;
  end: Circle;
  label: string;
}

const LineComponent: React.FC<LineProps> = ({ start, end, label }) => {
  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    top: start.y + 25, // Adjust to the center of the circle
    left: start.x + 25, // Adjust to the center of the circle
    width: Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2),
    height: 2,
    backgroundColor: 'black',
    transformOrigin: 'left center',
    transform: `rotate(${Math.atan2(end.y - start.y, end.x - start.x)}rad)`,
  };
   
  // Calculate the position for the text
  const textX = (start.x + end.x) / 2;
  const textY = (start.y + end.y) / 2;
  const textOffsetX = 12; // Adjust this value to horizontally position the text
  const textOffsetY = -6; // Adjust this value to vertically position the text
  const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: textY + textOffsetY,
    left: textX + textOffsetX,
    fontSize: '12px',
    color: 'black',
    zIndex: 2, // Higher zIndex than the line
  };

  return (
  <>
    <div style={lineStyle} />
    <div style={textStyle}>{label}</div>
  </>
  );
};

export default LineComponent;
