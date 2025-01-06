import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrTable from "./index";

const meta: Meta<typeof ZyrTable> = {
  title: "Show/ZyrTable",
  component: ZyrTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
