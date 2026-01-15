import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./terminal";

const meta: Meta<typeof Terminal> = {
  title: "Magic UI/Layout/Terminal",
  component: Terminal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    sequence: {
      control: "boolean",
      description: "Whether to animate children in sequence",
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when in view",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Default: Story = {
  render: () => (
    <Terminal>
      <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Preflight checks.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Verifying framework. Found Next.js.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-green-500">
        <span>✔ Validating Tailwind CSS.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={3000} className="text-green-500">
        <span>✔ Validating import alias.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={3500} className="text-green-500">
        <span>✔ Writing components.json.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ Checking registry.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={4500} className="text-green-500">
        <span>✔ Updating tailwind.config.ts</span>
      </AnimatedSpan>
      <AnimatedSpan delay={5000} className="text-green-500">
        <span>✔ Updating app/globals.css</span>
      </AnimatedSpan>
      <AnimatedSpan delay={5500} className="text-green-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={6000} className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>
      <TypingAnimation delay={6500} className="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>
      <TypingAnimation delay={7500} className="text-muted-foreground">
        You may now add components.
      </TypingAnimation>
    </Terminal>
  ),
};

export const NpmInstall: Story = {
  render: () => (
    <Terminal>
      <TypingAnimation>&gt; npm install react</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-muted-foreground">
        <span>added 6 packages in 2s</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Installation complete!</span>
      </AnimatedSpan>
    </Terminal>
  ),
};

export const GitCommands: Story = {
  render: () => (
    <Terminal>
      <TypingAnimation>&gt; git status</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-muted-foreground">
        <span>On branch main</span>
        <span>Your branch is up to date with &apos;origin/main&apos;.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-green-500">
        <span>nothing to commit, working tree clean</span>
      </AnimatedSpan>
    </Terminal>
  ),
};

export const NoSequence: Story = {
  render: () => (
    <Terminal sequence={false}>
      <AnimatedSpan className="text-green-500">
        <span>✔ All items appear at once</span>
      </AnimatedSpan>
      <AnimatedSpan className="text-blue-500">
        <span>ℹ No sequential animation</span>
      </AnimatedSpan>
      <AnimatedSpan className="text-yellow-500">
        <span>⚠ Useful for static content</span>
      </AnimatedSpan>
    </Terminal>
  ),
};
