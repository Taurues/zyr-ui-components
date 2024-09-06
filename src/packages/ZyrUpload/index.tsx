import "./index.less";
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { createNamespace } from "../../utils/createBEM";
import { Button, message, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { PlusOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import "../../style/icon.less";
import axios from "axios";
import { UploadRequestOption } from "../../types/upload";

export type UploadRequestMethod =
  | "POST"
  | "PUT"
  | "PATCH"
  | "post"
  | "put"
  | "patch";

export interface ZyrUploadProps {
  /**
   * 上传接口url
   */
  action?: string;
  /**
   * 最大可上传单个图片、文件大小(单位：M)
   */
  maxSize?: number;
  /**
   * 最大可上传文件数 大于或等于maxCount，将隐藏上传按钮
   */
  maxCount?: number;
  /**
   * 可上传文件类型
   */
  accept?: string;
  /**
   * 是否支持同时上传多个文件
   */
  multiple?: boolean;
  /**
   * 是否支持上传文件夹
   */
  directory?: boolean;
  /**
   * 是否支持拖拽上传
   */
  isDrag?: boolean;
  /**
   * 是否支持粘贴上传
   */
  isPaste?: boolean;
  /**
   * 上传所需额外参数或返回上传额外参数的方法
   */
  data: { [key: string]: string };
  /**
   *设置上传的请求头部，IE10 以上有效
   */
  headers: { [key: string]: string };
  /**
   * http 请求方法
   */
  method?: UploadRequestMethod;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   *上传列表的内建样式，支持三种基本样式
   */
  listType: "text" | "picture" | "picture-card";
  /**
   *已经上传的文件列表
   */
  fileList?: [];
  /**
   * 通过覆盖默认的上传行为，可以自定义自己的上传实现
   */
  customRequest?: (option: UploadRequestOption) => void;
  /**
   *是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon, showDownloadIcon, removeIcon 和 downloadIcon
   */
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
        previewIcon?: ReactNode | ((file: UploadFile) => ReactNode);
        removeIcon?: ReactNode | ((file: UploadFile) => ReactNode);
        downloadIcon?: ReactNode | ((file: UploadFile) => ReactNode);
      };
  /**
   * 上传文件前触发事件
   */
  beforeUpload?: (file: File) => boolean | Promise<void> | void;
  /**
   * 删除已上传的文件
   */
  onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>;
  /**
   * 上传文件改变
   */
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  /**
   *自定义内容
   */
  children?: ReactNode;
}

const bem = createNamespace("upload");

const ZyrUpload = ({
  maxSize = 10,
  maxCount = 10,
  accept,
  multiple = false,
  directory = false,
  listType,
  isDrag = false,
  isPaste = false,
  fileList = [],
  action,
  data,
  method = "post",
  headers,
  customRequest,
  disabled = false,
  showUploadList,
  beforeUpload,
  onRemove,
  onChange,
  children,
}: ZyrUploadProps & UploadProps) => {
  const ref = useRef();
  const [list, setList] = useState<UploadFile[]>(fileList);
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      pasteEvent(event);
    };

    isPaste && addEventListener("paste", handlePaste);

    // 清理事件监听器
    return () => {
      removeEventListener("paste", handlePaste);
    };
  }, [list, isPaste]);

  // file类型格式
  const getFileObj = (file: UploadFile) => {
    return {
      uid: file.uid,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath,
    };
  };

  // 上传前校验
  const beforeUploadHandle = (file) => {
    const defaultBeforeUpload = (file) => {
      if (file.size > maxSize * 1024 * 1024) {
        message.error(`文件大小不能超过${maxSize}M`);
        return Upload.LIST_IGNORE;
      }
      return true;
    };
    return beforeUpload ? beforeUpload(file) : defaultBeforeUpload(file);
  };

  // 监听粘贴事件
  const pasteEvent = (event) => {
    let blob;
    if (!(event.clipboardData && event.clipboardData.items)) {
      return;
    }
    const items = event.clipboardData.items;
    for (let i = 0, len = items.length; i < len; i++) {
      let itemz = items[i];
      if (itemz.kind === "file" && itemz.type.match(/^image\//i)) {
        itemz.uid = `rc-upload-${new Date().getTime()}`;
        blob = itemz.getAsFile();
        if (beforeUploadHandle(blob) === true) {
          Object.defineProperty(blob, "uid", {
            value: `rc-upload-${new Date().getTime()}`,
            writable: false,
          });
          uploadFile({
            action,
            file: blob,
            filename: blob.name,
            data,
            onUploadProgress: ({ percent }, file) => {
              const f = { ...file, originFileObj: blob };
              const fs = updateFileList(
                { ...file, response: data, originFileObj: blob },
                list
              );
              changeHandle({
                file: { ...file, originFileObj: blob },
                fileList: updateFileList(
                  { ...file, response: data, originFileObj: blob },
                  list
                ),
              });
            },
            onSuccess: async (data, file) => {
              changeHandle({
                file: { ...file, originFileObj: blob },
                fileList: updateFileList(
                  { ...file, response: data, originFileObj: blob },
                  list
                ),
              });
            },
            onError: (err, file) => {
              changeHandle({
                file: { ...file, originFileObj: blob },
                fileList: updateFileList(
                  { ...file, response: data, originFileObj: blob },
                  list
                ),
              });
            },
          });
        }
      } else {
        return message.error("请先截图后粘贴");
      }
    }
  };
  // 更新list
  const updateFileList = (
    file: UploadFile,
    filesList: (UploadFile | Readonly<UploadFile>)[]
  ) => {
    const nextFileList = [...filesList];
    const fileIndex = nextFileList.findIndex(({ uid }) => uid === file.uid);
    if (fileIndex === -1) {
      nextFileList.push(file);
    } else {
      nextFileList[fileIndex] = file;
    }
    return nextFileList;
  };
  // 为了兼容剪贴事件，重写上传方法作为默认上传方法
  const uploadFile = (option) => {
    const formData = new FormData();
    if (option.data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key] as string);
      });
    }
    formData.append("file", option.file);
    axios({
      method: method,
      url: action,
      data: formData,
      headers: headers ? { ...headers } : {},
      onUploadProgress: (res) => {
        const { total, loaded } = res;
        const number = Number(Math.round((loaded / total) * 100).toFixed(2));
        const targetFile = {
          ...getFileObj(option.file),
          percent: number,
          status: "uploading",
        };
        option.onUploadProgress &&
          option.onUploadProgress(
            {
              percent: number,
            },
            targetFile
          );
      },
    })
      .then((res) => {
        const { data } = res.data;
        const tragetFile = {
          ...getFileObj(option.file),
          status: "done",
          precent: 100,
        };
        option.onSuccess && option.onSuccess(data, tragetFile);
      })
      .catch((err) => {
        const targetFile = {
          ...getFileObj(option.file),
          status: "error",
          precent: 0,
        };
        option.onError(err, targetFile);
      });

    return {
      abort() {
        console.log("upload progress is aborted.");
      },
    };
  };

  // 拖拽默认展示样式
  const defaultDragRender = (
    <>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">文件拖入/点击/粘贴上传</p>
    </>
  );

  // 默认上传按钮样式
  const defaultRender = children ? (
    children
  ) : listType !== "picture-card" ? (
    <Button icon={<UploadOutlined />}>点击上传</Button>
  ) : (
    <div className={`${bem.b()}-picture`}>
      <PlusOutlined />
      <span>点击上传</span>
    </div>
  );
  const removeHandle = (file) => {
    const ls = list.filter((t) => t.uid !== file.uid);
    setList(ls);
    onRemove && onRemove(file);
  };

  const changeHandle = ({ file, fileList }) => {
    setList(fileList);
    onChange && onChange({ file, fileList });
  };

  const defaultProps = {
    maxCount,
    accept,
    multiple,
    directory,
    disabled,
    listType,
    fileList,
    showUploadList,
  };

  return isDrag ? (
    <Upload.Dragger
      {...defaultProps}
      fileList={list}
      customRequest={customRequest || uploadFile}
      beforeUpload={beforeUploadHandle}
      onRemove={removeHandle}
      onChange={changeHandle}
    >
      {children ? children : defaultDragRender}
    </Upload.Dragger>
  ) : (
    <Upload
      {...defaultProps}
      fileList={list}
      customRequest={customRequest || uploadFile}
      beforeUpload={beforeUploadHandle}
      onRemove={removeHandle}
      onChange={changeHandle}
    >
      {list.length >= maxCount ? "" : defaultRender}
    </Upload>
  );
};

export default ZyrUpload;
