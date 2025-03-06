# Interactive Development Playground

A powerful, extensible development environment that allows you to create, test, and experiment with various tools and workflows in a flexible canvas-based workspace.

## 🚀 Features

- **Interactive Workspace**: Drag-and-drop interface for tool placement and organization
- **Modular Tool System**: Easily create and add new tools
- **Real-time Updates**: All tools update and interact in real-time
- **Type-safe**: Built with TypeScript for robust development
- **Extensible**: Built-in plugin architecture for adding new capabilities

## 🛠 Built-in Tools

1. **Code Editor**
   - Write and edit code in real-time
   - Syntax highlighting ready for implementation
   - Code execution capabilities

2. **Console**
   - Execute JavaScript code
   - View output and errors
   - Command history support

3. **Data Explorer**
   - Store and manage key-value pairs
   - Persistent data storage
   - Visual data management

4. **Flow Editor**
   - Create visual workflows
   - Connect nodes with actions
   - Drag-and-drop node placement

5. **Rules Engine**
   - Define conditional rules
   - Set up automated actions
   - Enable/disable rules dynamically

6. **Object Inspector**
   - Examine object properties
   - Modify values in real-time
   - Nested object support

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Workspace.tsx   # Main workspace container
│   └── ToolPalette.tsx # Tool selection sidebar
├── tools/              # Individual tool implementations
│   ├── index.ts        # Tool registry and definitions
│   ├── CodeEditor.tsx  # Code editing tool
│   ├── Console.tsx     # Interactive console
│   ├── DataExplorer.tsx# Data management
│   ├── FlowEditor.tsx  # Visual flow editor
│   ├── RulesEngine.tsx # Rules and automation
│   └── ObjectInspector.tsx # Object property inspector
├── types/              # TypeScript type definitions
│   └── index.ts        # Core type definitions
└── App.tsx             # Root application component
```

## 🔄 Core Concepts

### Tool System

Tools are the fundamental building blocks of the playground. Each tool:
- Has a unique identifier
- Maintains its own state
- Can be positioned anywhere in the workspace
- Can interact with other tools

```typescript
interface Tool {
  id: string;          // Unique identifier
  type: string;        // Tool type (e.g., 'codeEditor')
  position: {          // Position in workspace
    x: number;
    y: number;
  };
  size: {              // Tool dimensions
    width: number;
    height: number;
  };
  data: any;           // Tool-specific state
}
```

### Workspace Management

The workspace (`Workspace.tsx`) handles:
- Tool positioning and layout
- Tool state management
- Inter-tool communication
- Grid system for alignment

### Tool Definition System

New tools can be added by:
1. Creating a tool component
2. Adding tool definition to `tools/index.ts`
3. Implementing required interfaces

Example:
```typescript
const toolDefinition: ToolDefinition = {
  type: 'myTool',
  name: 'My Tool',
  icon: ToolIcon,
  component: MyToolComponent,
  defaultSize: { width: 400, height: 300 }
};
```

## 🔌 Adding New Tools

1. Create a new tool component in `src/tools/`
2. Implement the `ToolProps` interface
3. Add tool definition to `tools/index.ts`
4. Add any necessary types to `types/index.ts`

Example:
```typescript
import { ToolProps } from '../types';

export default function NewTool({ tool, onUpdate }: ToolProps) {
  // Tool implementation
  return (
    <div>
      {/* Tool UI */}
    </div>
  );
}
```

## 🔗 Tool Communication

Tools can communicate through:
1. Direct connections (implemented via the `onConnect` prop)
2. Shared state management (can be added via Redux/Context)
3. Event system (can be implemented for pub/sub patterns)

## 🎨 Styling System

The project uses:
- Tailwind CSS for utility-first styling
- Custom utilities for specific needs (e.g., grid pattern)
- Consistent color scheme and spacing

## 🚧 Future Enhancements

1. **Data Persistence**
   - Local storage integration
   - Backend API connection
   - State synchronization

2. **Tool Enhancements**
   - More tool types
   - Advanced tool interactions
   - Custom tool creation UI

3. **Workspace Features**
   - Multiple workspaces
   - Workspace templates
   - Import/export functionality

4. **Collaboration**
   - Real-time collaboration
   - Shared workspaces
   - User permissions

## 🔧 Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```