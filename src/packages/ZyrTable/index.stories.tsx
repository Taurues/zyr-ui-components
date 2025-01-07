import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrTable from "./index";
import { SettingOutlined } from "@ant-design/icons";

const meta: Meta<typeof ZyrTable> = {
  title: "Show/ZyrTable",
  component: ZyrTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本使用
 */
export const DefaultTable: Story = {
  args: {
    column: {
      name1: {
        key: "name1",
        title: (
          <div>
            第1列
            <SettingOutlined style={{ color: "red" }} />
          </div>
        ),
      },
      name2: {
        key: "name2",
        title: "第2列",
      },
      name3: {
        key: "name3",
        title: "第3列",
      },
      name4: {
        key: "name4",
        title: "第4列",
        render: (val, item, index) => {
          return (
            <div style={{ color: "red" }}>
              <div>render字段值：{val}</div>
              <div>name3的值：{item.name3}</div>
              <div> 索引：{index}</div>
            </div>
          );
        },
      },
    },
    extraColumn: (val) => {
      return <div style={{ color: "green" }}>name1字段值：{val.name1}</div>;
    },
    dataSource: [
      { name1: "1", name2: "2", name3: "3", name4: "4" },
      { name1: "11", name2: "22", name3: "33", name4: "44" },
    ],
  },
};
