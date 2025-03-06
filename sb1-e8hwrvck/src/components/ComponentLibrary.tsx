import React, { useState } from 'react';
import { useComponentStore } from '../store/componentStore';
import { ChevronRight } from 'lucide-react';

export default function ComponentLibrary() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { components } = useComponentStore();

  const handleDragStart = (e: React.DragEvent, component: any) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  if (!isExpanded) {
    return (
      <button
        aria-label="Open Component Library"
        onClick={() => setIsExpanded(true)}
        className="fixed right-6 top-6 group isolate"
      >
        <div className="sphere-button relative w-14 h-14 rounded-full transition-all duration-300 group-hover:scale-110 group-active:scale-90">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl group-hover:blur-3xl group-hover:scale-150 transition-all duration-300 scale-125" />
          
          {/* Main sphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 sphere-gradient group-hover:from-purple-300 group-hover:via-blue-400 group-hover:to-purple-500 transition-colors duration-300">
            {/* Inner highlight */}
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/80 via-transparent to-black/40 group-hover:from-white/90" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute -inset-full top-0 sphere-shine" />
            </div>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
              <div className="sphere-pulse absolute inset-0 rounded-full bg-white/10" />
            </div>
          </div>
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <ChevronRight className="w-6 h-6 drop-shadow-lg group-hover:drop-shadow-2xl" />
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap shadow-xl">
            Open Component Library
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-6">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={() => setIsExpanded(false)} />
      <div className="relative w-80 animate-in slide-in-from-right-2">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 blur-2xl scale-105" />
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Component Library
              </h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="rounded-full p-2 hover:bg-gray-100/80 transition-colors group/close"
              >
                <ChevronRight className="w-5 h-5 rotate-180 text-gray-600 group-hover/close:scale-110 transition-transform" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-12rem)] pr-2 -mr-2 space-y-3">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="group/item p-3 bg-white/50 border border-gray-200/80 rounded-xl cursor-move hover:bg-white/80 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-purple-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50" />
                    <img
                      src={component.thumbnail}
                      alt={component.name}
                      className="relative w-full h-28 object-contain p-2 transition-transform duration-300 group-hover/item:scale-105"
                    />
                  </div>
                  <p className="text-sm font-medium bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {component.name}
                  </p>
                </div>
              ))}
              {components.length === 0 && (
                <div className="text-center py-12 px-4">
                  <p className="font-medium bg-gradient-to-br from-purple-600/90 to-blue-600/90 bg-clip-text text-transparent">
                    No components yet
                  </p>
                  <p className="text-sm mt-2 text-gray-500">
                    Select objects and press Ctrl/Cmd + S to save
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}