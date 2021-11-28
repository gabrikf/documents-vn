import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { GrMenu } from "react-icons/gr";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  sideBarMenu: SideBarMeunuProps[];
  pageTitle: String;
}

interface SideBarMeunuProps {
  title: String;
  icon: ReactNode;
  href: String;
}

export function Layout({ children, sideBarMenu, pageTitle }: LayoutProps) {
  const [isMenuOpen, setIsmenuOpen] = useState(false);
  function openAndCloseMenu() {
    if (isMenuOpen) {
      setIsmenuOpen(false);
      return;
    }
    setIsmenuOpen(true);
  }
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="https://www.vendus.com/m-img/logo-blue.svg" alt="" />
        </div>
        <div className={styles.headerContentMobile}>
          <GrMenu onClick={openAndCloseMenu} />
        </div>
      </div>
      <div className={styles.sideBarContainer}>
        <div className={isMenuOpen ? styles.openMenu : styles.sideBarContent}>
          <ul>
            {sideBarMenu.map((item, index) => (
              <Link key={index} to={`${item.href}`}>
                <li
                  onClick={() => setIsmenuOpen(false)}
                  className={`${
                    item.title === pageTitle && styles.activemenuitem
                  }`}
                >
                  <div>{item.icon}</div>
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div
          className={
            isMenuOpen ? styles.pageContentMenuAbled : styles.pagesContent
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
