import "./index.less";
import React, { useState } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";

export interface ZyrCountProps {
  /**
   * 绑定值
   */
  value: number | string;
  /**
   * 默认展示值
   */
  defaultValue?: number | string;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 步长
   */
  step?: number;
  /**
   * className
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * add文案
   */
  addText?: string;
  /**
   * sub文案
   */
  subText?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * onchange 事件
   */
  onChange?: (value: number) => void;
}

const bem = createNamespace("count");
const ZyrCount = ({
  value,
  defaultValue,
  min,
  max,
  step,
  className,
  disabled,
  unit,
  addText,
  subText,
  onChange,
}: ZyrCountProps) => {
  const [val, setVal] = useState(value || defaultValue || 0);

  // 判断是否是小数, 是：返回小数位数 否： 返回0
  const isDecimal = (value: number) => {
    // return value % 1 !== 0;
  };

  const add = () => {
    setVal((Number(val) + Number(step)).toFixed(2));
  };

  const sub = () => {
    setVal((Number(val) - Number(step)).toFixed(2));
  };
  return (
    <div className={bem.b()}>
      <div className={cn(bem.e("btn"), bem.e("btn-left"))} onClick={sub}>
        {subText || "-"}
      </div>
      <input
        className={bem.e("input")}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div className={cn(bem.e("btn"), bem.e("btn-right"))} onClick={add}>
        {addText || "+"}
      </div>
      {unit && <span className={bem.e("unit")}>{unit}</span>}
    </div>
  );
};

export default ZyrCount;
