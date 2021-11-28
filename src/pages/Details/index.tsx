import { loadavg } from "os";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Alert } from "../../components/Alert";
import { useTitle } from "../../hooks/useTitle";
import { api } from "../../service/api";
import styles from "./styles.module.scss";

interface DocumentParams {
  id: string;
}

interface DocumentDetails {
  id: number;
  type: string;
  number: string;
  observations: string;
  date_due: any;
  amount_gross: any;
  amount_net: any;
  client: {
    name: string;
    fiscal_id: string;
  };
  items: ItensType[];
  payments: PaymentsType[];
}
interface ItensType {
  title: string;
  reference_document: string;
  stock_control: number;
  amounts: {
    net_total: number;
    gross_total: number;
  };
}
interface PaymentsType {
  id: number;
  title: string;
  amount: number;
}
export function Details() {
  const params = useParams<DocumentParams>();
  const history = useHistory();
  const [id, setId] = useState(String(params.id));

  const [data, setData] = useState<DocumentDetails>();
  const [noDataFound, setNoDAtaFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentTitle } = useTitle();
  useEffect(() => {
    setLoading(true);
    setCurrentTitle("Details");
    if (params.id === "search") {
      setNoDAtaFound(true);
      setLoading(false);
      return;
    }

    api
      .get<DocumentDetails>(`${id}/?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setData(response.data);

        setNoDAtaFound(false);
      })
      .catch(() => setNoDAtaFound(true));
    setLoading(false);
  }, []);

  function handleCallFunction(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    api
      .get<DocumentDetails>(`${id}/?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setData(response.data);

        setNoDAtaFound(false);
      })
      .catch(() => setNoDAtaFound(true));
    history.push(`${id}`);
    setLoading(false);
  }
  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleCallFunction} className={styles.inputBox}>
        <input
          placeholder="Find a document by id..."
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {noDataFound && !loading ? (
        <Alert>No data found</Alert>
      ) : (
        <div className={styles.descriptionContainer}>
          <h1>Document Detail</h1>
          <div>
            <h2>Client Informations: </h2>
            <div className={styles.descriptionContent}>
              <div className={styles.justify}>
                <strong>Id: </strong>
                <input disabled value={data?.id} />
              </div>
              <div className={styles.justify}>
                <strong>Client name: </strong>
                <input disabled value={data?.client.name} />
              </div>
              <div className={styles.justify}>
                <strong>Type: </strong>
                <input disabled value={data?.type} />
              </div>
              <div className={styles.justify}>
                <strong>Number: </strong>
                <input disabled value={data?.number} />
              </div>
              <div className={styles.justify}>
                <strong>Date Due: </strong>

                <input
                  className={styles.dateType}
                  disabled
                  type="date"
                  value={data?.date_due}
                />
              </div>
              <div className={styles.justify}>
                <strong>Observations: </strong>
                <input disabled value={data?.observations} />
              </div>
            </div>
          </div>
          <div>
            <h2>Itens: </h2>
            {data?.items.map((item, index) => (
              <div key={index} className={styles.descriptionContent}>
                <div className={styles.justify}>
                  <strong>Title: </strong>
                  <input disabled value={item.title} />
                </div>
                <div className={styles.justify}>
                  <strong>Ref Document: </strong>
                  <input disabled value={item.reference_document} />
                </div>
                <div className={styles.justify}>
                  <strong>Stock Control: </strong>
                  <input disabled value={item.stock_control} />
                </div>
                <div className={styles.justify}>
                  <strong>Amount Net: </strong>
                  <input
                    disabled
                    value={new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(item.amounts.net_total)}
                  />
                </div>
                <div className={styles.justify}>
                  <strong>Amount Gross: </strong>
                  <input
                    disabled
                    value={new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(item.amounts.gross_total)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2>Payments: </h2>
            {data?.payments.map((item, index) => (
              <div key={index} className={styles.descriptionContent}>
                <div className={styles.justify}>
                  <strong>Id: </strong>
                  <input disabled value={item.id} />
                </div>
                <div className={styles.justify}>
                  <strong>Title: </strong>
                  <input disabled value={item.title} />
                </div>
                <div className={styles.justify}>
                  <strong>Amount: </strong>
                  <input
                    disabled
                    value={new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(item.amount)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.resumeContent}>
            <div className={styles.inputsResume}>
              <div>
                <strong>Total Amount Net: </strong>
                <input
                  disabled
                  value={new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(data?.amount_net)}
                />
              </div>
              <div>
                <strong>Total Amount Gross: </strong>
                <input
                  disabled
                  value={new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(data?.amount_gross)}
                />
              </div>
            </div>
            <div className={styles.buttonsResume}>
              <button onClick={history.goBack}>Back</button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.vendus.pt/ws/documents/${id}.pdf?${process.env.REACT_APP_API_KEY}`,
                    "_blank"
                  )
                }
              >
                Print PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
