import { useState, useCallback, useMemo, ChangeEvent, FC } from "react";
import ReactFlow, {
  Position,
  MarkerType,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeProps,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";
import { Input } from "./ui/input";

const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className="rounded-md border-2 border-gray-200 bg-white px-4 py-2 shadow-md">
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-gray-500">{data.value}</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const WorkflowChart: React.FC = () => {
  const [income, setIncome] = useState(1000);
  const [expenses, setExpenses] = useState(600);

  const initialNodes = useMemo(
    () => [
      {
        id: "1",
        type: "custom",
        data: { label: "Income", value: `$${income}` },
        position: { x: 150, y: 0 },
      },
      {
        id: "2",
        type: "custom",
        data: { label: "Expenses", value: `$${expenses}` },
        position: { x: 175, y: 100 },
      },
      {
        id: "3",
        type: "custom",
        data: { label: "Profit", value: `$${income - expenses}` },
        position: { x: 225, y: 200 },
      },
      {
        id: "4",
        type: "custom",
        data: { label: "Investments", value: `$${income - expenses}` },
        position: { x: 250, y: 300 },
      },
    ],
    [income, expenses],
  );

  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      label: "-",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      label: "=",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e1-3",
      source: "3",
      target: "4",
      animated: true,
      label: "-",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "e2-4",
      source: "4",
      target: "0",
      animated: true,
      label: "=",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onIncomeChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const value = Number(evt.target.value);
      setIncome(value);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === "1") {
            node.data = { ...node.data, value: `$${value}` };
          }
          if (node.id === "3") {
            node.data = { ...node.data, value: `$${value - expenses}` };
          }
          return node;
        }),
      );
    },
    [setNodes, expenses],
  );

  const onExpensesChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const value = Number(evt.target.value);
      setExpenses(value);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === "2") {
            node.data = { ...node.data, value: `$${value}` };
          }
          if (node.id === "3") {
            node.data = { ...node.data, value: `$${income - value}` };
          }
          return node;
        }),
      );
    },
    [setNodes, income],
  );

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mb-4 flex gap-4">
        <div>
          <label
            htmlFor="Income"
            className="block text-sm font-medium text-gray-700"
          >
            Income
          </label>
          <Input
            type="number"
            id="income"
            value={income}
            onChange={onIncomeChange}
            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="expenses"
            className="block text-sm font-medium text-gray-700"
          >
            Expenses
          </label>
          <Input
            type="number"
            id="expenses"
            value={expenses}
            onChange={onExpensesChange}
            className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowChart;
