import styles from "@styles/ProductDetail.module.css";
import { AddButton, MinusButton } from "@components/QualityButton";
import { CartLineAdd, Product } from "@libs/types";

type ProductDetailProps = {
  selectedProduct: Product | null;
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  onCartButtonClicked: ({ merchandiseId, quantity }: CartLineAdd) => void;
};

export const ProductDetail = ({ selectedProduct, quantity, onQuantityChanged, onCartButtonClicked }: ProductDetailProps) => {
  if (!selectedProduct) return null;

  return (
    <div className={styles.detail_content}>
      <div className={styles.detail_img}>
        <div className={styles.bordered}>
          <img src={selectedProduct.image.url} alt={selectedProduct.title} />
        </div>
      </div>
      <div className={styles.detail_info}>
        <h5 className={styles.detail_title}>{selectedProduct.title}</h5>
        <h5 className={styles.detail_price}>
          <span className={styles.detail_currency}>{selectedProduct.variants.price.currencyCode}</span>
          <span className={styles.detail_value}>{parseFloat(selectedProduct.variants.price.amount || "").toFixed(2)}</span>
        </h5>
        <p className={styles.detail_description}>{selectedProduct.description}</p>
        <div className={styles.detail_tags}>
          {selectedProduct.tags.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
        </div>

        <div className={styles.detail_quantily}>
          <MinusButton disabled={quantity < 2} onClick={() => onQuantityChanged(quantity - 1)} />
          <h5 className={styles.quantily_value}>{quantity}</h5>
          <AddButton onClick={() => onQuantityChanged(quantity + 1)} />
        </div>

        <button className={styles.cart_btn} onClick={() => onCartButtonClicked({ merchandiseId: selectedProduct.variants.id, quantity })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
