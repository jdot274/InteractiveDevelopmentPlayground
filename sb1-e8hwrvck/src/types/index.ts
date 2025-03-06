/**
 * Represents a tool instance in the workspace
 */
export interface Tool {
  /** Unique identifier for this tool instance */
  id: string;
  /** Type of tool (must match a toolDefinition type) */
  type: string;
  /** Current position in the workspace */
  position: { x: number; y: number };
  /** Current size of the tool */
  size: { width: number; height: number };
  /** Tool-specific state and data */
  data: any;
}

/**
 * Represents the entire workspace state
 */
export interface Workspace {
  /** All tool instances in the workspace */
  tools: Tool[];
  /** Connections between tools */
  connections: Connection[];
}

/**
 * Represents a connection between two tools
 */
export interface Connection {
  /** Unique identifier for this connection */
  id: string;
  /** ID of the source tool */
  sourceId: string;
  /** ID of the target tool */
  targetId: string;
  /** Type of connection (e.g., 'data', 'event', etc.) */
  type: string;
}

/**
 * Defines a tool type that can be added to the workspace
 */
export interface ToolDefinition {
  /** Unique identifier for this tool type */
  type: string;
  /** Display name shown in the UI */
  name: string;
  /** Lucide icon component */
  icon: React.ComponentType;
  /** React component that implements the tool */
  component: React.ComponentType<ToolProps>;
  /** Default size when tool is first added */
  defaultSize: { width: number; height: number };
}

/**
 * Props passed to each tool component
 */
export interface ToolProps {
  /** The tool instance data */
  tool: Tool;
  /** Callback to update tool state */
  onUpdate: (updatedTool: Tool) => void;
  /** Callback to create a connection to another tool */
  onConnect: (connection: Partial<Connection>) => void;
}