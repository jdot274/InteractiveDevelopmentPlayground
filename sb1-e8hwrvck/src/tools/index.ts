import { ToolDefinition } from '../types';
import { Code2, Terminal, Database, Workflow, Settings, Box } from 'lucide-react';
import CodeEditor from './CodeEditor';
import Console from './Console';
import DataExplorer from './DataExplorer';
import FlowEditor from './FlowEditor';
import RulesEngine from './RulesEngine';
import ObjectInspector from './ObjectInspector';

/**
 * Registry of all available tools in the playground.
 * Each tool definition includes:
 * - type: Unique identifier for the tool
 * - name: Display name in the UI
 * - icon: Lucide icon component
 * - component: React component implementing the tool
 * - defaultSize: Initial dimensions when added to workspace
 */
export const toolDefinitions: Record<string, ToolDefinition> = {
  codeEditor: {
    type: 'codeEditor',
    name: 'Code Editor',
    icon: Code2,
    component: CodeEditor,
    defaultSize: { width: 500, height: 400 }
  },
  console: {
    type: 'console',
    name: 'Console',
    icon: Terminal,
    component: Console,
    defaultSize: { width: 400, height: 300 }
  },
  dataExplorer: {
    type: 'dataExplorer',
    name: 'Data Explorer',
    icon: Database,
    component: DataExplorer,
    defaultSize: { width: 400, height: 500 }
  },
  flowEditor: {
    type: 'flowEditor',
    name: 'Flow Editor',
    icon: Workflow,
    component: FlowEditor,
    defaultSize: { width: 600, height: 400 }
  },
  rulesEngine: {
    type: 'rulesEngine',
    name: 'Rules Engine',
    icon: Settings,
    component: RulesEngine,
    defaultSize: { width: 400, height: 500 }
  },
  objectInspector: {
    type: 'objectInspector',
    name: 'Object Inspector',
    icon: Box,
    component: ObjectInspector,
    defaultSize: { width: 300, height: 400 }
  }
};