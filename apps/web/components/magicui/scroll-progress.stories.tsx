import type { Meta, StoryObj } from "@storybook/react";
import { ScrollProgress } from "./scroll-progress";

const meta: Meta<typeof ScrollProgress> = {
  title: "Magic UI/Utilities/ScrollProgress",
  component: ScrollProgress,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollProgress>;

const ScrollableContent = () => (
  <div className="min-h-[200vh] p-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Scroll Progress Demo</h1>
      <p className="text-lg text-muted-foreground">
        Scroll down to see the progress bar at the top of the page fill up as you scroll.
      </p>

      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-2xl font-semibold">Section {i + 1}</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <p className="text-muted-foreground">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit.
          </p>
        </div>
      ))}

      <div className="text-center py-16">
        <h2 className="text-3xl font-bold">End of Content</h2>
        <p className="text-muted-foreground mt-4">The progress bar should be fully filled now!</p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress />
      <ScrollableContent />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <ScrollableContent />
    </div>
  ),
};

export const ThickProgress: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress className="h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600" />
      <ScrollableContent />
    </div>
  ),
};

export const BottomProgress: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress className="top-auto bottom-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
      <ScrollableContent />
    </div>
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress className="bg-gradient-to-r from-blue-500 to-purple-500" />
      <ScrollProgress className="top-auto bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500" />
      <ScrollableContent />
    </div>
  ),
};

const ShortContentDemo = () => (
  <div className="min-h-[50vh] p-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Short Content Demo</h1>
      <p className="text-lg text-muted-foreground">
        This content is shorter, so the progress bar will fill up more quickly.
      </p>

      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-2xl font-semibold">Section {i + 1}</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const ShortContent: Story = {
  render: () => (
    <div className="relative">
      <ScrollProgress />
      <ShortContentDemo />
    </div>
  ),
};
