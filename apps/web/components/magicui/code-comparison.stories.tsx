import type { Meta, StoryObj } from "@storybook/react";
import { CodeComparison } from "./code-comparison";

const meta: Meta<typeof CodeComparison> = {
  title: "Magic UI/Utilities/CodeComparison",
  component: CodeComparison,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeComparison>;

const beforeCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const afterCode = `function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}`;

const beforeTypeScript = `interface User {
  name: string;
  age: number;
}

function greetUser(user: User) {
  console.log("Hello " + user.name);
  console.log("You are " + user.age + " years old");
}`;

const afterTypeScript = `interface User {
  name: string;
  age: number;
}

function greetUser(user: User) {
  console.log(\`Hello \${user.name}\`);
  console.log(\`You are \${user.age} years old\`);
}`;

const beforeReact = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`;

const afterReact = `import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`;

const beforeDiff = `function processData(data) {
  // [!code --]
  const result = [];
  // [!code --]
  for (let i = 0; i < data.length; i++) {
    // [!code --]
    if (data[i].active) {
      // [!code --]
      result.push(data[i]);
    }
    // [!code --]
  }
  // [!code --]
  return result;
}`;

const afterDiff = `function processData(data) {
  // [!code ++]
  return data.filter(item => item.active);
}`;

const beforeFocus = `function complexFunction() {
  const step1 = doSomething();
  // [!code focus]
  const step2 = doSomethingElse();
  const step3 = finalStep();
  return step3;
}`;

const afterFocus = `function complexFunction() {
  const step1 = doSomething();
  // [!code focus]
  const step2 = doSomethingBetter();
  const step3 = finalStep();
  return step3;
}`;

export const Default: Story = {
  args: {
    beforeCode,
    afterCode,
    language: "javascript",
    filename: "utils.js",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const TypeScript: Story = {
  args: {
    beforeCode: beforeTypeScript,
    afterCode: afterTypeScript,
    language: "typescript",
    filename: "user.ts",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const React: Story = {
  args: {
    beforeCode: beforeReact,
    afterCode: afterReact,
    language: "tsx",
    filename: "Counter.tsx",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const WithDiffHighlighting: Story = {
  args: {
    beforeCode: beforeDiff,
    afterCode: afterDiff,
    language: "javascript",
    filename: "data-processor.js",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const WithFocusHighlighting: Story = {
  args: {
    beforeCode: beforeFocus,
    afterCode: afterFocus,
    language: "javascript",
    filename: "complex.js",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const CustomHighlightColor: Story = {
  args: {
    beforeCode,
    afterCode,
    language: "javascript",
    filename: "utils.js",
    lightTheme: "github-light",
    darkTheme: "github-dark",
    highlightColor: "#3b82f6",
  },
};

export const PythonComparison: Story = {
  args: {
    beforeCode: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total`,
    afterCode: `def calculate_sum(numbers):
    return sum(numbers)`,
    language: "python",
    filename: "calculator.py",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};

export const CSSComparison: Story = {
  args: {
    beforeCode: `.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}`,
    afterCode: `.button {
  @apply bg-blue-500 text-white px-4 py-2 border-0 rounded cursor-pointer;
  @apply hover:bg-blue-600;
}`,
    language: "css",
    filename: "styles.css",
    lightTheme: "github-light",
    darkTheme: "github-dark",
  },
};
