/*
 * @Author: zhangyanru zhangyanru@wshifu.com
 * @Date: 2024-09-10 16:52:12
 * @LastEditors: zhangyanru zhangyanru@wshifu.com
 * @LastEditTime: 2025-01-06 11:43:05
 * @FilePath: /zyr-ui-components/src/packages/ZyrCount/index.stories.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrCount from "./index";

const meta: Meta<typeof ZyrCount> = {
  title: "Show/ZyrCount",
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
