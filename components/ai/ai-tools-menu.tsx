'use client';

import { CodeGenerationDialog } from './code-generation-dialog';
import { CodeImprovementDialog } from './code-improvement-dialog';
import { CodeExplanationDialog } from './code-explanation-dialog';

export function AIToolsMenu() {
  return (
    <div className="flex space-x-2">
      <CodeGenerationDialog />
      <CodeImprovementDialog />
      <CodeExplanationDialog />
    </div>
  );
}