import ZyrCountDown from "./index";
import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/ZyrCountDown",
  component: ZyrCountDown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "color" },
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof ZyrCountDown>;

export default meta;

type Story = StoryObj<typeof meta>;

// 基础倒计时
export const BaseCountDown: Story = {
  args: {
    value: 1000 * 60 * 60 * 12,
    prefixText: "还剩",
    color: "orange",
    format: "HH:mm:ss",
  },
};

// 自定义展示
export const CustomerCountDown: Story = {
  args: {
    value: 1000 * 60 * 60 * 12,
    prefixText: "还剩",
    children: ({ days, hours, minutes, seconds }) => (
      <div>
        <span style={{ color: "red" }}>{days}</span>天
        <span style={{ color: "red" }}>{hours}</span>小时
        <span style={{ color: "red" }}>{minutes}</span>分钟
        <span style={{ color: "red" }}>{seconds}</span>秒
      </div>
    ),
  },
};
