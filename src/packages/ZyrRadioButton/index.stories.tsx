import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ZyrRadioButton from "./index";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Form } from "antd";

const meta: Meta<typeof ZyrRadioButton> = {
  title: "Form/ZyrRadioButton",
  component: ZyrRadioButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本使用
 */
export const DefaultRadioBtn: Story = {
  args: {
    list: Array.from({ length: 15 }, (_, i) => ({
      label: `选项${i}`,
      value: i,
      disabled: i % 2 === 1,
    })),
  },
};

/**
 * 超过一行展示展开/收起按钮
 */
export const ShowMoreRadioBtn: Story = {
  args: {
    list: Array.from({ length: 30 }, (_, i) => ({
      label: `选项${i}`,
      value: i,
    })),
    showMore: true,
  },
};

/**
 * 自定义展开收起按钮
 */
export const customerShowMoreBtn: Story = {
  args: {
    list: Array.from({ length: 30 }, (_, i) => ({
      label: `选项${i}`,
      value: i,
    })),
    showMore: true,
    showMoreDomRender: (value) => {
      return <div>{value ? <UpOutlined /> : <DownOutlined />}</div>;
    },
  },
};

/**
 * 在form表单中使用
 */
export const FormBtn: Story = {
  args: {
    list: Array.from({ length: 4 }, (_, i) => ({
      label: `选项${i}`,
      value: i,
    })),
  },
  render: (args) => {
    return (
      <Form>
        <Form.Item label="label" required name="radio">
          <ZyrRadioButton {...args} />
        </Form.Item>
      </Form>
    );
  },
};
