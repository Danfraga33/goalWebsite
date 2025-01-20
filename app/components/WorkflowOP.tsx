import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    data: {
      label: "Newsletters",
    },
    position: { x: -150, y: 25 },
  },
  {
    id: "2",
    data: {
      label: "Annual Reports",
    },
    position: { x: -50, y: -70 },
  },
  {
    id: "3",
    data: {
      label: "Blogs",
    },
    position: { x: 150, y: -50 },
  },
  {
    id: "4",
    data: {
      label: "Podcasts -- NotebookLM",
    },
    position: { x: 340, y: -70 },
  },
  {
    id: "5",
    data: {
      label: "Whiteboard Animation",
    },
    position: { x: 450, y: 25 },
  },
  {
    id: "6",
    data: {
      label: "Website",
    },
    position: { x: 150, y: 150 },
  },
  {
    id: "7",
    data: {
      label: "Twitter",
    },
    position: { x: -25, y: 225 },
  },
  {
    id: "8",
    data: {
      label: "Instagram",
      value: "a123",
    },
    position: { x: 150, y: 225 },
  },
  {
    id: "9",
    data: {
      label: "Youtube",
    },

    position: { x: 325, y: 225 },
  },
];
const initialEdges: Edge[] = [
  {
    id: "1-6",
    source: "1",
    target: "6",
    animated: true,
  },
  {
    id: "1-6",
    source: "5",
    target: "6",
    animated: true,
  },
  {
    id: "1-6",
    source: "4",
    target: "6",
    animated: true,
  },
  {
    id: "1-6",
    source: "3",
    target: "6",
    animated: true,
  },
  {
    id: "1-6",
    source: "2",
    target: "6",
    animated: true,
  },
  {
    id: "6-9",
    source: "6",
    target: "7",
    animated: true,
  },
  {
    id: "6-9",
    source: "6",
    target: "8",
    animated: true,
  },
  {
    id: "6-9",
    source: "6",
    target: "9",
    animated: true,
  },
];

const WorkflowOP = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1` };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  }, []);
  return (
    <div style={{ width: "800px", height: "800px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowOP;
