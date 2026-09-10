import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Checkout" };

  return {
    title: `Checkout — ${product.name}`,
    description: `Order the ${product.name} by UPI or cash on delivery, with free shipping across India.`,
    // A checkout page has no business in search results.
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || !product.inStock) notFound();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} />
              <span className="text-xl font-bold text-gray-900">VoltLabs</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href={`/product/${product.slug}`}
                className="text-gray-600 hover:text-[#EAA832] transition-colors font-medium text-sm"
              >
                ← Back to product
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">
              Free delivery across India. Pay by UPI now, or in cash when your order arrives.
            </p>
          </div>

          <CheckoutForm product={product} />
        </div>
      </main>
    </>
  );
}
