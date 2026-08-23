"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import ProcessStrip from "@/components/ProcessStrip";
import ConnectedSection from "@/components/ConnectedSection";
import ProofStrip from "@/components/ProofStrip";
import Testimonial from "@/components/Testimonial";
import InsightsGrid from "@/components/InsightsGrid";
import ContactForm from "@/components/ContactForm";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-kompass-bg text-kompass-text flex flex-col justify-between selection:bg-kompass-teal selection:text-kompass-bg">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Full-bleed Hero section with vector silhouette overlay */}
        <Hero />

        {/* 3-card ecosystem showcase */}
        <ProductShowcase />

        {/* Operational Workflow Process Strip */}
        <ProcessStrip />

        {/* Connected solutions and interactive telemetry preview dashboard */}
        <ConnectedSection />

        {/* Proof items with sub-second values */}
        <ProofStrip />

        {/* Testimonials transition carousel */}
        <Testimonial />

        {/* 4-article grid linking future briefings */}
        <InsightsGrid />

        {/* Closing CTA Band */}
        <ClosingCta />

        {/* Interactive lead intake form */}
        <ContactForm />
      </main>

      {/* Deep multi-column info-rich footer */}
      <Footer />
    </div>
  );
}
