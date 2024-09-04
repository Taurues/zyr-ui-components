import type { Meta, StoryObj } from "@storybook/react";
import ZyrUpload from "./index";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";

const meta: Meta<typeof ZyrUpload> = {
  title: "Example/ZyrUpload",
  component: ZyrUpload,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxCount: 5,
    maxSize: 1,
    accept: "image/*",
    multiple: false,
    directory: false,
    listType: "picture-card",
    isDrag: false,
    isPaste: true,
    disabled: false,
    action: "http://localhost:3000/upload",
    //'https://test-enterprise-dispatch-api.wanshifu.com/common/uploadFileBatch',
    data: {
      id: uuidv4(),
      //loginMemberId: '12344',
    },
    onRemove: (file) => {
      message.success("删除了");
    },
    onChange: ({ file, fileList }) => {
      console.log("上传文件改变了");
    },
  },
};

export const DraggerUpload: Story = {
  args: {
    maxCount: 5,
    maxSize: 1,
    // accept: 'image/*',
    multiple: false,
    directory: false,
    listType: "text",
    isDrag: true,
    isPaste: false,
    disabled: false,
    action: "http://localhost:3000/upload",
    data: {
      id: uuidv4(),
      //loginMemberId: '12344',
    },
    onRemove: (file) => {
      message.success("删除了");
    },
    onChange: ({ file, fileList }) => {
      console.log("上传文件改变了");
    },
  },
};
