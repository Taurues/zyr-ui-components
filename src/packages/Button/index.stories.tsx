/*
 * @Author: zhangyanru zhangyanru@wshifu.com
 * @Date: 2024-08-20 17:21:45
 * @LastEditors: zhangyanru zhangyanru@wshifu.com
 * @LastEditTime: 2024-08-22 17:43:36
 * @FilePath: /zyr-ui-components/src/Button/index.stories.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Button from "./index";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 组件案例展示
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
    children: <div>123</div>,
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
