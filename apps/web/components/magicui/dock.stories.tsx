import {
  CalendarIcon,
  EnvelopeClosedIcon,
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Dock, DockIcon } from "./dock";

const meta: Meta<typeof Dock> = {
  title: "Magic UI/Layout/Dock",
  component: Dock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconSize: {
      control: { type: "number", min: 20, max: 80 },
      description: "Base size of icons",
    },
    iconMagnification: {
      control: { type: "number", min: 40, max: 120 },
      description: "Size of icons when magnified",
    },
    iconDistance: {
      control: { type: "number", min: 50, max: 200 },
      description: "Distance for magnification effect",
    },
    direction: {
      control: "select",
      options: ["top", "middle", "bottom"],
      description: "Alignment direction of icons",
    },
    disableMagnification: {
      control: "boolean",
      description: "Disable magnification effect",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dock>;

const icons = [
  { icon: HomeIcon, label: "Home" },
  { icon: MagnifyingGlassIcon, label: "Search" },
  { icon: EnvelopeClosedIcon, label: "Mail" },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: GearIcon, label: "Settings" },
  { icon: PersonIcon, label: "Profile" },
];

export const Default: Story = {
  render: () => (
    <Dock>
      {icons.map((item) => (
        <DockIcon key={item.label}>
          <item.icon className="size-full" />
        </DockIcon>
      ))}
    </Dock>
  ),
};

export const LargeIcons: Story = {
  render: () => (
    <Dock iconSize={50} iconMagnification={80}>
      {icons.map((item) => (
        <DockIcon key={item.label}>
          <item.icon className="size-full" />
        </DockIcon>
      ))}
    </Dock>
  ),
};

export const NoMagnification: Story = {
  render: () => (
    <Dock disableMagnification>
      {icons.map((item) => (
        <DockIcon key={item.label}>
          <item.icon className="size-full" />
        </DockIcon>
      ))}
    </Dock>
  ),
};

export const TopAligned: Story = {
  render: () => (
    <Dock direction="top">
      {icons.map((item) => (
        <DockIcon key={item.label}>
          <item.icon className="size-full" />
        </DockIcon>
      ))}
    </Dock>
  ),
};

export const BottomAligned: Story = {
  render: () => (
    <Dock direction="bottom">
      {icons.map((item) => (
        <DockIcon key={item.label}>
          <item.icon className="size-full" />
        </DockIcon>
      ))}
    </Dock>
  ),
};
