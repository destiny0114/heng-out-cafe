import styles from "@styles/Dashboard.module.css";
import { GetServerSideProps } from "next";
import { useAuth } from "@context/AuthContext";
import Order from "@components/Order";
import { useCustomer } from "@hooks/useCustomer";
import { formatDate, parseCookie } from "@utils/helper";

type PageProps = {
  token: string;
};

// const InvoicePDF = dynamic(() => import("@components/Invoice"), {
//   ssr: false,
// });

export default function DashboardPage({ token }: PageProps) {
  const { auth, logout } = useAuth();
  const { isLoading, data } = useCustomer(token);

  const handleButtonClicked = () => logout();

  const renderedOrders =
    data &&
    data.customer?.orders.edges.map((edge, i) => {
      const shipping_address = {
        name: edge.node.shippingAddress!.name!,
        email: edge.node.email!,
        address1: edge.node.shippingAddress!.address1!,
        address2: edge.node.shippingAddress!.address2,
        city: edge.node.shippingAddress!.city!,
        country: edge.node.shippingAddress!.country!,
        province: edge.node.shippingAddress!.province!,
        zip: edge.node.shippingAddress!.zip!,
      };

      const ordered_items = edge.node.lineItems.edges.map((edge) => {
        return {
          name: edge.node.title,
          qty: edge.node.quantity,
          rate: {
            currencyCode: edge.node.variant!.price.currencyCode,
            amount: edge.node.variant!.price.amount,
          },
          total: {
            currencyCode: edge.node.originalTotalPrice.currencyCode,
            amount: edge.node.originalTotalPrice.amount,
          },
        };
      });

      const cost = {
        tax: {
          currencyCode: edge.node.totalTax!.currencyCode,
          amount: edge.node.totalTax!.amount,
        },
        subtotal: {
          currencyCode: edge.node.subtotalPrice!.currencyCode,
          amount: edge.node.subtotalPrice!.amount,
        },
        total: {
          currencyCode: edge.node.totalPrice!.currencyCode,
          amount: edge.node.totalPrice!.amount,
        },
      };

      return (
        <Order
          key={i}
          id={edge.node.name}
          order_date={formatDate(edge.node.processedAt)}
          shipping_address={shipping_address}
          ordered_items={ordered_items}
          cost={cost}
        />
      );
    });

  return (
    <main className={styles.hero}>
      <section>
        <div className={styles.header}>
          <h1>Dashboard Overview</h1>
          <h3>
            Welcome, {auth.user?.firstName} {auth.user?.lastName}
          </h3>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.navigate}>
            <div>Orders</div>
            <div>
              <button className={styles.logout_btn} onClick={handleButtonClicked}>
                Logout
              </button>
            </div>
          </div>
          <div className={styles.infomation}>
            {isLoading ? (
              <div className={styles.empty_text}>Loading...</div>
            ) : data?.customer?.orders.edges.length ? (
              renderedOrders
            ) : (
              <div className={styles.empty_text}>No Orders</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access_token } = parseCookie(context.req);

  if (!access_token)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };

  return {
    props: { token: access_token ?? null },
  };
};
