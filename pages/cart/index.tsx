import styles from "@styles/Cart.module.css";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CartItem from "@components/CartItem";
import { CartLineUpdate, CartLineRemove } from "@libs/types";
import { useShop } from "@context/ShopContext";
import { parseCookie } from "@utils/helper";

type PageProps = {};

export default function CartPage({}: PageProps) {
  const { cartQuery, updateProductToCart, removeItemFromCart } = useShop();

  const handleCartItemRemoved = ({ merchandiseId }: CartLineRemove) => {
    removeItemFromCart({ merchandiseId });
  };

  const handleCartItemQuantityChanged = ({ id, quantity }: CartLineUpdate) => {
    if (quantity < 1) return;

    updateProductToCart({ id, quantity });
  };

  const renderedCartList =
    cartQuery.data &&
    cartQuery.data.cart?.lines.edges.map((edge) => {
      const { id, quantity, merchandise, cost } = edge.node;
      return (
        <CartItem
          key={merchandise.product.id}
          quantity={quantity}
          id={id}
          merchandiseId={id}
          title={merchandise.product.title}
          image={merchandise.product.images.edges[0].node}
          tags={merchandise.product.tags}
          cost={cost}
          onItemQuantityChanged={handleCartItemQuantityChanged}
          onItemRemoved={handleCartItemRemoved}
        />
      );
    });

  return (
    <main className={styles.hero}>
      <section>
        <div className={styles.cart_info}>
          <h3 className={styles.cart_length}>
            <span className={styles.title}>Your Cart</span>
            <span className={styles.length}>{cartQuery.data ? cartQuery.data.cart?.lines.edges.length : "No"} items</span>
          </h3>
          <h3 className={styles.cart_total}>
            <span className={styles.title}>Subtotal</span>
            <span className={styles.total}>
              {cartQuery.data
                ? `${cartQuery.data.cart?.cost.subtotalAmount.currencyCode} ${parseFloat(cartQuery.data.cart?.cost.subtotalAmount.amount).toFixed(2)}`
                : "MYR 0"}
            </span>
          </h3>
        </div>
        {cartQuery.isLoading ? (
          <div className={styles.empty_text}>Loading...</div>
        ) : (
          <div className={styles.cart_list}>
            {cartQuery.data?.cart?.lines.edges.length ? renderedCartList : <div className={styles.empty_text}>No Items</div>}
          </div>
        )}
        <div className={styles.cart_navigate}>
          <Link href="/menu">
            <button className={styles.shopping_btn}>Continue Shopping</button>
          </Link>
          {!!cartQuery.data?.cart?.lines.edges.length && (
            <Link href={cartQuery.data.cart.checkoutUrl} passHref>
              <button className={styles.checkout_btn}>Checkout</button>
            </Link>
          )}
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
