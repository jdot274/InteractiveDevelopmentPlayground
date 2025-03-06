import React from 'react';
import { ToolDefinition } from '../types';
import { toolDefinitions } from '../tools';

interface ToolPaletteProps {
  onAddTool: (definition: ToolDefinition) => void;
}

export default function ToolPalette({ onAddTool }: ToolPaletteProps) {
  return (
    <div className="w-64 bg-gray-800/90 backdrop-blur-sm p-5 overflow-y-auto border-r border-white/10">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">Tools</h2>
      
      <div className="space-y-2.5">
        {Object.values(toolDefinitions).map(definition => (
          <button
            key={definition.type}
            className="flex items-center w-full p-3 rounded-lg 
                     bg-gray-700/50 hover:bg-gray-600/50 text-white
                     transition-all duration-200 border border-white/5
                     hover:border-white/20 hover:shadow-lg hover:scale-[1.02]
                     active:scale-95"
            onClick={() => onAddTool(definition)}
          >
            <definition.icon className="w-5 h-5 mr-3 text-blue-400" />
            <span className="font-medium">{definition.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}