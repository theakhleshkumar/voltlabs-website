import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs, Product } from "@/lib/products";

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    keywords: product.features.join(", "),
    openGraph: {
      title: `${product.name} | VoltLabs`,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
      type: "website",
      url: `https://voltlabs.in/product/${product.slug}`,
    },
    alternates: {
      canonical: `https://voltlabs.in/product/${product.slug}`,
    },
  };
}

// Star Rating Component
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= Math.floor(rating) ? "text-[#EAA832]" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
};

// Highlight Icon Component
const HighlightIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    touch: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    colors: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    usb: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    warranty: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    dimmer: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    design: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    modes: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bulb: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  };
  return icons[type] || icons.warranty;
};

// Related Product Card
const RelatedProductCard = ({ product }: { product: Product }) => (
  <Link href={`/product/${product.slug}`} className="group">
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-gray-50 p-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 group-hover:text-[#EAA832] transition-colors">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-[#EAA832]">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
      </div>
    </div>
  </Link>
);

// Main Product Page Component
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // JSON-LD for product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map(img => `https://voltlabs.in${img}`),
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "VoltLabs"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://voltlabs.in/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "VoltLabs"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} />
              <span className="text-xl font-bold text-gray-900">VoltLabs</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#products" className="text-gray-600 hover:text-[#EAA832] transition-colors">
                Products
              </Link>
              <Link href="/#about" className="text-gray-600 hover:text-[#EAA832] transition-colors">
                About
              </Link>
              <Link href="/#contact" className="text-gray-600 hover:text-[#EAA832] transition-colors">
                Contact
              </Link>
            </nav>
            <a
              href={product.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EAA832] hover:bg-[#D4922A] text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors"
            >
              Buy Now
            </a>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#EAA832]">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#products" className="text-gray-500 hover:text-[#EAA832]">Products</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden">
                <span className="absolute top-4 left-4 z-10 bg-[#EAA832] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  {product.badge}
                </span>
                <span className="absolute top-4 right-4 z-10 bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  {discount}% OFF
                </span>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4">
                  <svg className="w-8 h-8 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-gray-600 text-center">Genuine Product</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4">
                  <svg className="w-8 h-8 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-xs text-gray-600 text-center">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4">
                  <svg className="w-8 h-8 text-[#EAA832]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-gray-600 text-center">1 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">{product.shortDescription}</p>
              </div>

              <StarRating rating={product.rating} reviewCount={product.reviewCount} />

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#EAA832]">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={product.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#FF9900] hover:bg-[#e68a00] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.065.138.06.175.175.108.347-.057.13-.125.25-.204.359-1.614 2.19-4.313 3.286-8.094 3.286-4.226 0-8.03-1.335-11.404-4.002-.138-.116-.203-.238-.195-.366l.002-.03.038-.117c.06-.135.14-.253.243-.355l.233-.166zm9.694-3.663c-.18-.16-.18-.42 0-.58l.66-.66c.16-.16.42-.16.58 0l.99.99 2.31-2.31c.16-.16.42-.16.58 0l.66.66c.16.16.16.42 0 .58l-3.3 3.3c-.16.16-.42.16-.58 0l-1.9-1.98zM6.681 15.75c-.066 0-.135-.015-.203-.044l-1.16-.634c-.138-.072-.174-.196-.1-.37.072-.176.196-.247.37-.213l1.16.634c.138.072.174.196.1.37-.046.11-.097.185-.167.257zm2.476 1.167c-.066 0-.135-.015-.203-.044l-1.884-1.03c-.138-.072-.174-.196-.1-.37.072-.138.196-.174.37-.1l1.884 1.03c.138.072.174.196.1.37-.046.072-.097.11-.167.144zm-.848-3.506l-.848.38c-.138.058-.277.022-.37-.1-.094-.123-.064-.26.07-.37l.71-.385c.138-.095.277-.058.37.066.095.122.138.26.068.41zm4.328 2.083c-.057 0-.12-.012-.182-.035l-.56-.242c-.138-.058-.196-.182-.138-.32.058-.138.182-.196.32-.138l.56.24c.138.06.196.184.138.322-.043.107-.078.156-.138.173z" />
                  </svg>
                  Buy on Amazon
                </a>
                <a
                  href="https://wa.me/918178902630?text=Hi%20VoltLabs!%20I%20want%20to%20know%20more%20about%20the%20Modern%20Spiral%20Table%20Lamp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                {product.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#EAA832]/10 rounded-xl flex items-center justify-center text-[#EAA832] shrink-0">
                      <HighlightIcon type={highlight.icon} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{highlight.title}</h4>
                      <p className="text-sm text-gray-500">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Description & Specifications */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Description */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About This Product - Feature Points */}
        {product.aboutPoints && product.aboutPoints.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-16">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Product</h2>
              <ul className="space-y-4">
                {product.aboutPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#EAA832] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rp) => (
                <RelatedProductCard key={rp.slug} product={rp} />
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-6 mt-16">
          <div className="bg-gradient-to-r from-[#EAA832] to-[#D4922A] rounded-3xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Light Up Your Space?</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Order now and enjoy free shipping across India. Transform your home with VoltLabs smart lighting.
            </p>
            <a
              href={product.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#EAA832] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all"
            >
              Order Now - ₹{product.price}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-icon.png" alt="VoltLabs" width={40} height={40} />
              <span className="text-white font-semibold">VoltLabs</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">Terms</Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-white text-sm">Refund Policy</Link>
            </div>
            <p className="text-gray-500 text-sm">© 2026 VoltLabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
