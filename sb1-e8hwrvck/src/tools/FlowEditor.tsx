import React, { useState } from 'react';
import { ToolProps } from '../types';
import { ArrowRight } from 'lucide-react';

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
}

export default function FlowEditor({ tool, onUpdate }: ToolProps) {
  const [nodes, setNodes] = useState<Node[]>(tool.data.nodes || []);

  const handleAddNode = () => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type: 'task',
      position: { x: Math.random() * 200, y: Math.random() * 200 }
    };

    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    onUpdate({
      ...tool,
      data: { ...tool.data, nodes: newNodes }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAddNode}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Node
        </button>
      </div>
      <div className="flex-1 relative bg-gray-50">
        {nodes.map(node => (
          <div
            key={node.id}
            className="absolute p-2 bg-white rounded shadow-md"
            style={{ left: node.position.x, top: node.position.y }}
          >
            <div className="flex items-center">
              <span className="mr-2">Task</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}