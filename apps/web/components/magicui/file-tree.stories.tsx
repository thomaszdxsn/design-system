import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CollapseButton, File, Folder, Tree, type TreeViewElement } from "./file-tree";

const meta: Meta<typeof Tree> = {
  title: "Magic UI/Utilities/FileTree",
  component: Tree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tree>;

// Sample file tree data
const sampleElements: TreeViewElement[] = [
  {
    id: "1",
    name: "src",
    children: [
      {
        id: "2",
        name: "components",
        children: [
          {
            id: "3",
            name: "ui",
            children: [
              { id: "4", name: "button.tsx" },
              { id: "5", name: "input.tsx" },
              { id: "6", name: "card.tsx" },
            ],
          },
          {
            id: "7",
            name: "magicui",
            children: [
              { id: "8", name: "file-tree.tsx" },
              { id: "9", name: "animated-beam.tsx" },
              { id: "10", name: "particles.tsx" },
            ],
          },
        ],
      },
      {
        id: "11",
        name: "lib",
        children: [
          { id: "12", name: "utils.ts" },
          { id: "13", name: "cn.ts" },
        ],
      },
      { id: "14", name: "app.tsx" },
      { id: "15", name: "main.tsx" },
    ],
  },
  {
    id: "16",
    name: "public",
    children: [
      { id: "17", name: "favicon.ico" },
      { id: "18", name: "logo.svg" },
    ],
  },
  { id: "19", name: "package.json" },
  { id: "20", name: "tsconfig.json" },
  { id: "21", name: "README.md" },
];

const projectStructure: TreeViewElement[] = [
  {
    id: "root",
    name: "design-system",
    children: [
      {
        id: "apps",
        name: "apps",
        children: [
          {
            id: "web",
            name: "web",
            children: [
              {
                id: "components",
                name: "components",
                children: [
                  {
                    id: "ui-folder",
                    name: "ui",
                    children: [
                      { id: "button-file", name: "button.tsx" },
                      { id: "input-file", name: "input.tsx" },
                    ],
                  },
                  {
                    id: "magicui-folder",
                    name: "magicui",
                    children: [
                      { id: "file-tree-file", name: "file-tree.tsx" },
                      { id: "particles-file", name: "particles.tsx" },
                    ],
                  },
                ],
              },
              { id: "package-json", name: "package.json" },
            ],
          },
        ],
      },
      {
        id: "packages",
        name: "packages",
        children: [
          {
            id: "config",
            name: "config",
            children: [{ id: "tailwind-config", name: "tailwind.config.js" }],
          },
          { id: "utils", name: "utils", children: [{ id: "cn-file", name: "cn.ts" }] },
        ],
      },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div className="w-80 h-96 border rounded-lg">
      <Tree elements={sampleElements} className="p-2">
        {sampleElements.map((element) => (
          <Folder key={element.id} element={element.name} value={element.id}>
            {element.children?.map((child) =>
              child.children ? (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children.map((grandChild) => (
                    <File key={grandChild.id} value={grandChild.id}>
                      {grandChild.name}
                    </File>
                  ))}
                </Folder>
              ) : (
                <File key={child.id} value={child.id}>
                  {child.name}
                </File>
              ),
            )}
          </Folder>
        ))}
      </Tree>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  render: () => (
    <div className="w-80 h-96 border rounded-lg">
      <Tree
        elements={sampleElements}
        className="p-2"
        openIcon={<ChevronDown className="size-4" />}
        closeIcon={<ChevronRight className="size-4" />}
      >
        {sampleElements.map((element) => (
          <Folder key={element.id} element={element.name} value={element.id}>
            {element.children?.map((child) =>
              child.children ? (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children.map((grandChild) => (
                    <File key={grandChild.id} value={grandChild.id}>
                      {grandChild.name}
                    </File>
                  ))}
                </Folder>
              ) : (
                <File key={child.id} value={child.id}>
                  {child.name}
                </File>
              ),
            )}
          </Folder>
        ))}
      </Tree>
    </div>
  ),
};

export const WithCollapseButton: Story = {
  render: () => (
    <div className="w-80 h-96 border rounded-lg relative">
      <Tree elements={projectStructure} className="p-2">
        {projectStructure.map((element) => (
          <Folder key={element.id} element={element.name} value={element.id}>
            {element.children?.map((child) =>
              child.children ? (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children.map((grandChild) =>
                    grandChild.children ? (
                      <Folder key={grandChild.id} element={grandChild.name} value={grandChild.id}>
                        {grandChild.children.map((greatGrandChild) => (
                          <File key={greatGrandChild.id} value={greatGrandChild.id}>
                            {greatGrandChild.name}
                          </File>
                        ))}
                      </Folder>
                    ) : (
                      <File key={grandChild.id} value={grandChild.id}>
                        {grandChild.name}
                      </File>
                    ),
                  )}
                </Folder>
              ) : (
                <File key={child.id} value={child.id}>
                  {child.name}
                </File>
              ),
            )}
          </Folder>
        ))}
      </Tree>
      <CollapseButton elements={projectStructure}>Toggle All</CollapseButton>
    </div>
  ),
};

export const WithInitialSelection: Story = {
  render: () => (
    <div className="w-80 h-96 border rounded-lg">
      <Tree
        elements={sampleElements}
        className="p-2"
        initialSelectedId="4"
        initialExpandedItems={["1", "2", "3"]}
      >
        {sampleElements.map((element) => (
          <Folder key={element.id} element={element.name} value={element.id}>
            {element.children?.map((child) =>
              child.children ? (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children.map((grandChild) => (
                    <File key={grandChild.id} value={grandChild.id}>
                      {grandChild.name}
                    </File>
                  ))}
                </Folder>
              ) : (
                <File key={child.id} value={child.id}>
                  {child.name}
                </File>
              ),
            )}
          </Folder>
        ))}
      </Tree>
    </div>
  ),
};

export const NoIndicator: Story = {
  render: () => (
    <div className="w-80 h-96 border rounded-lg">
      <Tree elements={sampleElements} className="p-2" indicator={false}>
        {sampleElements.map((element) => (
          <Folder key={element.id} element={element.name} value={element.id}>
            {element.children?.map((child) =>
              child.children ? (
                <Folder key={child.id} element={child.name} value={child.id}>
                  {child.children.map((grandChild) => (
                    <File key={grandChild.id} value={grandChild.id}>
                      {grandChild.name}
                    </File>
                  ))}
                </Folder>
              ) : (
                <File key={child.id} value={child.id}>
                  {child.name}
                </File>
              ),
            )}
          </Folder>
        ))}
      </Tree>
    </div>
  ),
};
