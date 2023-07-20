import React from 'react';

//Dfines the structure of the circle object
interface Circle {
  x: number;
  y: number;
  label: string;
  id: number;
}

//Defines the type of props the components accepts
interface CircleProps {
  circle: Circle;
  onClick: (circle: Circle) => void;
}

const CircleComponent: React.FC<CircleProps> = ({ circle, onClick}) => {
  const handleClick = () => {
    onClick(circle);
  };

  return (
    <button
      style={{
        position: 'absolute',
        top: circle.y,
        left: circle.x,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'red',
      }}
      onClick={handleClick}
    >{circle.label}</button>
  );
};

export default CircleComponent;
