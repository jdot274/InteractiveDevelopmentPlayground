import React, { useState } from 'react';
import { ChevronRight, Square, Circle, Type, Image, Pencil, Layers, Move, Palette } from 'lucide-react';
import { useFabric } from '../hooks/useFabric';

interface ToolGroup {
  name: string;
  icon: React.ComponentType;
  tools: Tool[];
}

interface Tool {
  name: string;
  icon: React.ComponentType;
  action: () => void;
}

export default function FabricTools() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { addShape, canvas } = useFabric('mainCanvas');

  const toolGroups: ToolGroup[] = [
    {
      name: 'Shapes',
      icon: Square,
      tools: [
        {
          name: 'Rectangle',
          icon: Square,
          action: () => addShape('rectangle', { fill: '#4F46E5' })
        },
        {
          name: 'Circle',
          icon: Circle,
          action: () => addShape('circle', { fill: '#7C3AED' })
        }
      ]
    },
    {
      name: 'Text',
      icon: Type,
      tools: [
        {
          name: 'Add Text',
          icon: Type,
          action: () => {
            if (!canvas) return;
            const text = new fabric.IText('Double click to edit', {
              left: 100,
              top: 100,
              fontFamily: 'sans-serif',
              fill: '#1F2937'
            });
            canvas.add(text);
            canvas.renderAll();
          }
        }
      ]
    },
    {
      name: 'Drawing',
      icon: Pencil,
      tools: [
        {
          name: 'Free Draw',
          icon: Pencil,
          action: () => {
            if (!canvas) return;
            canvas.isDrawingMode = !canvas.isDrawingMode;
            canvas.freeDrawingBrush.width = 2;
            canvas.freeDrawingBrush.color = '#4F46E5';
          }
        }
      ]
    },
    {
      name: 'Arrange',
      icon: Layers,
      tools: [
        {
          name: 'Bring Forward',
          icon: Move,
          action: () => {
            if (!canvas || !canvas.getActiveObject()) return;
            canvas.getActiveObject().bringForward();
            canvas.renderAll();
          }
        },
        {
          name: 'Send Backward',
          icon: Move,
          action: () => {
            if (!canvas || !canvas.getActiveObject()) return;
            canvas.getActiveObject().sendBackwards();
            canvas.renderAll();
          }
        }
      ]
    },
    {
      name: 'Style',
      icon: Palette,
      tools: [
        {
          name: 'Fill Color',
          icon: Palette,
          action: () => {
            if (!canvas || !canvas.getActiveObject()) return;
            const color = '#' + Math.floor(Math.random()*16777215).toString(16);
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
          }
        }
      ]
    }
  ];

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-48 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/5 to-blue-600/5" />
      <div className="relative p-2 space-y-1">
        {toolGroups.map(group => (
          <div key={group.name} className="select-none">
            <button
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
            >
              <group.icon className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">{group.name}</span>
              <ChevronRight 
                className={`w-4 h-4 ml-auto text-gray-400 transition-transform ${
                  expandedGroups.includes(group.name) ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {expandedGroups.includes(group.name) && (
              <div className="ml-4 mt-1 space-y-1">
                {group.tools.map(tool => (
                  <button
                    key={tool.name}
                    onClick={tool.action}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100/80 transition-colors group"
                  >
                    <tool.icon className="w-4 h-4 text-gray-500 mr-2 group-hover:text-purple-500 transition-colors" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {tool.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}