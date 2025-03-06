import React, { useState, useCallback, useEffect } from 'react';
import { Tool, Workspace as WorkspaceType, ToolDefinition } from '../types';
import { Hand as DragHandle } from 'lucide-react';
import ToolPalette from './ToolPalette';
import { toolDefinitions } from '../tools';
import { useFabric } from '../hooks/useFabric';
import ComponentLibrary from './ComponentLibrary';
import FabricTools from './FabricTools';

/**
 * Main workspace component that manages the canvas and tools.
 * Handles:
 * - Tool placement and management
 * - Drag and drop interactions
 * - Tool state updates
 * - Grid system and visual layout
 */
export default function Workspace() {
  const [workspace, setWorkspace] = useState<WorkspaceType>({
    tools: [],
    connections: []
  });

  const fabricTools = useFabric('mainCanvas');
  const { undo, createComponent } = fabricTools;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        createComponent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, createComponent]);

  /**
   * Adds a new tool instance to the workspace
   * @param definition The tool type to add
   */
  const handleAddTool = useCallback((definition: ToolDefinition) => {
    const newTool: Tool = {
      id: crypto.randomUUID(),
      type: definition.type,
      position: { x: 100, y: 100 },
      size: definition.defaultSize,
      data: {}
    };

    setWorkspace(prev => ({
      ...prev,
      tools: [...prev.tools, newTool]
    }));
  }, []);

  /**
   * Updates the state of an existing tool
   * @param updatedTool The modified tool data
   */
  const handleUpdateTool = useCallback((updatedTool: Tool) => {
    setWorkspace(prev => ({
      ...prev,
      tools: prev.tools.map(tool => 
        tool.id === updatedTool.id ? updatedTool : tool
      )
    }));
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <ToolPalette onAddTool={handleAddTool} />
      <ComponentLibrary />
      <FabricTools />
      <div className="flex-1 relative overflow-hidden p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative h-full rounded-xl overflow-hidden border border-white/10">
          <canvas 
            id="mainCanvas"
            className="absolute top-0 left-0 pointer-events-auto bg-transparent"
            width="800"
            height="600" 
          />
          {workspace.tools.map(tool => {
            const ToolComponent = toolDefinitions[tool.type].component;
            
            return (
              <div
                key={tool.id}
                className="absolute bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-white/20"
                style={{
                  left: tool.position.x,
                  top: tool.position.y,
                  width: tool.size.width,
                  height: tool.size.height
                }}
              >
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg cursor-move border-b border-gray-200">
                  <DragHandle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {toolDefinitions[tool.type].name}
                  </span>
                </div>
                
                <div className="p-4 bg-white/80">
                  <ToolComponent
                    tool={tool}
                    onUpdate={handleUpdateTool}
                    onConnect={() => {}}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}