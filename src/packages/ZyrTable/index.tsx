import "./index.less";
import React, { Fragment } from "react";
import cn from "classnames";
import { createNamespace } from "../../utils/createBEM";

type ItemProps = {
  key: string;
  title: string | React.ReactNode;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  render: (val: any, item?: Object, index?: number) => React.ReactNode;
};
export interface ZyrTableProps {
  column: { [key: string]: ItemProps };
  extraColumn: React.ReactNode | ((val: any) => React.ReactNode);
  dataSource: object[];
}

const bem = createNamespace("table");
const ZyrTable = ({ column, extraColumn, dataSource }: ZyrTableProps) => {
  const getTableHeader = () => {
    return Object.keys(column).map((key) => {
      return (
        <th key={key} style={{ ...column[key].headerStyle }}>
          {column[key].title}
        </th>
      );
    });
  };

  const getTableBodyRow = () => {
    return dataSource.map((item, index) => {
      return (
        <Fragment key={index}>
          <tr className={cn(bem.e("empty"))}></tr>
          <tr className={cn(bem.e("extra"))}>
            <td colSpan={Object.keys(column).length}>
              {typeof extraColumn === "function"
                ? extraColumn(item)
                : extraColumn}
            </td>
          </tr>
          <tr>
            {Object.keys(column).map((key) => {
              return (
                <td key={key} style={{ ...column[key].cellStyle }}>
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
      <table>
        <thead>
          <tr>{getTableHeader()}</tr>
        </thead>
        <tbody>{getTableBodyRow()}</tbody>
      </table>
    </div>
  );
};

export default ZyrTable;
