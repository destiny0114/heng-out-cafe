import { Page, Text, View, Document, StyleSheet, Font, Svg, G, Path } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAw.ttf",
      fontWeight: 300,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Roboto",
    fontWeight: 300,
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  invoice_box: {
    width: "100%",
    padding: "30px",
  },
  invoice_order_details: { padding: "5px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  invoice_customer_details: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoice_table: { flexDirection: "row", flexWrap: "wrap" },
  invoice_table_header: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    height: 24,
    flexGrow: 1,
    fontWeight: 700,
    padding: 15,
  },
  invoice_table_row: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    flexGrow: 1,
    padding: 15,
    fontSize: 10,
  },
  invoice_table_pay: {
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    height: 24,
    padding: 15,
    fontWeight: 700,
  },
  description: {
    width: "50%",
  },
  qty: {
    width: "15%",
    textAlign: "center",
  },
  rate: {
    width: "20%",
    textAlign: "center",
  },
  amount: {
    width: "15%",
    textAlign: "right",
  },
  pay: {
    width: "50%",
  },
  spacer: {
    width: "30%",
  },
  price: {
    width: "20%",
    textAlign: "right",
  },
});

const Logo = () => (
  <Svg width="50" height="40" viewBox="0 0 99 70">
    <G clip-path="url(#a)">
      <Path
        fill="#000"
        d="m11.667 25.093 6.557 1.924-.454 1.603-2.81-.826-.762 2.706 2.81.825-.453 1.592L10 31l.442-1.603 2.717.799.763-2.706-2.706-.796.45-1.6Zm12.355-8.774c.225.166.411.38.546.626a.46.46 0 0 1-.11.483l-2.715 3.287-5.217-4.482 2.993-3.625.792.676-1.944 2.354 1.342 1.152 1.614-1.955.79.676-1.612 1.957 1.505 1.292 2.016-2.441Zm11.155-7.267c.1.156.162.262.19.314a.246.246 0 0 1-.121.37l-1.216.66-.155-.298a1.963 1.963 0 0 0-.884-.775l-3.619-1.858 2.222 4.259-1.422.773-3.21-6.144 1.294-.7a.62.62 0 0 1 .22-.08.38.38 0 0 1 .222.061l3.85 1.948-1.728-3.325 1.424-.774 2.582 4.938c.093.182.212.392.351.631Zm12.74-6.089.347 3.07c-.57.621-1.425.997-2.564 1.128-1.14.13-2.039-.067-2.7-.593-.654-.53-1.047-1.38-1.18-2.553a3.845 3.845 0 0 1 .221-1.923 3.109 3.109 0 0 1 1.106-1.39A3.929 3.929 0 0 1 45 .044a5.37 5.37 0 0 1 1.466 0 2.96 2.96 0 0 1 1.136.413c-.04.226-.127.44-.256.629-.135.21-.257.32-.363.333a.433.433 0 0 1-.132 0 1.145 1.145 0 0 1-.173-.06c-.243-.11-.5-.186-.762-.226a3.159 3.159 0 0 0-.814 0c-.27.015-.531.095-.764.234-.233.139-.43.332-.576.564-.275.46-.368 1.091-.278 1.894.188 1.653.879 2.405 2.071 2.255.506-.06.857-.176 1.053-.345l-.175-1.54-.643.088a.488.488 0 0 1-.491-.176 1.741 1.741 0 0 1-.221-.798l2.838-.347ZM64.603 9.27c-.199-.829-.03-1.747.506-2.754.537-1.007 1.19-1.635 1.961-1.883.783-.273 1.62-.164 2.51.33.89.492 1.442 1.148 1.655 1.965.207.818.047 1.72-.477 2.706-.535 1.007-1.198 1.652-1.99 1.936-.791.284-1.634.18-2.529-.315-.889-.495-1.434-1.156-1.636-1.984Zm3.444 1.058c.403-.233.81-.737 1.22-1.513.405-.755.589-1.352.558-1.817a1.321 1.321 0 0 0-.235-.641 1.285 1.285 0 0 0-.521-.432 1.263 1.263 0 0 0-1.296-.06c-.392.22-.789.709-1.191 1.465-.403.756-.595 1.379-.577 1.869.03.228.114.446.242.636.129.19.3.346.499.456a1.419 1.419 0 0 0 1.301.035v.002Zm7.265 7.215c.022-.668.364-1.269 1.028-1.804l3.426-2.773 1.017 1.305-3.597 2.909a1.245 1.245 0 0 0-.515.857c-.011.369.119.728.363 1 .548.706 1.15.793 1.808.262l3.595-2.908 1.017 1.305-3.43 2.773c-.668.544-1.32.754-1.954.63-.633-.125-1.259-.586-1.876-1.383-.612-.78-.906-1.504-.882-2.173Zm13.281 14.301a.803.803 0 0 1-.5 0 .444.444 0 0 1-.243-.327l-.353-1.405-5.569 1.457-.402-1.583 5.57-1.457-.464-1.844 1.04-.273 1.326 5.285a2.31 2.31 0 0 1-.405.147Zm-.037 37.146H10.345V70h78.21v-1.01Zm0-12.308H10.345v1.01h78.21v-1.01Zm-59.427 7.9c0-.953.251-1.7.754-2.24.502-.542 1.196-.812 2.08-.812a2.703 2.703 0 0 1 1.713.525 2.06 2.06 0 0 1 .792 1.422 2.093 2.093 0 0 1-1.02.38.382.382 0 0 1-.28-.109.797.797 0 0 1-.186-.347 1.407 1.407 0 0 0-.393-.643.964.964 0 0 0-.626-.19 1.012 1.012 0 0 0-.529.132 1.037 1.037 0 0 0-.389.387 2.84 2.84 0 0 0-.325 1.495c0 .7.109 1.213.325 1.542.113.165.265.297.443.383.177.086.374.124.57.109a.922.922 0 0 0 .754-.332c.222-.31.364-.672.413-1.052.296-.025.592.055.838.225a.865.865 0 0 1 .256.704 1.138 1.138 0 0 1-.314.766 2.14 2.14 0 0 1-.833.568 2.913 2.913 0 0 1-1.105.212c-1.957-.006-2.937-1.047-2.938-3.125Zm17.61 2.045c.038.246.134.478.28.677a1.821 1.821 0 0 1-.572.266c-.207.063-.42.097-.637.101a.513.513 0 0 1-.424-.194 1.368 1.368 0 0 1-.234-.615 1.716 1.716 0 0 1-.68.649c-.32.141-.669.207-1.018.194a1.8 1.8 0 0 1-1.251-.428 1.44 1.44 0 0 1-.477-1.127 1.603 1.603 0 0 1 .195-.846c.141-.257.35-.47.604-.611.535-.32 1.393-.514 2.574-.58v-.563a.87.87 0 0 0-.221-.659.976.976 0 0 0-.695-.225 1.781 1.781 0 0 0-.663.135c-.29.127-.565.285-.822.471a.238.238 0 0 1-.148.043.58.58 0 0 1-.41-.261 2.453 2.453 0 0 1-.386-.677 3.248 3.248 0 0 1 1.16-.61 4.73 4.73 0 0 1 1.481-.244c.737 0 1.303.175 1.698.525a1.899 1.899 0 0 1 .595 1.497v1.804c-.016.427 0 .854.05 1.278Zm-2.145-.196a2.1 2.1 0 0 0 .505-.703v-.796a2.915 2.915 0 0 0-1.327.297.821.821 0 0 0-.327.312.843.843 0 0 0-.115.441.66.66 0 0 0 .19.496.693.693 0 0 0 .5.185.875.875 0 0 0 .574-.232Zm11.726-6.123a1.16 1.16 0 0 0-.153.649v.676h1.106v.994h-1.106v4.96h-1.571v-4.96h-.885v-.994h.885v-.692a2.012 2.012 0 0 1 .473-1.425 1.757 1.757 0 0 1 1.353-.503c.334-.014.667.055.97.201a.584.584 0 0 1 .256.212.601.601 0 0 1 .102.32.967.967 0 0 1-.042.275.66.66 0 0 1-.117.226 2.025 2.025 0 0 0-.838-.163.494.494 0 0 0-.433.224Zm13.396 4.597h-3.758a2.4 2.4 0 0 0 .387 1.278 1.048 1.048 0 0 0 .884.451c.14.004.278-.019.41-.066.125-.053.24-.13.34-.225.166-.171.32-.354.462-.548a.246.246 0 0 1 .22-.085c.155.008.306.05.443.124.197.098.383.216.557.351-.46 1.01-1.27 1.515-2.432 1.515-.884 0-1.584-.276-2.1-.827-.516-.552-.77-1.308-.765-2.268a3.633 3.633 0 0 1 .345-1.635 2.48 2.48 0 0 1 .989-1.064c.466-.26.991-.389 1.523-.374.813 0 1.44.225 1.888.703.446.478.663 1.127.663 1.991-.003.1-.02.327-.056.679Zm-1.547-.902c0-.965-.332-1.45-.997-1.45a1.004 1.004 0 0 0-.816.368c-.23.313-.364.69-.382 1.082h2.195ZM49.45 54.536c12.509 0 22.65-1.601 22.65-3.576s-10.141-3.576-22.65-3.576c-12.51 0-22.651 1.601-22.651 3.576s10.14 3.576 22.65 3.576Z"
      />
      <Path
        fill="#003554"
        d="M49.45 53.258c8.034 0 14.547-1.03 14.547-2.298 0-1.269-6.513-2.297-14.548-2.297S34.901 49.69 34.901 50.96c0 1.269 6.513 2.297 14.548 2.297Z"
      />
      <Path
        fill="#464646"
        d="M49.45 53.37c-3.892 0-7.55-.239-10.305-.676-1.99-.314-4.353-.87-4.353-1.736s2.368-1.423 4.353-1.736c2.755-.435 6.411-.677 10.304-.677 3.893 0 7.552.24 10.304.677 1.99.313 4.355.87 4.355 1.736s-2.368 1.422-4.355 1.736c-2.752.437-6.41.676-10.304.676Zm0-4.595c-8.636 0-14.437 1.128-14.437 2.185 0 1.057 5.801 2.185 14.436 2.185s14.438-1.128 14.438-2.185c0-1.057-5.8-2.185-14.438-2.185Z"
      />
      <Path
        fill="#000"
        d="M32.299 29.914h34.294v5.708c0 4.066-1.584 7.966-4.403 10.841-2.82 2.875-6.643 4.49-10.63 4.49h-4.23c-3.988 0-7.811-1.615-10.63-4.49-2.82-2.875-4.403-6.775-4.403-10.84v-5.71h.002Z"
      />
      <Path
        fill="#000"
        d="M69.546 34.878a.547.547 0 0 1-.39-.165.57.57 0 0 1 0-.797.547.547 0 0 1 .39-.165c1.729 0 3.135-1.28 3.135-2.857 0-1.575-1.406-2.856-3.135-2.856h-33.36a.548.548 0 0 1-.392-.165.57.57 0 0 1 0-.797.548.548 0 0 1 .391-.165h33.361c2.34 0 4.24 1.787 4.24 3.983s-1.9 3.984-4.24 3.984ZM45.952 15.649s1.806 1.07 1.886 2.706c.088 1.787-.885 2.41-.885 2.41s-2.431 1.905-1.885 3.212c.546 1.308-.033-1.803 2.59-2.254 3.365-.584.586-6.092-1.706-6.074Zm4.561 3.601s1.989-.203 2.484 1.742c.495 1.946-2.624 1.114-1.572 5.186 0 0 .04-1.47 1.937-2.746 2.082-1.393.98-4.448-2.85-4.182Z"
      />
    </G>
  </Svg>
);

