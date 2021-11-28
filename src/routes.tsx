import { RiFileList3Line } from "react-icons/ri";
import { MdFormatListNumbered } from "react-icons/md";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useTitle } from "./hooks/useTitle";
import { Details } from "./pages/Details";
import { Documents } from "./pages/Documents";

const sideBarMEnu = [
  {
    title: "Documents",
    icon: <MdFormatListNumbered />,
    href: "/",
  },
  {
    title: "Details",
    icon: <RiFileList3Line />,
    href: "/detail/search",
  },
];

export function Routes() {
  const { title } = useTitle();

  return (
    <BrowserRouter>
      <Switch>
        <Layout pageTitle={title} sideBarMenu={sideBarMEnu}>
          <Route exact path="/" component={Documents} />
          {/* <Route exact path="/detail" component={Details} /> */}
          <Route path="/detail/:id" component={Details} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
