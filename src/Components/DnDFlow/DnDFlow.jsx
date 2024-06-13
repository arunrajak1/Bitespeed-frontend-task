import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import CustomNode from "../Nodes/CustomNode";
// import initialNodes from './initialNodesData';

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  custom: CustomNode,
};
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Send Message', message: 'text message', image: '/assets/messenger.png',image2:'/assets/whatsapp.png',
      onClick: () => {}
    },
    
    position: { x: 500, y: 200 },
  },
];
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onNodeClick = (event, node) => {
    event.stopPropagation(); 
    setEditValue(node.data.message);
    setSelectedNodeId(node.id);
  };

  //edit text
  const handleEdit = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              message: editValue,
            },
          };
        }
        return node;
      })
    );
    setEditValue("");
    setSelectedNodeId(null); 
  };
  const onConnect = useCallback(
    (params) => {
      // Check if there's already an edge from the source handle
      const sourceEdges = edges.filter(edge => edge.source === params.source && edge.sourceHandle === params.sourceHandle);
      if (sourceEdges.length > 0) {
        // If there's already an edge, don't add a new one
        setErrorMessage('Only one connection allowed from a source handle');
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          name: 'New Node', 
          message: 'New message', 
          image: '/assets/messenger.png', 
          image2: '/assets/whatsapp.png', 
          onClick: onNodeClick,

        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const updatedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onClick: onNodeClick,
    },
  }));

  const handleSave = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    if (nodesWithEmptyTargets.length > 1) {
      setErrorMessage("Connot save Flow");
    } else {
      setErrorMessage("Flow saved successfully!");
      localStorage.setItem('flowData', JSON.stringify({ nodes, edges }));

    }
  };

  const handleLoad = () => {
    const flowData = JSON.parse(localStorage.getItem('flowData'));
    if (flowData) {
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
      setErrorMessage('Flow loaded successfully!');
    } else {
      setErrorMessage('No saved flow found.');
    }
  };

  return (
   <>
   <Header  handleSave={handleSave} handleLoad={handleLoad}  errorMessage={errorMessage}/>
    <div className="flex h-full"> 
     <ReactFlowProvider>
       <div className="flex-grow h-full sm:w-1/2 bg-green-300" ref={reactFlowWrapper}>
         <ReactFlow
         nodes={updatedNodes}
           edges={edges}
           onNodeClick={onNodeClick}
           onNodesChange={onNodesChange}
           onEdgesChange={onEdgesChange}
           onConnect={onConnect}
           onInit={setReactFlowInstance}
           onDrop={onDrop}
           onDragOver={onDragOver}
           nodeTypes={nodeTypes}

          //  fitView
         >
           <Controls />
         </ReactFlow>
       </div>
       <Sidebar
         editValue={editValue}
         setEditValue={setEditValue}
         handleEdit={handleEdit}
         selectedNode={selectedNodeId !== null}

       />
     </ReactFlowProvider>
   </div>
   </>
  );
};

export default DnDFlow;
