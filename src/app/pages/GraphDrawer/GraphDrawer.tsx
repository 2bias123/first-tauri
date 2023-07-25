import React from 'react';
import Canvas from '../../components/CanvasComponent/CanvasComponent';
import EdgeWeightDefinerComponent from '../../components/EdgeWeightDefinerComponent/EdgeWeightDefinerComponent';
import './GraphDrawerStyle.css'

const GraphDrawer: React.FC = () => {

    const [showEdgeWeightDefiner, setShowEdgeWeightDefiner] = React.useState<boolean>(false);
    const [SavedEdgeWeight, setSavedEdgeWeight] = React.useState<number>();


    return (
        <div className="graph-drawer-container">
            <Canvas 
            savedEdgeWeight={SavedEdgeWeight}
            setShowEdgeWeightDefiner={setShowEdgeWeightDefiner}
            showEdgeWeightDefiner={showEdgeWeightDefiner}
            />
            {showEdgeWeightDefiner && (
            <div className="edge-weight-definer-container">
            <EdgeWeightDefinerComponent
                setSavedEdgeWeight={setSavedEdgeWeight}
                setShowEdgeWeightDefiner={setShowEdgeWeightDefiner}
                />
            </div>
           
      )}
        </div>
    )   
};

export default GraphDrawer;