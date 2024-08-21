import CountDown from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/CountDown",
  component: CountDown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "color" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CountDown>;

export default meta;

type Story = StoryObj<typeof meta>;

// 组件案例展示
export const BaseCountDown: Story = {
  args: {
    temp: 1000 * 60 * 60 * 12,
    type: "s",
    prefixText: "还剩",
    onEnd: () => {
      console.log("倒计时结束");
    },
  },
};
