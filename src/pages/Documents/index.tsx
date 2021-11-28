import { Table } from "../../components/Table";
import { BiSearchAlt2 } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import { useTitle } from "../../hooks/useTitle";

const tableHeader = [
  {
    name: "Id",
    key: "id",
  },
  {
    name: "Number",
    key: "number",
  },
  {
    name: "Store Id",
    key: "store_id",
  },
  {
    name: "Register Id",
    key: "register_id",
  },
  {
    name: "Type",
    key: "type",
  },
  {
    name: "Status",
    key: "status",
  },
];

export function Documents() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setCurrentTitle } = useTitle();
  useEffect(() => {
    setLoading(true);
    setCurrentTitle("Documents");
    api
      .get(
        `${encodeURIComponent(
          `?api_key=b466e4b7ca33df8e6d372da48f0468ad&q=teste`
        )}`
      )
      .then((response) => {});
    api.get(`?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setData(response.data);
    });

    api.get(`?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setData(response.data);
    });
    setLoading(false);
  }, []);
  function selectByType(type: string) {
    setLoading(true);
    api
      .get(
        `${encodeURIComponent(
          `?api_key=b466e4b7ca33df8e6d372da48f0468ad&type=${type}`
        )}`
      )
      .then((response) => {
        setData(response.data);
      });
    setLoading(false);
  }
  function serchByString(string: string) {
    setLoading(true);
    api
      .get(
        `${encodeURIComponent(
          `?api_key=b466e4b7ca33df8e6d372da48f0468ad&q=${string}`
        )}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => setData([]));
    setLoading(false);
  }
  const lineBtns = [
    {
      name: "Details",
      icon: <BiSearchAlt2 />,
      action: (id: Number) => history.push(`/detail/${id}`),
    },
    {
      name: "Print PDF",
      icon: <GrDocumentPdf />,
      action: (id: Number) =>
        window.open(
          `https://www.vendus.pt/ws/documents/${id}.pdf?${process.env.REACT_APP_API_KEY}`,
          "_blank"
        ),
    },
  ];
  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <>
      <div className={styles.inputBox}>
        <div>
          <input
            placeholder="Search here..."
            onKeyUp={(e: any) => serchByString(e.target.value)}
          />
        </div>
        <div className={styles.lineFitlers}>
          <span>Filter:</span>
          <div onClick={() => selectByType("FT")}>FT</div>
          <div onClick={() => selectByType("FR")}>FR</div>
          <div onClick={() => selectByType("FS")}>FS</div>
          <div onClick={() => selectByType("NC")}>NC</div>
          <div onClick={() => selectByType("")}>Clear</div>
        </div>
      </div>

      <Table lineButtons={lineBtns} tableHeader={tableHeader} content={data} />
    </>
  );
}
