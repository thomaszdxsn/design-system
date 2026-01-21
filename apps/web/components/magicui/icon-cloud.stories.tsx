import type { Meta, StoryObj } from "@storybook/react";
import { IconCloud } from "./icon-cloud";

const meta: Meta<typeof IconCloud> = {
  title: "Magic UI/Social & Media/IconCloud",
  component: IconCloud,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconCloud>;

// Sample tech stack icons as SVG elements
const TechIcons = {
  React: (
    <svg viewBox="0 0 24 24" fill="#61DAFB">
      <circle cx="12" cy="12" r="2" />
      <path d="M12,1C18.5,1 24,6.5 24,12C24,17.5 18.5,23 12,23C5.5,23 0,17.5 0,12C0,6.5 5.5,1 12,1M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="#3178C6">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
        TS
      </text>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="#F7DF1E">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <text x="12" y="16" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">
        JS
      </text>
    </svg>
  ),
  Node: (
    <svg viewBox="0 0 24 24" fill="#339933">
      <circle cx="12" cy="12" r="10" fill="#339933" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        Node
      </text>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="#3776AB">
      <circle cx="12" cy="12" r="10" fill="#3776AB" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        Py
      </text>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="#2496ED">
      <rect width="24" height="24" rx="4" fill="#2496ED" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
        Docker
      </text>
    </svg>
  ),
};

const sampleImages = [
  "https://via.placeholder.com/40x40/3b82f6/ffffff?text=1",
  "https://via.placeholder.com/40x40/ef4444/ffffff?text=2",
  "https://via.placeholder.com/40x40/10b981/ffffff?text=3",
  "https://via.placeholder.com/40x40/f59e0b/ffffff?text=4",
  "https://via.placeholder.com/40x40/8b5cf6/ffffff?text=5",
  "https://via.placeholder.com/40x40/ec4899/ffffff?text=6",
  "https://via.placeholder.com/40x40/06b6d4/ffffff?text=7",
  "https://via.placeholder.com/40x40/84cc16/ffffff?text=8",
];

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <IconCloud />
    </div>
  ),
};

export const WithTechIcons: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <IconCloud icons={Object.values(TechIcons)} />
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <IconCloud images={sampleImages} />
    </div>
  ),
};

const LargeTechStack = () => {
  const techIcons = [
    ...Object.values(TechIcons),
    // Add more icons for a fuller cloud
    <svg key="vue" viewBox="0 0 24 24" fill="#4FC08D">
      <circle cx="12" cy="12" r="10" fill="#4FC08D" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        Vue
      </text>
    </svg>,
    <svg key="angular" viewBox="0 0 24 24" fill="#DD0031">
      <circle cx="12" cy="12" r="10" fill="#DD0031" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
        Ang
      </text>
    </svg>,
    <svg key="svelte" viewBox="0 0 24 24" fill="#FF3E00">
      <circle cx="12" cy="12" r="10" fill="#FF3E00" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
        Svelte
      </text>
    </svg>,
    <svg key="go" viewBox="0 0 24 24" fill="#00ADD8">
      <circle cx="12" cy="12" r="10" fill="#00ADD8" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        Go
      </text>
    </svg>,
    <svg key="rust" viewBox="0 0 24 24" fill="#000000">
      <circle cx="12" cy="12" r="10" fill="#000000" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
        Rust
      </text>
    </svg>,
    <svg key="java" viewBox="0 0 24 24" fill="#ED8B00">
      <circle cx="12" cy="12" r="10" fill="#ED8B00" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
        Java
      </text>
    </svg>,
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h3 className="text-lg font-semibold">Tech Stack Cloud</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Interactive 3D cloud of technologies. Click and drag to rotate, or click on individual
        icons.
      </p>
      <IconCloud icons={techIcons} />
    </div>
  );
};

export const TechStack: Story = {
  render: () => <LargeTechStack />,
};

const ComparisonDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div className="text-center space-y-4">
        <h4 className="font-semibold">With Custom Icons</h4>
        <IconCloud icons={Object.values(TechIcons)} />
      </div>
      <div className="text-center space-y-4">
        <h4 className="font-semibold">With Images</h4>
        <IconCloud images={sampleImages.slice(0, 6)} />
      </div>
    </div>
  );
};

export const Comparison: Story = {
  render: () => <ComparisonDemo />,
};
