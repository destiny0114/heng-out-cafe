import { useCallback, useState } from "react";
import { GetStaticProps } from "next";
import { dehydrate } from "@tanstack/react-query";
import classNames from "classnames";
import styles from "@styles/Menu.module.css";
import SearchBar from "@components/SearchBar";
import FilterSideBar from "@components/FilterSideBar";
import MultiRangeSlider from "@components/MultiRangeSlider";
import ProductCard from "@components/ProductCard";
import SkeletonProductCard from "@components/SkeletonProductCard";
import { ProductsPaginate } from "@components/ProductsPaginate";
import ProductModal from "@components/ProductModal";
import { ProductDetail } from "@components/ProductDetail";
import useOuterClick from "@hooks/useOuterClick";
import { fetchProducts, useProducts } from "@hooks/useProducts";
import { queryClient } from "@libs/api";
import { Product, CartLineAdd } from "@libs/types";
import { useShop } from "@context/ShopContext";

export default function MenuPage() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [reverse, setReverse] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const ref = useOuterClick<HTMLDivElement>(() => setToggleDropdown(false));
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useProducts(15, reverse, query);
  const { addProductToCart } = useShop();

  const handleToggle = () => setToggleDropdown(!toggleDropdown);
  const handleFilterCriteria = useCallback((criteria_key: string) => {
    if (criteria_key === "*") {
      setQuery("");
      return;
    }
    setQuery(`tag:${criteria_key}`);
  }, []);
  const handlePriceRange = useCallback(({ min, max }: { min: number; max: number }) => {
    setQuery(`variants.price:>${min} variants.price:<=${max}`);
  }, []);
  const handleSearchProduct = useCallback((term: string) => {
    setQuery(`title:${term}*`);
  }, []);
  const handleLoadMore = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);
  const handleProductClicked = useCallback((product: Product) => {
    if (!product) return;

    setSelectedProduct(product);
    setProductQuantity(1);
    setShowModal(true);
  }, []);
  const handleCartButtonClicked = useCallback(
    ({ merchandiseId, quantity }: CartLineAdd) => {
      addProductToCart({ merchandiseId, quantity });
      setShowModal(false);
    },
    [addProductToCart]
  );
  const handleQuantityChanged = useCallback((quantity: number) => {
    if (quantity < 1) return;

    setProductQuantity(quantity);
  }, []);

  return (
    <main className={styles.hero}>
      <section className={styles.filter}>
        <SearchBar onTermSubmit={handleSearchProduct} />
        <FilterSideBar onFilterCriteriaClicked={handleFilterCriteria} />
        <MultiRangeSlider min={1} max={30} onChange={handlePriceRange} />
      </section>
      <section className={styles.product_list_wrapper}>
        <div className={styles.functionality}>
          <div ref={ref} className={classNames(styles.dropdown, { [styles.active]: toggleDropdown })}>
            <button onClick={handleToggle}>
              Sort by: A-Z
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 6">
                <path fill="#000" d="m6 6 5.196-6H.804L6 6Z" />
              </svg>
            </button>
            <div className={styles.dropdown_menu}>
              <button className={styles.dropdown_link} onClick={() => setReverse(false)}>
                Sort by: A-Z
              </button>
              <button className={styles.dropdown_link} onClick={() => setReverse(true)}>
                Sort by: Z-A
              </button>
            </div>
          </div>
          {/* {data ? <small>{`${data?.products.edges.length} Results`} </small> : null} */}
        </div>
        <div className={styles.product_list_display}>
          <div className={styles.product_list}>
            {(isLoading || isError) && [...Array(15)].map((_, i) => <SkeletonProductCard key={i} />)}
            {data &&
              data.pages.map((page) =>
                page.products.edges.map((edge, i) => {
                  const { title, description, variants, images, tags } = edge.node;

                  return (
                    <ProductCard
                      key={i}
                      product={{ title, description, variants: variants.edges[0].node, image: images.edges[0].node, tags }}
                      onProductClicked={handleProductClicked}
                      onCartButtonClicked={handleCartButtonClicked}
                    />
                  );
                })
              )}
          </div>
        </div>
        {hasNextPage && <ProductsPaginate onClick={handleLoadMore} />}
      </section>
      <ProductModal show={showModal} onClose={() => setShowModal(false)}>
        <ProductDetail
          selectedProduct={selectedProduct}
          quantity={productQuantity}
          onQuantityChanged={handleQuantityChanged}
          onCartButtonClicked={handleCartButtonClicked}
        />
      </ProductModal>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  await queryClient.prefetchInfiniteQuery(["getProducts.infinite"], () => fetchProducts({ first: 15, after: null }), {
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.products.pageInfo.hasNextPage) {
        return null;
      }
      return lastPage.products.pageInfo.endCursor;
    },
  });

  return {
    props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
  };
};
