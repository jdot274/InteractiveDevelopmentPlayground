import React, { useState } from 'react';
import { ToolProps } from '../types';

export default function ObjectInspector({ tool, onUpdate }: ToolProps) {
  const [object, setObject] = useState<any>(tool.data.object || {});

  const handleUpdateValue = (path: string[], value: any) => {
    const newObject = { ...object };
    let current = newObject;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    
    setObject(newObject);
    onUpdate({
      ...tool,
      data: { ...tool.data, object: newObject }
    });
  };

  const renderValue = (value: any, path: string[] = []) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="ml-4">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <span className="font-medium">{key}:</span>
              {renderValue(val, [...path, key])}
            </div>
          ))}
        </div>
      );
    }

    return (
      <input
        value={String(value)}
        onChange={e => handleUpdateValue(path, e.target.value)}
        className="ml-2 px-1 border rounded"
      />
    );
  };

  return (
    <div className="h-full overflow-y-auto p-2">
      {renderValue(object)}
    </div>
  );
}