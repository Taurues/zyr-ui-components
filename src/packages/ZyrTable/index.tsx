import "./index.less";
import React, { Fragment, useEffect, useState } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";
import { Checkbox, Pagination, Spin } from "antd";
import type { PaginationProps, SpinProps } from "antd";
import { cloneDeep } from "lodash";

type ItemProps<T> = {
  key: string;
  title: string | React.ReactNode;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  fixed?: "left" | "right";
  render?: (val: any, record?: T, index?: number) => React.ReactNode;
};

type ColumnProps<T> = {
  [key: string]: ItemProps<T>;
};

type RowSelectionProps = {
  /**
   * 隐藏全选勾选框
   */
  hideSelectAll?: boolean;
  /**
   * 自定义列表选择框标题
   */
  columnTitle?: string;
  /**
   * 自定义列表选择框宽度
   */
  columnWidth?: number;
  /**
   * 把选择框列固定在左边
   */
  fixed?: boolean;
  /**
   * 指定选中项的 key 数组，需要和 onChange 进行配合
   */
  selectedRowKeys: any[];
  /**
   * 选中项发生变化时的回调
   */
  onChange?: (selectedRowKeys: any, selectedRows: any) => void;
  /**
   * 用户手动选择/取消选择某行的回调
   */
  onSelect?: (record: object, selected: boolean, selectedRows: any[]) => void;
  /**
   * 用户手动选择/取消选择所有行的回调
   */
  onSelectAll?: (
    selected: boolean,
    selectedRows: any[],
    changeRows: any[]
  ) => void;
};
export interface ZyrTableProps<T> {
  /**
   * 表格列的配置
   */
  column: ColumnProps<T>;
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
  pagination?: PaginationProps | false;
  /**
   * 表格行是否可选择
   */
  rowSelection?: false | RowSelectionProps;
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
  rowSelection = false,
}: ZyrTableProps<typeof column>) => {
  const [customerColumn, setCustomerColumn] = useState(cloneDeep(column));

  useEffect(() => {
    if (rowSelection) {
      const selectColumn = {
        checkbox: {
          title: (
            <Checkbox
              onChange={(e) => {
                const checked = e.target.checked;
                rowSelection.onSelectAll &&
                  rowSelection.onSelectAll(checked, dataSource, []);
              }}
            >
              {rowSelection.columnTitle}
            </Checkbox>
          ),
          key: "checkbox",
          fixed: rowSelection.fixed ? "left" : "",
          cellStyle: { width: rowSelection.columnWidth || 20 },
          headerStyle: { width: rowSelection.columnWidth || 20 },
          render: (val, record, index) => {
            return <Checkbox />;
          },
        },
      };
      setCustomerColumn({ ...selectColumn, ...customerColumn });
    }
  }, []);

  // 表头
  const getTableHeader = () => {
    return Object.keys(customerColumn).map((key, index) => {
      const fixStyle: React.CSSProperties = customerColumn[key].fixed
        ? { position: "sticky", [customerColumn[key].fixed]: 0 }
        : {};
      return (
        <th
          key={key}
          style={{ ...customerColumn[key].headerStyle, ...fixStyle }}
        >
          {customerColumn[key].title}
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
            <td colSpan={Object.keys(customerColumn).length}>
              {typeof extraColumn === "function"
                ? extraColumn(item)
                : extraColumn}
            </td>
          </tr>
          <tr>
            {Object.keys(customerColumn).map((key) => {
              const fixStyle: React.CSSProperties = customerColumn[key].fixed
                ? { position: "sticky", [customerColumn[key].fixed]: 0 }
                : {};
              return (
                <td
                  key={key}
                  style={{ ...customerColumn[key].cellStyle, ...fixStyle }}
                >
                  {customerColumn[key].render
                    ? customerColumn[key].render(item[key], item, index)
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
