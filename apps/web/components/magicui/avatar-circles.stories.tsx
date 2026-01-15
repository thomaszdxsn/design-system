import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCircles } from "./avatar-circles";

const meta: Meta<typeof AvatarCircles> = {
  title: "Magic UI/Social & Media/AvatarCircles",
  component: AvatarCircles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AvatarCircles>;

const sampleAvatars = [
  {
    imageUrl: "https://via.placeholder.com/40x40/3b82f6/ffffff?text=A",
    profileUrl: "https://example.com/user1",
  },
  {
    imageUrl: "https://via.placeholder.com/40x40/ef4444/ffffff?text=B",
    profileUrl: "https://example.com/user2",
  },
  {
    imageUrl: "https://via.placeholder.com/40x40/10b981/ffffff?text=C",
    profileUrl: "https://example.com/user3",
  },
  {
    imageUrl: "https://via.placeholder.com/40x40/f59e0b/ffffff?text=D",
    profileUrl: "https://example.com/user4",
  },
];

const moreAvatars = [
  ...sampleAvatars,
  {
    imageUrl: "https://via.placeholder.com/40x40/8b5cf6/ffffff?text=E",
    profileUrl: "https://example.com/user5",
  },
  {
    imageUrl: "https://via.placeholder.com/40x40/ec4899/ffffff?text=F",
    profileUrl: "https://example.com/user6",
  },
];

export const Default: Story = {
  args: {
    avatarUrls: sampleAvatars,
  },
};

export const WithExtraCount: Story = {
  args: {
    avatarUrls: sampleAvatars,
    numPeople: 5,
  },
};

export const LargeGroup: Story = {
  args: {
    avatarUrls: moreAvatars,
    numPeople: 12,
  },
};

export const SmallGroup: Story = {
  args: {
    avatarUrls: sampleAvatars.slice(0, 2),
  },
};

export const SingleAvatar: Story = {
  args: {
    avatarUrls: [sampleAvatars[0]],
  },
};

export const CustomStyling: Story = {
  args: {
    avatarUrls: sampleAvatars,
    numPeople: 3,
    className: "scale-125",
  },
};

const TeamShowcaseStory = () => {
  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">Our Team</h3>
        <p className="text-muted-foreground mb-4">Meet the amazing people behind our product</p>
        <AvatarCircles avatarUrls={moreAvatars} numPeople={25} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Contributors</h3>
        <p className="text-muted-foreground mb-4">Latest contributors to our open source project</p>
        <AvatarCircles avatarUrls={sampleAvatars.slice(0, 3)} numPeople={8} />
      </div>
    </div>
  );
};

export const TeamShowcase: Story = {
  render: () => <TeamShowcaseStory />,
};
