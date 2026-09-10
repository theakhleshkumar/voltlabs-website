import { getProductBySlug } from "./products";

/**
 * Every amount charged is derived here, from the catalogue on the server.
 * The browser sends a slug and a quantity and nothing else -- if it could send
 * a price, someone would buy a 799 rupee lamp for 1 rupee.
 */

/** Free shipping across India, as advertised on the site. */
export const SHIPPING_PAISE = 0;

/**
 * Payment by UPI QR.
 *
 * The QR is a static image, so it carries neither the amount nor the order
 * number: the customer types the amount into their UPI app themselves, and the
 * credit lands in the bank statement with nothing tying it to an order. The
 * reference they enter afterwards is what makes reconciliation possible, which
 * is why checkout asks for it rather than treating it as optional.
 *
 * The account is held by the company behind the VoltLabs brand, and that is
 * the name shown in the customer's UPI app -- stated at checkout so nobody
 * abandons a payment thinking they scanned the wrong code.
 */
export const UPI_QR_IMAGE = "/upi-qr.png";
export const UPI_PAYEE_NAME = "Codemagnet Solutions Private Limited";

/** Guards against a typo or a script ordering 10,000 lamps. */
export const MAX_QUANTITY_PER_ITEM = 10;

export const toPaise = (rupees: number): number => Math.round(rupees * 100);

export const formatInr = (paise: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);

export class PricingError extends Error {}

export interface PricedItem {
  productSlug: string;
  productName: string;
  unitPricePaise: number;
  quantity: number;
  lineTotalPaise: number;
}

export interface PricedOrder {
  items: PricedItem[];
  subtotalPaise: number;
  shippingPaise: number;
  totalPaise: number;
  currency: string;
}

export const priceOrder = (
  requested: { slug: string; quantity: number }[],
): PricedOrder => {
  if (requested.length === 0) {
    throw new PricingError("Your order is empty.");
  }

  const items: PricedItem[] = requested.map(({ slug, quantity }) => {
    const product = getProductBySlug(slug);

    if (!product) {
      throw new PricingError("That product is no longer available.");
    }
    if (!product.inStock) {
      throw new PricingError(`${product.name} is out of stock.`);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new PricingError("Quantity must be a whole number of at least 1.");
    }
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      throw new PricingError(
        `You can order up to ${MAX_QUANTITY_PER_ITEM} of an item at a time. Contact us on WhatsApp for larger orders.`,
      );
    }

    const unitPricePaise = toPaise(product.price);

    return {
      productSlug: product.slug,
      productName: product.name,
      unitPricePaise,
      quantity,
      lineTotalPaise: unitPricePaise * quantity,
    };
  });

  const subtotalPaise = items.reduce((sum, item) => sum + item.lineTotalPaise, 0);

  return {
    items,
    subtotalPaise,
    shippingPaise: SHIPPING_PAISE,
    totalPaise: subtotalPaise + SHIPPING_PAISE,
    currency: "INR",
  };
};
