import type { Meta, StoryObj } from "@storybook/react";
import { OrbitingCircles } from "./orbiting-circles";

const meta: Meta<typeof OrbitingCircles> = {
  title: "Magic UI/Social & Media/OrbitingCircles",
  component: OrbitingCircles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrbitingCircles>;

const IconCircle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`flex size-8 items-center justify-center rounded-full border bg-background shadow-sm ${className}`}
  >
    {children}
  </div>
);

const OrbitingDemo = ({
  reverse = false,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
}: {
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}) => {
  return (
    <div className="relative flex h-96 w-96 items-center justify-center">
      <div className="flex size-20 items-center justify-center rounded-full border-2 bg-background shadow-lg">
        <span className="text-2xl">⭐</span>
      </div>
      <OrbitingCircles
        reverse={reverse}
        duration={duration}
        radius={radius}
        path={path}
        iconSize={iconSize}
        speed={speed}
      >
        <IconCircle className="border-blue-500 bg-blue-50">
          <span className="text-blue-600">🚀</span>
        </IconCircle>
        <IconCircle className="border-green-500 bg-green-50">
          <span className="text-green-600">💎</span>
        </IconCircle>
        <IconCircle className="border-purple-500 bg-purple-50">
          <span className="text-purple-600">🎯</span>
        </IconCircle>
        <IconCircle className="border-orange-500 bg-orange-50">
          <span className="text-orange-600">🔥</span>
        </IconCircle>
      </OrbitingCircles>
    </div>
  );
};

export const Default: Story = {
  render: () => <OrbitingDemo />,
};

export const Reverse: Story = {
  render: () => <OrbitingDemo reverse />,
};

export const FastSpeed: Story = {
  render: () => <OrbitingDemo speed={2} />,
};

export const SlowSpeed: Story = {
  render: () => <OrbitingDemo speed={0.5} />,
};

export const LargeRadius: Story = {
  render: () => <OrbitingDemo radius={200} />,
};

export const SmallRadius: Story = {
  render: () => <OrbitingDemo radius={100} />,
};

export const NoPath: Story = {
  render: () => <OrbitingDemo path={false} />,
};

export const LargeIcons: Story = {
  render: () => <OrbitingDemo iconSize={40} />,
};

const MultiLayerDemo = () => {
  return (
    <div className="relative flex h-96 w-96 items-center justify-center">
      <div className="flex size-20 items-center justify-center rounded-full border-2 bg-background shadow-lg">
        <span className="text-2xl">🌟</span>
      </div>

      {/* Inner orbit */}
      <OrbitingCircles radius={80} duration={15} iconSize={25}>
        <IconCircle className="border-red-500 bg-red-50">
          <span className="text-red-600 text-sm">❤️</span>
        </IconCircle>
        <IconCircle className="border-blue-500 bg-blue-50">
          <span className="text-blue-600 text-sm">💙</span>
        </IconCircle>
      </OrbitingCircles>

      {/* Outer orbit */}
      <OrbitingCircles radius={160} duration={25} reverse iconSize={35}>
        <IconCircle className="border-green-500 bg-green-50">
          <span className="text-green-600">🌱</span>
        </IconCircle>
        <IconCircle className="border-purple-500 bg-purple-50">
          <span className="text-purple-600">🔮</span>
        </IconCircle>
        <IconCircle className="border-yellow-500 bg-yellow-50">
          <span className="text-yellow-600">⚡</span>
        </IconCircle>
      </OrbitingCircles>
    </div>
  );
};

export const MultiLayer: Story = {
  render: () => <MultiLayerDemo />,
};

const TechStackDemo = () => {
  return (
    <div className="relative flex h-96 w-96 items-center justify-center">
      <div className="flex size-24 items-center justify-center rounded-full border-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
        <span className="text-sm font-bold">Tech</span>
      </div>
      <OrbitingCircles radius={140} duration={20} iconSize={40}>
        <IconCircle className="border-orange-500 bg-orange-50">
          <span className="text-orange-600 font-bold text-xs">JS</span>
        </IconCircle>
        <IconCircle className="border-blue-500 bg-blue-50">
          <span className="text-blue-600 font-bold text-xs">TS</span>
        </IconCircle>
        <IconCircle className="border-cyan-500 bg-cyan-50">
          <span className="text-cyan-600 font-bold text-xs">React</span>
        </IconCircle>
        <IconCircle className="border-green-500 bg-green-50">
          <span className="text-green-600 font-bold text-xs">Node</span>
        </IconCircle>
      </OrbitingCircles>
    </div>
  );
};

export const TechStack: Story = {
  render: () => <TechStackDemo />,
};
