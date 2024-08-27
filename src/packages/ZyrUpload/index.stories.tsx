import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrUpload from "./index";

const meta: Meta<typeof ZyrUpload> = {
  title: "Example/ZyrUpload",
  component: ZyrUpload,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isPaste: true,
  },
};
