import React, { useState } from 'react';
import { ToolProps } from '../types';

export default function Console({ tool, onUpdate }: ToolProps) {
  const [logs, setLogs] = useState<string[]>(tool.data.logs || []);
  const [input, setInput] = useState('');

  const handleExecute = () => {
    try {
      const result = eval(input);
      setLogs(prev => [...prev, `> ${input}`, String(result)]);
      setInput('');
      onUpdate({
        ...tool,
        data: { ...tool.data, logs: [...logs, `> ${input}`, String(result)] }
      });
    } catch (error) {
      setLogs(prev => [...prev, `> ${input}`, `Error: ${error.message}`]);
      setInput('');
      onUpdate({
        ...tool,
        data: { ...tool.data, logs: [...logs, `> ${input}`, `Error: ${error.message}`] }
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-900 p-2 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className="text-gray-100">{log}</div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleExecute()}
          className="flex-1 p-2 bg-gray-800 text-gray-100 font-mono text-sm"
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}