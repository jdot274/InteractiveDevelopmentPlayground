import React, { useState } from 'react';
import { ToolProps } from '../types';

interface Rule {
  id: string;
  condition: string;
  action: string;
  enabled: boolean;
}

export default function RulesEngine({ tool, onUpdate }: ToolProps) {
  const [rules, setRules] = useState<Rule[]>(tool.data.rules || []);

  const handleAddRule = () => {
    const newRule: Rule = {
      id: crypto.randomUUID(),
      condition: 'true',
      action: 'console.log("Rule triggered")',
      enabled: true
    };

    const newRules = [...rules, newRule];
    setRules(newRules);
    onUpdate({
      ...tool,
      data: { ...tool.data, rules: newRules }
    });
  };

  const handleToggleRule = (id: string) => {
    const newRules = rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    );
    setRules(newRules);
    onUpdate({
      ...tool,
      data: { ...tool.data, rules: newRules }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAddRule}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Rule
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {rules.map(rule => (
          <div key={rule.id} className="p-2 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Rule {rule.id.slice(0, 4)}</span>
              <button
                onClick={() => handleToggleRule(rule.id)}
                className={`px-2 py-1 rounded ${
                  rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {rule.enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-gray-500">If:</span> {rule.condition}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Then:</span> {rule.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}