import "./index.less";
import React, { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

type ValueType = string | number | null | undefined;

export interface ZyrRadioButtonProps {
  /**
   * 绑定值
   */
  value?: ValueType;
  /**
   * 选项列表
   */
  list: { label: string; value: string | number; disabled?: boolean }[];
  /**
   * 是否默认选中第一项, 如果传入了value, 则以value为准
   */
  defaultChecked?: boolean;
  /**
   * 元素集合超过一行是否展示收起/展开按钮
   */
  showMore?: boolean;
  /**
   * 展开/收起按钮的初始状态
   */
  showMoreDefaultStatus?: boolean;
  /**
   * 自定义展开收起按钮
   */
  showMoreDomRender?: (value: boolean) => React.ReactNode | React.ReactNode;
  /**
   * onChange事件
   */
  onChange?: (value: string | number) => void;
  /**
   * 展开收起事件
   */
  onExpend?: (expended: boolean) => void;
}

const bem = createNamespace("radiobutton");
const ZyrRadioButton = ({
  list,
  value,
  defaultChecked = true,
  showMore = false,
  showMoreDefaultStatus = false,
  showMoreDomRender,
  onChange,
  onExpend,
}: ZyrRadioButtonProps) => {
  const initVal = value || (defaultChecked ? list[0].value : undefined);

  const [val, setVal] = useState<string | number | undefined>(initVal);
  const itemRefs = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // 展开收起状态
  const [expended, setExpended] = useState(showMoreDefaultStatus);
  // 超过一行展示按钮
  const [showBtn, setShowBtn] = useState(false);
  // 每一个item的高度
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    onChange && onChange(val);
  }, [val]);

  // 展开按钮渲染
  const showMoreBtnRender = useMemo(() => {
    if (typeof showMoreDomRender === "function") {
      return showMoreDomRender(expended);
    }
    return showMoreDomRender ? (
      showMoreDomRender
    ) : (
      <>
        <span>{expended ? "收起" : "展开"}</span>
        {expended ? <UpOutlined /> : <DownOutlined />}
      </>
    );
  }, [expended, showMoreDomRender]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (container) {
        const clientWidth = container.clientWidth;
        let itemWidth = 0;
        setItemHeight(itemRefs.current[0]?.clientHeight);
        itemRefs.current.forEach((item) => {
          itemWidth += item?.clientWidth;
        });
        setShowBtn(itemWidth + itemRefs.current.length * 30 > clientWidth);
      }
    });
  }, [list]);

  return (
    <div
      className={cn(bem.b())}
      ref={containerRef}
      style={
        showMore
          ? {
              height: expended ? "auto" : itemHeight,
              overflow: expended ? "auto" : "hidden",
            }
          : {}
      }
    >
      {list.map((item, index) => {
        return (
          <div
            ref={(ref) => {
              itemRefs.current[index] = ref;
            }}
            className={cn(
              bem.e("item"),
              item.value === val && "is-selected",
              item.disabled && bem.em("item", "disabled")
            )}
            key={item.value}
            onClick={() => {
              !item.disabled && setVal(item.value);
            }}
          >
            {item.label}
          </div>
        );
      })}
      {showMore && showBtn && (
        <div
          className={cn(bem.e("expend"))}
          onClick={() => {
            setExpended(!expended);
            onExpend && onExpend(!expended);
          }}
        >
          {showMoreBtnRender}
        </div>
      )}
    </div>
  );
};

export default ZyrRadioButton;