type InvoiceProps = {
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
  items: {
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

const Invoice = ({ id, order_date, shipping_address, items, cost }: InvoiceProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.invoice_box}>
        <View style={styles.invoice_order_details}>
          <Logo />

          <View>
            <Text>Invoice: {id}</Text>
            <Text>Created: {order_date}</Text>
          </View>
        </View>
        <View style={styles.invoice_customer_details}>
          <View>
            <Text>{shipping_address.address1}</Text>
            {shipping_address.address2 && <Text>{shipping_address.address2}</Text>}
            <Text>
              {shipping_address.city} {shipping_address.zip}
            </Text>
            <Text>
              {shipping_address.province} {shipping_address.country}
            </Text>
          </View>
          <View>
            <Text>{shipping_address.name}</Text>
            <Text>{shipping_address.email}</Text>
          </View>
        </View>
        <View style={styles.invoice_table}>
          <View style={styles.invoice_table_header}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.qty}>Qty</Text>
            <Text style={styles.rate}>Rate</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>
          {items.map((item) => (
            <View key={item.name} style={styles.invoice_table_row}>
              <Text style={styles.description}>{item.name}</Text>
              <Text style={styles.qty}>{item.qty}</Text>
              <Text style={styles.rate}>
                {item.rate.currencyCode} {parseFloat(item.rate.amount).toFixed(2)}
              </Text>
              <Text style={styles.amount}>
                {item.total.currencyCode} {parseFloat(item.total.amount).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.invoice_table_pay}>
            <Text style={styles.pay}>Pay</Text>
            <Text style={styles.spacer}></Text>
            <Text style={styles.price}>Price</Text>
          </View>
          <View style={styles.invoice_table_row}>
            <Text style={styles.pay}>Tax</Text>
            <Text style={styles.spacer}></Text>
            <Text style={styles.price}>
              {cost.tax.currencyCode} {parseFloat(cost.tax.amount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.invoice_table_row}>
            <Text style={styles.pay}>Subtotal</Text>
            <Text style={styles.spacer}></Text>
            <Text style={styles.price}>
              {cost.subtotal.currencyCode} {parseFloat(cost.subtotal.amount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.invoice_table_pay}>
            <Text style={styles.pay}>Total</Text>
            <Text style={styles.spacer}></Text>
            <Text style={styles.price}>
              {cost.total.currencyCode} {parseFloat(cost.total.amount).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;
