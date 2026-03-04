"use client";

import SectionHeader from "./SectionHeader";
import { aiProducts } from "@/constant/home";
import { motion, useInView, easeOut } from "framer-motion";
import { useRef } from "react";
import { CometCard } from "./ui/comet-card";

// ── Types ────────────────────────────────────────────────────────────────────

interface ProductTitle {
  titleStart?: string;
  highlight?: string;
  titleEnd?: string;
}

interface AiProduct {
  id: string | number;
  badge: string;
  title: ProductTitle;
  description: string;
  features: string[];
  component: React.ReactNode;
}

interface AnimatedProductCardProps {
  product: AiProduct;
  index: number;
}

// ── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

// ── Feature item: slides in from left, fades in ───────────────────────────────
const featureItem = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
};

// ── Animated Card ─────────────────────────────────────────────────────────────

const AnimatedProductCard = ({ product, index }: AnimatedProductCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Fires when 20% of the card is visible
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const isReversed = index % 2 !== 0;
  const textVariant = isReversed ? fadeRight : fadeLeft;
  const imageVariant = isReversed ? fadeLeft : fadeRight;

  return (
    <motion.div
      ref={ref}
      className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* TEXT SIDE */}
      <motion.div
        className={`space-y-6 ${isReversed ? "order-1 lg:order-2" : ""}`}
        variants={textVariant}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="text-xs uppercase tracking-widest text-(--purple) font-medium"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {product.badge}
        </motion.div>

        <motion.h3
          className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-neutral-900"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {product.title.titleStart && <span>{product.title.titleStart} </span>}
          {product.title.highlight && (
            <span className="gradient-text"> {product.title.highlight} </span>
          )}
          {product.title.titleEnd && <span>{product.title.titleEnd}</span>}
        </motion.h3>

        <motion.p
          className="text-neutral-500 text-lg leading-relaxed"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {product.description}
        </motion.p>

        {/* Feature list — staggered left-to-right fade */}
        <motion.ul
          className="space-y-3 text-neutral-700"
          variants={staggerContainer}
        >
          {product.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-2 list-none"
              variants={featureItem}
            >
              <motion.div
                className="gradient-bg-brand w-2 h-2 rounded-full shrink-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.12 }}
              />
              <span className="font-normal">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <CometCard translateDepth={10} rotateDepth={8.75}>
        {/* IMAGE SIDE */}
        <motion.div
          className={isReversed ? "order-2 lg:order-1" : ""}
          variants={imageVariant}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="relative rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {product.component}
          </motion.div>
        </motion.div>
      </CometCard>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────

const AiProductSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="ai-products"
      className="w-full max-w-7xl mx-auto py-16 lg:py-24 px-4 lg:px-6"
    >
      <div className="flex flex-col gap-8 lg:gap-16">
        {/* Animated Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeader
            badge="AI Products"
            titleStart="Accelerating Telecom's Evolution with"
            highlight="AI-Driven Innovation"
            description="Enterprise-grade digital transformation partner trusted by global telecom leaders. We bridge legacy systems to autonomous futures."
            centered={false}
          />
        </motion.div>

        {/* Animated Product Cards */}
        {aiProducts.map((product, index) => (
          <AnimatedProductCard
            key={product.id}
            product={product as AiProduct}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default AiProductSection;
