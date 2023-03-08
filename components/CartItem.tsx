import styles from "@styles/CartItem.module.css";
import { AddButton, MinusButton } from "@components/QualityButton";
import DeleteIcon from "@assets/images/delete.svg";
import { CartLineUpdate, CartLineRemove } from "@libs/types";

type CartItemProps = {
  quantity: number;
  id: string;
  merchandiseId: string;
  title: string;
  image: {
    id?: string | null | undefined;
    url: string;
    altText?: string | null | undefined;
  };
  tags: string[];
  cost: {
    amountPerQuantity: {
      currencyCode: string;
      amount: string;
    };
    totalAmount: {
      currencyCode: string;
      amount: string;
    };
  };
  onItemQuantityChanged: ({ id, quantity }: CartLineUpdate) => void;
  onItemRemoved: ({ merchandiseId }: CartLineRemove) => void;
};

const CartItem = ({ quantity, id, merchandiseId, title, image, tags, cost, onItemQuantityChanged, onItemRemoved }: CartItemProps) => {
  return (
    <div className={styles.cart_item}>
      <button onClick={() => onItemRemoved({ merchandiseId })} className={styles.delete_btn}>
        <DeleteIcon />
      </button>
      <img className={styles.item_img} src={image.url} alt="" />
      <div className={styles.item_info}>
        <small className={styles.title}>{title}</small>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </div>
      <div className={styles.item_feature}>
        <div className={styles.item_quantily}>
          <small className={styles.title}>Quanlity</small>
          <MinusButton disabled={quantity < 2} onClick={() => onItemQuantityChanged({ id, quantity: quantity - 1 })} />
          <h5 className={styles.quantily_value}>{quantity}</h5>
          <AddButton onClick={() => onItemQuantityChanged({ id, quantity: quantity + 1 })} />
        </div>
        <small className={styles.item_price}>
          <span className={styles.currency}>{cost.totalAmount.currencyCode}</span>
          <span className={styles.value}>{parseFloat(cost.totalAmount.amount).toFixed(2)}</span>
        </small>
      </div>
    </div>
  );
};

export default CartItem;
