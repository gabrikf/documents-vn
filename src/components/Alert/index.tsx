import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface AlertProps {
  children: ReactNode;
}

export function Alert({ children }: AlertProps) {
  return (
    <div className={styles.alert}>
      <span>{children}</span>
    </div>
  );
}
