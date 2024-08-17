import React from "react";
import { Input as AntInput } from "antd";

export interface InputProps {
  /**
   * placeholder
   */
  placeholder?: string;
}

const Input = ({ placeholder, ...props }: InputProps) => {
  return (
    <AntInput style={{ width: 200 }} placeholder={placeholder} {...props} />
  );
};

export default Input;
