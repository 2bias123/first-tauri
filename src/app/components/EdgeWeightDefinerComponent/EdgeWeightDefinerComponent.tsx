import React from 'react';
import './EdgeWeightDefinerComponentStyle.css';

interface EdgeWeightDefinerProps {
  setSavedEdgeWeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowEdgeWeightDefiner: React.Dispatch<React.SetStateAction<boolean>>;
}

const EdgeWeightDefinerComponent: React.FC<EdgeWeightDefinerProps> = ({ setSavedEdgeWeight, setShowEdgeWeightDefiner }) => {
  const [edgeWeight, setEdgeWeight] = React.useState<number | ''>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeWeight(Number(event.target.value));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSavedEdgeWeight(Number(edgeWeight));
    setShowEdgeWeightDefiner(false);
    setEdgeWeight('');
  };

  return (
    <div className='container'>
      <h3>What do you want the weight of the edge to be?</h3>
      <form className='input_container' onSubmit={handleSubmit}>
        <input
          type="number"
          name="edge-weight"
          value={edgeWeight}
          placeholder="edge-weight"
          onChange={handleInputChange}
        />
        <button type='submit'>Submit</button>
        <button onClick={()=>setShowEdgeWeightDefiner(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EdgeWeightDefinerComponent;
