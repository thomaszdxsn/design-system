import type { Meta, StoryObj } from "@storybook/react";
import { MagicTweet, TweetNotFound, TweetSkeleton } from "./tweet-card";

const meta: Meta<typeof MagicTweet> = {
  title: "Magic UI/Social & Media/TweetCard",
  component: MagicTweet,
  parameters: {
    layout: "centered",
  },
  // Skip test runner smoke tests - MagicTweet requires real react-tweet Tweet data structure
  tags: ["autodocs", "!test"],
};

export default meta;
type Story = StoryObj<typeof MagicTweet>;

// Mock tweet data for demonstration
const mockTweet = {
  id_str: "1234567890",
  text: "This is a sample tweet to demonstrate the TweetCard component! 🚀 #MagicUI #React",
  user: {
    id_str: "123456789",
    name: "Magic UI",
    screen_name: "magicui",
    profile_image_url_https: "https://via.placeholder.com/48x48/3b82f6/ffffff?text=MU",
    verified: true,
    is_blue_verified: false,
    url: "https://twitter.com/magicui",
  },
  created_at: "2024-01-15T10:30:00.000Z",
  entities: [
    {
      type: "text" as const,
      text: "This is a sample tweet to demonstrate the TweetCard component! 🚀 ",
    },
    {
      type: "hashtag" as const,
      text: "#MagicUI",
      href: "https://twitter.com/hashtag/MagicUI",
    },
    {
      type: "text" as const,
      text: " ",
    },
    {
      type: "hashtag" as const,
      text: "#React",
      href: "https://twitter.com/hashtag/React",
    },
  ],
  url: "https://twitter.com/magicui/status/1234567890",
  photos: undefined,
  video: undefined,
};

const mockTweetWithImage = {
  ...mockTweet,
  id_str: "1234567891",
  text: "Check out this amazing design! 🎨 #Design #UI",
  entities: [
    {
      type: "text" as const,
      text: "Check out this amazing design! 🎨 ",
    },
    {
      type: "hashtag" as const,
      text: "#Design",
      href: "https://twitter.com/hashtag/Design",
    },
    {
      type: "text" as const,
      text: " ",
    },
    {
      type: "hashtag" as const,
      text: "#UI",
      href: "https://twitter.com/hashtag/UI",
    },
  ],
  photos: [
    {
      url: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Sample+Image",
      width: 400,
      height: 300,
    },
  ],
};

const mockTweetWithMention = {
  ...mockTweet,
  id_str: "1234567892",
  text: "Thanks @reactjs for the amazing framework! 💙",
  entities: [
    {
      type: "text" as const,
      text: "Thanks ",
    },
    {
      type: "mention" as const,
      text: "@reactjs",
      href: "https://twitter.com/reactjs",
    },
    {
      type: "text" as const,
      text: " for the amazing framework! 💙",
    },
  ],
};

const mockLongTweet = {
  ...mockTweet,
  id_str: "1234567893",
  text: "This is a much longer tweet that demonstrates how the TweetCard component handles longer content. It should wrap nicely and maintain good readability even with extended text content that goes beyond the typical tweet length.",
  entities: [
    {
      type: "text" as const,
      text: "This is a much longer tweet that demonstrates how the TweetCard component handles longer content. It should wrap nicely and maintain good readability even with extended text content that goes beyond the typical tweet length.",
    },
  ],
};

export const Default: Story = {
  args: {
    tweet: mockTweet,
  },
};

export const WithImage: Story = {
  args: {
    tweet: mockTweetWithImage,
  },
};

export const WithMention: Story = {
  args: {
    tweet: mockTweetWithMention,
  },
};

export const LongTweet: Story = {
  args: {
    tweet: mockLongTweet,
  },
};

export const Skeleton: Story = {
  render: () => <TweetSkeleton />,
};

export const NotFound: Story = {
  render: () => <TweetNotFound />,
};

export const CustomStyling: Story = {
  args: {
    tweet: mockTweet,
    className: "border-2 border-blue-200 bg-blue-50/50",
  },
};
