import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrCount from "./index";

const meta: Meta<typeof ZyrCount> = {
  title: "Example/ZyrCount",
  component: ZyrCount,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 1,
    step: 1,
    unit: "元",
  },
};
