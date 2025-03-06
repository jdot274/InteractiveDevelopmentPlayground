import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Sparkles, Box } from 'lucide-react';
import { useComponentStore } from '../store/componentStore';

type CommandType = 'web' | 'ai' | 'component';

interface Command {
  type: CommandType;
  icon: React.ComponentType;
  shortcut: string;
  action: (query: string) => void;
}

export default function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { components } = useComponentStore();

  const commands: Command[] = [
    {
      type: 'web',
      icon: Globe,
      shortcut: '/',
      action: (q) => window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank')
    },
    {
      type: 'ai',
      icon: Sparkles,
      shortcut: '>',
      action: (q) => {
        // AI command handling would go here
        console.log('AI Command:', q);
      }
    },
    {
      type: 'component',
      icon: Box,
      shortcut: '@',
      action: (q) => {
        // Component search would filter the component library
        console.log('Component Search:', q);
      }
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const firstChar = query.charAt(0);
    const commandText = query.slice(1).trim();
    
    const command = commands.find(cmd => cmd.shortcut === firstChar);
    if (command && commandText) {
      command.action(commandText);
      setQuery('');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-xl animate-in slide-in-from-right-2">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 blur-2xl scale-105" />
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200/50">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type / to search web, > for AI, @ for components..."
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 bg-gray-100/50 rounded border border-gray-200/50">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </form>

          <div className="p-2 border-t border-gray-200/50">
            <div className="grid grid-cols-3 gap-2">
              {commands.map((cmd) => (
                <div
                  key={cmd.type}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
                >
                  <cmd.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {cmd.shortcut}
                  </span>
                  <span className="text-sm text-gray-400">
                    {cmd.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}