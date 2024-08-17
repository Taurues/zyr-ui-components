import "./index.less";
import React from "react";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 按钮尺寸
   */
  size?: "small" | "medium" | "large";
  /**
   * 按钮文案
   */
  label: string;
  /**
   * 点击事件
   */
  onClick?: () => void;
}

/**
 * 描述描述Button
 */
const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? "wsf-button--primary" : "secondary";
  return (
    <button
      type="button"
      className={`wsf-button  ${mode} wsf-button--${size}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
