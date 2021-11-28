import { ReactNode } from "react";
import { Alert } from "../Alert";
import styles from "./styles.module.scss";

interface TableProps {
  content: TableObj[];
  tableHeader: TableHeader[];
  lineButtons: LineButtonType[];
}
interface TableObj {
  [key: string]: Number;
}
interface TableHeader {
  name: string;
  key: string;
}
interface LineButtonType {
  name: string;
  icon: ReactNode;
  action: (id: Number) => void;
}
export function Table({ content, tableHeader, lineButtons }: TableProps) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index}>{item.name}</th>
            ))}
            {lineButtons && (
              <>
                {lineButtons.map((button, index) => (
                  <th key={index}>{button.name}</th>
                ))}
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {content.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 && styles.highlight}`}
            >
              {tableHeader.map((row, index) => (
                <td key={index}>{item[row.key]}</td>
              ))}
              {lineButtons && (
                <>
                  {lineButtons.map((button, index) => (
                    <td key={index} onClick={() => button.action(item.id)}>
                      {button.icon}
                    </td>
                  ))}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.alert}>
        {content.length < 1 && <Alert>No Data Found...</Alert>}
      </div>
    </div>
  );
}
