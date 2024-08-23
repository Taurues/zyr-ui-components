/*
 * @Author: zhangyanru zhangyanru@wshifu.com
 * @Date: 2024-08-21 15:49:08
 * @LastEditors: zhangyanru zhangyanru@wshifu.com
 * @LastEditTime: 2024-08-22 18:17:43
 * @FilePath: /zyr-ui-components/src/CountDown/index.stories.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CountDown from "./index";
import React from "react";

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

// 基础倒计时
export const BaseCountDown: Story = {
  args: {
    value: 1000 * 60 * 60 * 12,
    prefixText: "还剩",
    color: "orange",
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
