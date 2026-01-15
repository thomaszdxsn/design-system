import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Confetti, ConfettiButton, type ConfettiRef } from "./confetti";

const meta: Meta<typeof Confetti> = {
  title: "Magic UI/Effects/Confetti",
  component: Confetti,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Confetti>;

export const Default: Story = {
  render: () => (
    <div className="relative w-[400px] h-[300px]">
      <Confetti
        className="absolute inset-0 w-full h-full"
        options={{
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        }}
      />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <ConfettiButton
      options={{
        particleCount: 100,
        spread: 70,
      }}
    >
      Click for Confetti 🎉
    </ConfettiButton>
  ),
};

export const ManualTrigger: Story = {
  render: function ManualTriggerStory() {
    const confettiRef = useRef<ConfettiRef>(null);

    return (
      <div className="relative w-[400px] h-[300px]">
        <Confetti ref={confettiRef} className="absolute inset-0 w-full h-full" manualstart />
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() =>
            confettiRef.current?.fire({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
            })
          }
        >
          Fire Confetti
        </button>
      </div>
    );
  },
};

export const Fireworks: Story = {
  render: () => (
    <ConfettiButton
      options={{
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        particleCount: 50,
        scalar: 1.2,
        shapes: ["star"],
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      }}
    >
      Fireworks ✨
    </ConfettiButton>
  ),
};
