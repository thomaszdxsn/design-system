import type { Meta, StoryObj } from "@storybook/react";
import { Pointer } from "./pointer";

const meta: Meta<typeof Pointer> = {
  title: "Magic UI/Utilities/Pointer",
  component: Pointer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pointer>;

const DemoArea = ({ children, title }: { children?: React.ReactNode; title: string }) => (
  <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-500">Move your mouse over this area</p>
    </div>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <DemoArea title="Default Pointer">
      <Pointer />
    </DemoArea>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <DemoArea title="Custom Color Pointer">
      <Pointer className="text-red-500 stroke-white" />
    </DemoArea>
  ),
};

export const LargePointer: Story = {
  render: () => (
    <DemoArea title="Large Pointer">
      <Pointer>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          height="36"
          width="36"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-[-70deg] stroke-white text-purple-600"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      </Pointer>
    </DemoArea>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <DemoArea title="Custom Icon Pointer">
      <Pointer>
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          ✨
        </div>
      </Pointer>
    </DemoArea>
  ),
};

export const TextPointer: Story = {
  render: () => (
    <DemoArea title="Text Pointer">
      <Pointer>
        <div className="bg-black text-white px-2 py-1 rounded text-sm font-medium">Click me!</div>
      </Pointer>
    </DemoArea>
  ),
};

export const GlowingPointer: Story = {
  render: () => (
    <DemoArea title="Glowing Pointer">
      <Pointer>
        <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" />
      </Pointer>
    </DemoArea>
  ),
};

export const MultipleAreas: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="relative h-48 bg-gradient-to-r from-green-100 to-blue-100 border border-gray-300 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h4 className="font-semibold text-gray-700">Area 1</h4>
          <p className="text-sm text-gray-500">Default pointer</p>
        </div>
        <Pointer />
      </div>
      <div className="relative h-48 bg-gradient-to-r from-pink-100 to-yellow-100 border border-gray-300 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h4 className="font-semibold text-gray-700">Area 2</h4>
          <p className="text-sm text-gray-500">Custom pointer</p>
        </div>
        <Pointer>
          <div className="w-4 h-4 bg-red-500 rounded-full" />
        </Pointer>
      </div>
    </div>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-96 p-8">
      <div className="relative max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
          <h3 className="text-xl font-bold text-gray-900">Interactive Card</h3>
          <p className="text-gray-600">
            This card has a custom pointer. Hover over it to see the magic cursor in action.
          </p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors">
            Get Started
          </button>
        </div>
        <Pointer>
          <div className="flex items-center space-x-1 bg-black text-white px-2 py-1 rounded text-xs">
            <span>👆</span>
            <span>Click</span>
          </div>
        </Pointer>
      </div>
    </div>
  ),
};

export const AnimatedPointer: Story = {
  render: () => (
    <DemoArea title="Animated Pointer">
      <Pointer>
        <div className="relative">
          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping opacity-75" />
        </div>
      </Pointer>
    </DemoArea>
  ),
};

export const TooltipPointer: Story = {
  render: () => (
    <DemoArea title="Tooltip Pointer">
      <Pointer>
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg relative">
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          Hover tooltip
        </div>
      </Pointer>
    </DemoArea>
  ),
};
