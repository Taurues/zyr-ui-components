import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";
import { message, Image } from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import "../../style/icon.less";

export interface ZyrUploadProps {
  /**
   * 是否支持粘贴上传
   */
  isPaste?: boolean;
  /**
   * 最大可上传图片大小(单位：M)
   */
  maxSize?: number;
  /**
   * 可上传文件类型
   */
  accept?: string;
  /**
   * 上传地址
   */
  action?: string;
  /**
   * 上传前文件校验
   */
  beforeUpload: (file: File) => boolean | Promise<void> | void;
  /**
   * 删除已上传的文件
   */
  onRemove: (file: UploadFile) => void | boolean | Promise<void | boolean>;
  /**
   * 上传成功回调
   */
  onSuccess: (response: any, file: UploadFile) => void;
  /**
   * 上传失败回调
   */
  onError: (error: any, file: UploadFile) => void;
  /**
   * 上传进度回调
   */
  onProgress: (event: { percent: number }, file: UploadFile) => void;
  /**
   * 上传文件改变
   */
  onChange: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
}

const bem = createNamespace("upload");

/**
 * 没有传action 手动处理上传
 */

const defaultMap = {
  pdf: "",
  word: "",
  doc: "",
  docx: "",
  xls: "",
  xlsx: "",
  xlt: "",
  excel: "",
  bmp: "",
  dwg: "",
};

const ZyrUpload = ({
  isPaste = true,
  maxSize = 10,
  accept,
  action,
  beforeUpload,
  onRemove,
  onSuccess,
  onError,
  onProgress,
  onChange,
  ...props
}: ZyrUploadProps) => {
  const [fileList, setFileList] = useState<{ id: string; url: string }[]>([]);

  useEffect(() => {
    isPaste && addEventListener("paste", (event) => pasteEvent(event));
    return () => removeEventListener("paste", (event) => pasteEvent(event));
  }, []);
  // 监听粘贴事件
  const pasteEvent = (event) => {
    let formData = new FormData();
    let blob;
    if (!(event.clipboardData && event.clipboardData.items)) {
      return;
    }
    const items = event.clipboardData.items;
    for (let i = 0, len = items.length; i < len; i++) {
      let itemz = items[i];
      if (itemz.kind === "file" && itemz.type.match(/^image\//i)) {
        blob = itemz.getAsFile();
        if (blob.size > maxSize * 1024 * 1024) {
          return message.error(`上传图片超过${maxSize}M大小限制，请重新上传`);
        }
        console.log("object :>> ", items);
      } else {
        return message.error("请先截图后粘贴");
      }
    }
  };

  const changeHandle = (e) => {
    const files = e.target.files;

    uploadFile(files);
  };

  const uploadFile = (files) => {
    console.log("files :>> ", files);
    const formData = new FormData();
    formData.append("id", uuidv4());
    formData.append("file", files[0]);
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res :>> ", res);
        setFileList([...fileList, res.data]);
      })
      .catch(() => {
        message.error("upload failed.");
      });
    // .finally(() => {
    //   setUploading(false);
    // });
  };

  const removeHandle = (idx: number) => {
    const ls = [...fileList];
    ls.splice(idx, 1);
    setFileList(ls);
  };

  const fileRef = useRef();

  return (
    <div className={bem.b()}>
      <div className={`${bem.b()}-list`}>
        {fileList.map((item, idx) => {
          return (
            <div key={item.id} className={`${bem.b()}-list-item`}>
              {/* 根据返回的文件类型区分 */}
              <Image
                src={item.url}
                width={80}
                height={80}
                style={{ marginRight: 10 }}
              />
              <i
                className={cn(
                  "iconfont",
                  "icon-guanbi",
                  `${bem.b()}-list-item-close`
                )}
                onClick={() => removeHandle(idx)}
              ></i>
            </div>
          );
        })}
      </div>
      <label htmlFor="fileInput" className={`${bem.b()}-uploading`}>
        <PlusOutlined style={{ fontSize: 20 }} />
        <input
          className={bem.e("input")}
          type="file"
          ref={fileRef}
          id="fileInput"
          onChange={changeHandle}
          accept={accept}
          // multiple={defaultProps.multiple}
        />
        <span>本地上传</span>
        {isPaste && <div className={bem.e("paste")}>粘贴图片</div>}
      </label>
    </div>
  );
};

export default ZyrUpload;
