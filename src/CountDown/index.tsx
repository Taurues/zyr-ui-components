import moment from "moment";
import React, { useEffect, useState } from "react";

export interface CountDownProps {
  /**
   * 时间差毫秒数
   */
  temp: number;
  /**
   * 倒计时前缀
   */
  prefixText?: string;
  /**
   * 倒计时展示维度
   * d: 天
   * h: 小时
   * m: 分钟
   * s: 秒
   */
  type?: "d" | "h" | "m" | "s";
  /**
   * 字体颜色
   */
  color?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 倒计时结束回调
   */
  onEnd?: () => void;
}
const CountDown = ({
  temp,
  prefixText,
  style,
  type = "s",
  color,
  onEnd,
}: CountDownProps) => {
  const [remaining, setRemaining] = useState(calculateRemainingTime(temp));

  useEffect(() => {
    if (temp <= 0) {
      return setRemaining(calculateRemainingTime(0));
    }
    const intervalId = setInterval(() => {
      temp = temp - 1000;
      setRemaining(calculateRemainingTime(temp));
      if (temp <= 0) {
        temp = 0;
        onEnd && onEnd();
        clearInterval(intervalId);
        return;
      }
    }, 1000);

    // 清除定时器
    return () => {
      return clearInterval(intervalId);
    };
  }, [temp]);

  function calculateRemainingTime(temp) {
    const duration = moment.duration(temp);

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  const pad = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const dayRender = () => <span>{Math.floor(remaining.days)}天</span>;
  const hourRender = () => <span>{pad(remaining.hours)}时</span>;
  const minuteRender = () => <span>{pad(remaining.minutes)}分</span>;
  const secondRender = () => <span>{pad(remaining.seconds)}秒</span>;

  const renderSpan = (type) => {
    switch (type) {
      case "d":
        return dayRender();
      case "h":
        return (
          <>
            {dayRender()}
            {hourRender()}
          </>
        );
      case "m":
        return (
          <>
            {dayRender()}
            {hourRender()}
            {minuteRender()}
          </>
        );
      case "s":
        return (
          <>
            {Math.floor(remaining.days) > 0 && dayRender()}
            {hourRender()}
            {minuteRender()}
            {secondRender()}
          </>
        );
      default:
        return "-";
    }
  };

  return (
    <span
      className="count-down"
      style={{
        color,
        ...style,
      }}
    >
      {prefixText && <span style={{ marginRight: 5 }}>{prefixText}</span>}
      {renderSpan(type)}
    </span>
  );
};

export default CountDown;
