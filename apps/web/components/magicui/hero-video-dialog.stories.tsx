import type { Meta, StoryObj } from "@storybook/react";
import { HeroVideoDialog } from "./hero-video-dialog";

const meta: Meta<typeof HeroVideoDialog> = {
  title: "Magic UI/Social & Media/HeroVideoDialog",
  component: HeroVideoDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HeroVideoDialog>;

const sampleThumbnail =
  "https://via.placeholder.com/800x450/6366f1/ffffff?text=Click+to+Play+Video";
const sampleVideoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export const Default: Story = {
  args: {
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Sample video thumbnail",
  },
};

export const FromBottom: Story = {
  args: {
    animationStyle: "from-bottom",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with bottom animation",
  },
};

export const FromTop: Story = {
  args: {
    animationStyle: "from-top",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with top animation",
  },
};

export const FromLeft: Story = {
  args: {
    animationStyle: "from-left",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with left animation",
  },
};

export const FromRight: Story = {
  args: {
    animationStyle: "from-right",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with right animation",
  },
};

export const Fade: Story = {
  args: {
    animationStyle: "fade",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with fade animation",
  },
};

export const TopInBottomOut: Story = {
  args: {
    animationStyle: "top-in-bottom-out",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with top-in-bottom-out animation",
  },
};

export const LeftInRightOut: Story = {
  args: {
    animationStyle: "left-in-right-out",
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Video with left-in-right-out animation",
  },
};

export const CustomStyling: Story = {
  args: {
    videoSrc: sampleVideoSrc,
    thumbnailSrc: sampleThumbnail,
    thumbnailAlt: "Custom styled video",
    className: "max-w-md",
  },
};

const ProductDemoStory = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Product Demo</h2>
        <p className="text-muted-foreground mb-4">Watch our product in action</p>
      </div>
      <HeroVideoDialog
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
        thumbnailSrc="https://via.placeholder.com/600x338/3b82f6/ffffff?text=Product+Demo"
        thumbnailAlt="Product demo video"
        animationStyle="from-center"
        className="max-w-2xl"
      />
    </div>
  );
};

export const ProductDemo: Story = {
  render: () => <ProductDemoStory />,
};
