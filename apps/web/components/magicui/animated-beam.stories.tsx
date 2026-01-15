import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { AnimatedBeam } from "./animated-beam";

const meta: Meta<typeof AnimatedBeam> = {
  title: "Magic UI/Effects/AnimatedBeam",
  component: AnimatedBeam,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnimatedBeam>;

const BeamDemo = ({
  curvature = 0,
  reverse = false,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
}: {
  curvature?: number;
  reverse?: boolean;
  gradientStartColor?: string;
  gradientStopColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-64 w-96 items-center justify-between rounded-lg border bg-background p-8"
    >
      <div
        ref={fromRef}
        className="z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-background shadow-sm"
      >
        A
      </div>
      <div
        ref={toRef}
        className="z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-background shadow-sm"
      >
        B
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        curvature={curvature}
        reverse={reverse}
        gradientStartColor={gradientStartColor}
        gradientStopColor={gradientStopColor}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <BeamDemo />,
};

export const Curved: Story = {
  render: () => <BeamDemo curvature={75} />,
};

export const CurvedDown: Story = {
  render: () => <BeamDemo curvature={-75} />,
};

export const Reversed: Story = {
  render: () => <BeamDemo reverse />,
};

export const CustomColors: Story = {
  render: () => <BeamDemo gradientStartColor="#00ff88" gradientStopColor="#0088ff" />,
};

const MultiBeamDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-80 w-80 items-center justify-center rounded-lg border bg-background"
    >
      <div
        ref={topRef}
        className="absolute top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm text-xs"
      >
        1
      </div>
      <div
        ref={bottomRef}
        className="absolute bottom-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm text-xs"
      >
        2
      </div>
      <div
        ref={leftRef}
        className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm text-xs"
      >
        3
      </div>
      <div
        ref={rightRef}
        className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm text-xs"
      >
        4
      </div>
      <div
        ref={centerRef}
        className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-background shadow-md"
      >
        ⭐
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topRef}
        toRef={centerRef}
        curvature={-30}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomRef}
        toRef={centerRef}
        curvature={30}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftRef}
        toRef={centerRef}
        gradientStartColor="#00ff88"
        gradientStopColor="#0088ff"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightRef}
        toRef={centerRef}
        gradientStartColor="#ff6b6b"
        gradientStopColor="#feca57"
        reverse
      />
    </div>
  );
};

export const MultipleBeams: Story = {
  render: () => <MultiBeamDemo />,
};
