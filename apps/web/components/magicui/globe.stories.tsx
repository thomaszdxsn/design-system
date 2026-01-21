import type { Meta, StoryObj } from "@storybook/react";
import { Globe } from "./globe";

const meta: Meta<typeof Globe> = {
  title: "Magic UI/Social & Media/Globe",
  component: Globe,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Globe>;

const GlobeDemo = ({ className }: { className?: string }) => {
  return (
    <div className="relative h-96 w-96 overflow-hidden rounded-lg border bg-background">
      <Globe className={className} />
    </div>
  );
};

export const Default: Story = {
  render: () => <GlobeDemo />,
};

const CustomGlobeDemo = () => {
  const customConfig = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0.2,
    diffuse: 0.8,
    mapSamples: 16000,
    mapBrightness: 2,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: [
      { location: [37.7749, -122.4194], size: 0.1 }, // San Francisco
      { location: [40.7128, -74.006], size: 0.1 }, // New York
      { location: [51.5074, -0.1278], size: 0.08 }, // London
      { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
      { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    ],
  };

  return (
    <div className="relative h-96 w-96 overflow-hidden rounded-lg border bg-black">
      <Globe config={customConfig} />
    </div>
  );
};

export const CustomConfig: Story = {
  render: () => <CustomGlobeDemo />,
};

const DarkGlobeDemo = () => {
  const darkConfig = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 0.6,
    baseColor: [0.1, 0.1, 0.1],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.1, 0.1, 0.1],
    markers: [
      { location: [14.5995, 120.9842], size: 0.03 },
      { location: [19.076, 72.8777], size: 0.1 },
      { location: [23.8103, 90.4125], size: 0.05 },
      { location: [30.0444, 31.2357], size: 0.07 },
      { location: [39.9042, 116.4074], size: 0.08 },
    ],
  };

  return (
    <div className="relative h-96 w-96 overflow-hidden rounded-lg border bg-slate-900">
      <Globe config={darkConfig} />
    </div>
  );
};

export const DarkTheme: Story = {
  render: () => <DarkGlobeDemo />,
};

export const SmallSize: Story = {
  render: () => (
    <div className="relative h-48 w-48 overflow-hidden rounded-lg border bg-background">
      <Globe />
    </div>
  ),
};
