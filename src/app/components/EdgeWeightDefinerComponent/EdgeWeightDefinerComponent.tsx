import React from 'react';
import './EdgeWeightDefinerComponentStyle.css';

interface EdgeWeightDefinerProps {
  setShowEdgeWeightDefiner: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  edgeWeight: number | '';
  setEdgeWeight: React.Dispatch<React.SetStateAction<number | ''>>;
}

const EdgeWeightDefinerComponent: React.FC<EdgeWeightDefinerProps> = ({
  setShowEdgeWeightDefiner,
  handleSubmit,
  edgeWeight,
  setEdgeWeight,
}) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeWeight(Number(event.target.value));
  };


  return (
    <div className='container'>
      <h3>What do you want the weight from ... to ... to be?</h3>
      <form className='input_container' onSubmit={handleSubmit}>
        <input
          type="number"
          name="edge-weight"
          value={edgeWeight}
          placeholder="edge-weight"
          onChange={handleInputChange}
        />
        <button type='submit'>Submit</button>
        <button onClick={() => setShowEdgeWeightDefiner(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EdgeWeightDefinerComponent;
