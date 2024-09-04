import moment from "moment";
import React, { useEffect, useState, ReactNode, useMemo } from "react";
import "./index.less";
import { parseFormat } from "../../utils/format";

/**
 * CountDown 参数/方法
 */
export interface ZyrCountDownProps {
  /**
   * 时间差毫秒数
   */
  value: number;
  /**
   * 倒计时格式
   */
  format?: string;
  /**
   * 倒计时前缀
   */
  prefixText?: string;
  /**
   * 字体颜色
   */
  color?: string;
  /**
   * 倒计时 或 增长计时
   */
  type: "add" | "sub";
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 倒计时结束回调
   */
  onEnd?: () => void;
  /**
   * 倒计时变化时回调
   */
  onChange?: (value: number) => void;
  /**
   * 自定义展示：允许传入node，自定义展示时间格式
   */
  children?: ReactNode | ((remaining: CurrentTime) => ReactNode);
}

/**
 * CurrentTime 类型
 */
export interface CurrentTime {
  /**
   * 总时间
   */
  total: number;
  /**
   * 天
   */
  days: number;
  /**
   * 时
   */
  hours: number;
  /**
   * 分
   */
  minutes: number;
  /**
   * 秒
   */
  seconds: number;
  /**
   * 毫秒
   */
  milliseconds: number;
}

const ZyrCountDown = ({
  value,
  format = "DD天HH小时mm分ss秒",
  prefixText,
  style,
  color,
  onEnd,
  onChange,
  children,
}: ZyrCountDownProps) => {
  const [remaining, setRemaining] = useState<CurrentTime>(
    calculateRemainingTime(value)
  );

  useEffect(() => {
    if (value <= 0) {
      return setRemaining(calculateRemainingTime(0));
    }
    const intervalId = setInterval(() => {
      value = value - 1000;
      setRemaining(calculateRemainingTime(value));
      onChange && onChange(value);
      if (value <= 0) {
        value = 0;
        onEnd && onEnd();
        clearInterval(intervalId);
        return;
      }
    }, 1000);

    // 清除定时器
    return () => {
      return clearInterval(intervalId);
    };
  }, [value]);

  function calculateRemainingTime(temp) {
    const duration = moment.duration(temp);

    return {
      total: temp,
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
      milliseconds: duration.milliseconds(),
    };
  }

  const pad = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const renderSpan = useMemo(() => {
    if (typeof children === "function") {
      return children(remaining);
    }
    if (children) return children;
    if (format) return parseFormat(format, remaining);
  }, [children, remaining]);

  return (
    <div
      className="count-down"
      style={{
        color,
        ...style,
      }}
    >
      {prefixText && <span style={{ marginRight: 5 }}>{prefixText}</span>}
      {renderSpan}
    </div>
  );
};

export default ZyrCountDown;
