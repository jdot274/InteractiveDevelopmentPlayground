import React, { useState } from 'react';
import { ToolProps } from '../types';

export default function CodeEditor({ tool, onUpdate }: ToolProps) {
  const [code, setCode] = useState(tool.data.code || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onUpdate({
      ...tool,
      data: { ...tool.data, code: newCode }
    });
  };

  return (
    <textarea
      value={code}
      onChange={handleChange}
      className="w-full h-full p-2 font-mono text-sm bg-gray-900 text-gray-100 resize-none"
      placeholder="Write your code here..."
    />
  );
}