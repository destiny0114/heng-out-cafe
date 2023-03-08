import { Product, CartLineAdd } from "@libs/types";
import styles from "@styles/ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  onProductClicked: (product: Product) => void | undefined;
  onCartButtonClicked: ({ merchandiseId, quantity }: CartLineAdd) => void;
};

const ProductCard = ({ product, onProductClicked, onCartButtonClicked }: ProductCardProps) => {
  return (
    <div className={styles.product}>
      <div className={styles.product_info}>
        <div className={styles.product_detail}>
          <small className={styles.product_name}>{product.title}</small>
          <small className={styles.product_price}>
            {product.variants.price.currencyCode} {parseFloat(product.variants.price.amount).toFixed(2)}
          </small>
        </div>

        <button onClick={() => onCartButtonClicked({ merchandiseId: product.variants.id, quantity: 1 })}>Add to cart</button>
      </div>
      <div onClick={() => onProductClicked(product)} className={styles.product_img}>
        <img src={product.image.url} alt={product.image.altText || ""} />
      </div>
    </div>
  );
};

export default ProductCard;
