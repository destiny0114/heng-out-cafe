import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useShop } from "@context/ShopContext";

type LayoutProps = {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
};

const Layout = ({ title, description, keywords, children }: LayoutProps) => {
  const { cartQuery } = useShop();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Navbar notifyCart={cartQuery.data && cartQuery.data.cart?.lines.edges.length ? true : false} />
      {children}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Heng Out Cafe",
  description: "The chilling and relaxing cafe",
  keywords: "cafe,food, dessert, coffee, warm",
};

export default Layout;
