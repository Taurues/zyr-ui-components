import "./index.less";
import React from "react";
import { createNamespace } from "../../utils/createBEM";
import cn from "classnames";

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

const bem = createNamespace("button");

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
  const mode = primary ? bem.m("primary") : bem.m("secondary");
  return (
    <button
      type="button"
      className={cn("z-button", mode, bem.m(size))}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
