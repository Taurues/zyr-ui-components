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
        fixed: "left",
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
        render: (val, record, index) => {
          return (
            <div style={{ color: "red" }}>
              <div>render字段值：{val}</div>
              <div>name3的值：{record?.name3}</div>
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
      { name1: "111", name2: "222", name3: "333", name4: "444" },
    ],
    pagination: false,
  },
};

/**
 * 固定列: fix定位只对表头和表格列生效，extraColumn中的内容不受fix属性控制，如果需要固定extraColumn中的内容，需要在dom自行处理样式，下面这个例子就是在extraColumn中固定定位
 */
export const FixedTable: Story = {
  args: {
    column: {
      name1: {
        key: "name1",
        title: "第1列",
        fixed: "left",
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
      },
      name5: {
        key: "name5",
        title: "第5列",
      },
      name6: {
        key: "name6",
        title: "第6列",
      },
      name7: {
        key: "name7",
        title: "第7列",
      },
      name8: {
        key: "name8",
        title: "第8列",
        fixed: "right",
        headerStyle: { background: "pink" },
        cellStyle: { background: "pink" },
      },
    },
    extraColumn: (val) => {
      return (
        <div
          style={{
            color: "green",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>name1字段值：{val.name1}</div>
          <div style={{ position: "sticky", right: 10 }}>
            <SettingOutlined />
          </div>
        </div>
      );
    },
    dataSource: [
      {
        name1: "1",
        name2: "2",
        name3: "3",
        name4: "4",
        name5: "11",
        name6: "22",
        name7: "33",
        name8: "44",
      },
    ],
    pagination: false,
  },
  render: (args) => {
    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <ZyrTable {...args} />
      </div>
    );
  },
};

/**
 * 可选择列表
 */
export const SelectTable: Story = {
  args: {
    column: {
      name1: {
        key: "name1",
        title: "第1列",
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
        render: (val, record, index) => {
          return (
            <div style={{ color: "red" }}>
              <div>render字段值：{val}</div>
              <div>name3的值：{record?.name3}</div>
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
      { name1: "1", name2: "2", name3: "3", name4: "4", id: "1" },
      { name1: "11", name2: "22", name3: "33", name4: "44", id: "2" },
      { name1: "111", name2: "222", name3: "333", name4: "444", id: "3" },
    ],
    rowKey: "id",
    pagination: false,
    rowSelection: {
      selectedRowKeys: [],
      // allSelectText: "全选",
    },
  },
};
