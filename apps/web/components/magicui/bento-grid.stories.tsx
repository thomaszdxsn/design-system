import { CalendarIcon, FileTextIcon, GlobeIcon, InputIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { BentoCard, BentoGrid } from "./bento-grid";

const meta: Meta<typeof BentoGrid> = {
  title: "Magic UI/Layout/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
];

export const Default: Story = {
  render: () => (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <BentoGrid className="grid-cols-2 lg:grid-cols-2">
      {features.slice(0, 2).map((feature) => (
        <BentoCard key={feature.name} {...feature} className="col-span-1" />
      ))}
    </BentoGrid>
  ),
};

export const SingleCard: Story = {
  render: () => (
    <BentoGrid className="grid-cols-1 max-w-md">
      <BentoCard {...features[0]} className="col-span-1" />
    </BentoGrid>
  ),
};
