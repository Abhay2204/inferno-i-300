import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  edition: string;
  price: number;
  image: string;
  description: string;
}

const ProductSection: React.FC = React.memo(() => {
  const products: Product[] = useMemo(() => [
    {
      id: 1,
      name: "Inferno i-300",
      edition: "Standard",
      price: 299,
      image: "/assets/images/prduct0.jpeg",
      description: "Essential gaming audio with titanium drivers and RGB lighting"
    },
    {
      id: 2,
      name: "Inferno i-300 Pro",
      edition: "Professional",
      price: 349,
      image: "/assets/images/product1.png",
      description: "Advanced ANC and premium materials for extended sessions"
    },
    {
      id: 3,
      name: "Inferno i-300 Elite",
      edition: "Elite",
      price: 399,
      image: "/assets/images/product2.png",
      description: "Spatial audio technology with wireless charging capability"
    },
    {
      id: 4,
      name: "Inferno i-300 Limited",
      edition: "Limited Edition",
      price: 449,
      image: "/assets/images/product3.png",
      description: "Hi-Res certified audio with exclusive premium accessories"
    }
  ], []);

  return (
    <section id="products" className="relative bg-[#fafafa] py-24">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-sm font-medium text-gray-500 mb-4 tracking-wide"
          >
            PRODUCT LINEUP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6"
          >
            Choose your Inferno
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Four editions designed for different levels of performance
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 will-change-transform"
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 will-change-transform"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-2">
                  {product.edition}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-semibold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:gap-3 transition-all group/btn">
                    <span>Buy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-600 mb-4">
            Need help choosing? <a href="#" className="text-gray-900 font-medium underline">Compare all models</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';

export default ProductSection;
