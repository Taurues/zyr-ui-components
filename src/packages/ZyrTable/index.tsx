import "./index.less";
import React, { Fragment } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";
import { Pagination, Spin } from "antd";
import type { PaginationProps, SpinProps } from "antd";

type ItemProps = {
  key: string;
  title: string | React.ReactNode;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  fixed?: "left" | "right";
  render?: (val: any, record?: Object, index?: number) => React.ReactNode;
};

type RowSelectionProps = {
  /**
   * 隐藏全选勾选框
   */
  hideSelectAll?: boolean;
  /**
   * 选中项发生变化时的回调
   */
  onChange?: (selectedRowKeys: any, selectedRows: any) => void;
};
export interface ZyrTableProps {
  /**
   * 表格列的配置
   */
  column: { [key: string]: ItemProps };
  /**
   * 表格额外列的配置
   */
  extraColumn: React.ReactNode | ((val: any) => React.ReactNode);
  /**
   * table数据源
   */
  dataSource: { [key: string | number]: any }[];
  /**
   * 表格行 key 的取值，可以是字符串或一个函数
   */
  rowKey?: string | ((record: any) => string);
  /**
   * 是否需要表格外边框
   */
  bordered?: boolean;
  /**
   *页面是否加载中, 配置项参考antd Spin组件
   */
  loading?: boolean | SpinProps;
  /**
   * 分页器，配置项参考 antd Pagination组件
   */
  pagination?: PaginationProps | boolean;
  /**
   * 表格行是否可选择
   */
  rowSelection?: RowSelectionProps;
}

const initPagination = {
  pageSize: 10,
  defaultCurrent: 1,
};

const bem = createNamespace("table");
const ZyrTable = ({
  column,
  extraColumn,
  dataSource,
  rowKey,
  bordered = false,
  loading = false,
  pagination = initPagination,
}: ZyrTableProps) => {
  // 表头
  const getTableHeader = () => {
    return Object.keys(column).map((key) => {
      const fixStyle: React.CSSProperties = column[key].fixed
        ? { position: "sticky", [column[key].fixed]: 0 }
        : {};
      return (
        <th key={key} style={{ ...column[key].headerStyle, ...fixStyle }}>
          {column[key].title}
        </th>
      );
    });
  };

  // table body 数据展示
  const getTableBodyRow = () => {
    return dataSource.map((item, index) => {
      return (
        <Fragment
          key={
            rowKey
              ? typeof rowKey === "function"
                ? rowKey(item)
                : item[rowKey]
              : index
          }
        >
          <tr className={cn(bem.e("empty"))}></tr>
          {/* 额外列配置 */}
          <tr className={cn(bem.e("extra"))}>
            <td colSpan={Object.keys(column).length}>
              {typeof extraColumn === "function"
                ? extraColumn(item)
                : extraColumn}
            </td>
          </tr>
          <tr>
            {Object.keys(column).map((key) => {
              const fixStyle: React.CSSProperties = column[key].fixed
                ? { position: "sticky", [column[key].fixed]: 0 }
                : {};
              return (
                <td key={key} style={{ ...column[key].cellStyle, ...fixStyle }}>
                  {column[key].render
                    ? column[key].render(item[key], item, index)
                    : item[key]}
                </td>
              );
            })}
          </tr>
        </Fragment>
      );
    });
  };

  return (
    <div className={cn(bem.b())}>
      <Spin
        {...(typeof loading === "boolean" ? { spinning: loading } : loading)}
      >
        <>
          <table style={{ border: bordered ? "1px solid #f5f5f5" : "none" }}>
            <thead>
              <tr>{getTableHeader()}</tr>
            </thead>
            <tbody>{getTableBodyRow()}</tbody>
          </table>
          {pagination && (
            <div className={cn(bem.e("pagination"))}>
              <Pagination
                size="small"
                {...(typeof pagination === "object"
                  ? pagination
                  : initPagination)}
              />
            </div>
          )}
        </>
      </Spin>
    </div>
  );
};

export default ZyrTable;
