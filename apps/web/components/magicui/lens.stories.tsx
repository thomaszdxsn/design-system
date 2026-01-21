import type { Meta, StoryObj } from "@storybook/react";
import { Lens } from "./lens";

const meta: Meta<typeof Lens> = {
  title: "Magic UI/Utilities/Lens",
  component: Lens,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Lens>;

const SampleImage = () => (
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    alt="Sample landscape"
    className="w-full h-full object-cover"
  />
);

const SampleContent = () => (
  <div className="w-96 h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 text-white">
    <h2 className="text-2xl font-bold mb-4">Hover to Zoom</h2>
    <p className="text-sm opacity-90">
      This is a sample content area. Move your mouse over this area to see the lens effect in
      action. The lens will magnify the content underneath it.
    </p>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="w-8 h-8 bg-white/20 rounded" />
      ))}
    </div>
  </div>
);

const DetailedContent = () => (
  <div className="w-96 h-64 bg-gray-100 p-4 text-gray-800 text-xs leading-tight">
    <h3 className="font-bold mb-2">Fine Print Content</h3>
    <p className="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <p className="mb-2">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <div className="grid grid-cols-4 gap-1 mt-2">
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className="text-[8px] p-1 bg-gray-200 text-center">
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <Lens>
      <SampleContent />
    </Lens>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Lens zoomFactor={2}>
      <div className="w-96 h-64">
        <SampleImage />
      </div>
    </Lens>
  ),
};

export const HighZoom: Story = {
  render: () => (
    <Lens zoomFactor={3}>
      <DetailedContent />
    </Lens>
  ),
};

export const LargeLens: Story = {
  render: () => (
    <Lens lensSize={250} zoomFactor={1.8}>
      <SampleContent />
    </Lens>
  ),
};

export const SmallLens: Story = {
  render: () => (
    <Lens lensSize={100} zoomFactor={2.5}>
      <DetailedContent />
    </Lens>
  ),
};

export const StaticLens: Story = {
  render: () => (
    <Lens isStatic position={{ x: 150, y: 100 }} zoomFactor={2} lensSize={120}>
      <SampleContent />
    </Lens>
  ),
};

export const DefaultPosition: Story = {
  render: () => (
    <Lens defaultPosition={{ x: 200, y: 130 }} zoomFactor={2.2} lensSize={140}>
      <div className="w-96 h-64 bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
        <h2 className="text-xl font-bold mb-3">Default Position Demo</h2>
        <p className="text-sm">
          The lens starts at a default position and follows your mouse when you hover.
        </p>
        <div className="mt-4 flex space-x-2">
          <div className="w-12 h-12 bg-white/30 rounded-full" />
          <div className="w-12 h-12 bg-white/30 rounded-full" />
          <div className="w-12 h-12 bg-white/30 rounded-full" />
        </div>
      </div>
    </Lens>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <Lens lensColor="rgba(255, 255, 255, 0.8)" zoomFactor={2} lensSize={160}>
      <div className="w-96 h-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-3">Custom Lens Color</h2>
        <p className="text-sm mb-4">
          This lens uses a white semi-transparent color instead of the default black.
        </p>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    </Lens>
  ),
};

export const FastAnimation: Story = {
  render: () => (
    <Lens duration={0.05} zoomFactor={2.5}>
      <SampleContent />
    </Lens>
  ),
};

export const SlowAnimation: Story = {
  render: () => (
    <Lens duration={0.5} zoomFactor={2}>
      <SampleContent />
    </Lens>
  ),
};

const ComplexContent = () => (
  <div className="w-96 h-64 bg-white border border-gray-200 p-4">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-gray-800">Dashboard</h3>
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-blue-100 p-2 rounded text-xs">
        <div className="font-semibold">Users</div>
        <div className="text-2xl font-bold text-blue-600">1,234</div>
      </div>
      <div className="bg-green-100 p-2 rounded text-xs">
        <div className="font-semibold">Revenue</div>
        <div className="text-2xl font-bold text-green-600">$5.6K</div>
      </div>
      <div className="bg-purple-100 p-2 rounded text-xs">
        <div className="font-semibold">Orders</div>
        <div className="text-2xl font-bold text-purple-600">89</div>
      </div>
    </div>
    <div className="space-y-2">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center space-x-2 text-xs">
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="flex-1">Item {i + 1}</span>
          <span className="text-gray-500">{Math.floor(Math.random() * 100)}%</span>
        </div>
      ))}
    </div>
  </div>
);

export const ComplexUI: Story = {
  render: () => (
    <Lens zoomFactor={2.2} lensSize={180}>
      <ComplexContent />
    </Lens>
  ),
};
