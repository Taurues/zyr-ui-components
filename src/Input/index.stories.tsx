import type { Meta, StoryObj } from "@storybook/react";

import Input from "./index";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 组件案例展示
export const BaseInput: Story = {
  args: {
    placeholder: "基于antd的输入框",
  },
};
