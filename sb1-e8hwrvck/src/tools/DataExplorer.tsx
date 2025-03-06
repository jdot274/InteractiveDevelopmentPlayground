import React, { useState } from 'react';
import { ToolProps } from '../types';

export default function DataExplorer({ tool, onUpdate }: ToolProps) {
  const [data, setData] = useState<any>(tool.data.storage || {});

  const handleAddItem = () => {
    const key = prompt('Enter key:');
    const value = prompt('Enter value:');
    if (key && value) {
      const newData = { ...data, [key]: value };
      setData(newData);
      onUpdate({
        ...tool,
        data: { ...tool.data, storage: newData }
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAddItem}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between p-2 border-b">
            <span className="font-medium">{key}</span>
            <span className="text-gray-600">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}