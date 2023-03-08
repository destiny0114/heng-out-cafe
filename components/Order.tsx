import styles from "@styles/Order.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import ReceiptIcon from "@assets/images/receipt.svg";

type OrderProps = {
  id: string;
  order_date: string;
  shipping_address: {
    name: string;
    email: string;
    address1: string;
    address2: string | null | undefined;
    city: string;
    country: string;
    province: string;
    zip: string;
  };
  ordered_items: {
    name: string;
    qty: number;
    rate: {
      currencyCode: string;
      amount: string;
    };
    total: {
      currencyCode: string;
      amount: string;
    };
  }[];
  cost: {
    tax: {
      currencyCode: string;
      amount: string;
    };
    subtotal: {
      currencyCode: string;
      amount: string;
    };
    total: {
      currencyCode: string;
      amount: string;
    };
  };
};

const Order = ({ id, order_date, shipping_address, ordered_items, cost }: OrderProps) => {
  return (
    <div className={styles.order}>
      <div>
        <h3 className={styles.order_id}>Order: {id}</h3>
        <h5 className={styles.order_date}>Date: {order_date}</h5>
      </div>
      <PDFDownloadLink
        document={<Invoice id={id} order_date={order_date} shipping_address={shipping_address} items={ordered_items} cost={cost} />}
        fileName={`invoice_${id}.pdf`}
      >
        <ReceiptIcon />
      </PDFDownloadLink>
    </div>
  );
};

export default Order;
