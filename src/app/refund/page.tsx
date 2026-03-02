"use client";

import { motion } from "framer-motion";
import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const returnSteps = [
  {
    number: "01",
    title: "Request",
    description:
      "Log into your account, select the order, and initiate a return to receive your RMA number.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Ship",
    description:
      "Use the prepaid return label, pack the item in original packaging, and drop it off.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-2.25 0h-2.25m0 0V4.5A1.125 1.125 0 0110.875 3.375h2.25A1.125 1.125 0 0114.25 4.5v3.75m-4.5 0h4.5"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Refund",
    description:
      "Once received and inspected, your refund is processed to your original payment method.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
  },
];

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Overview",
    content: [
      "MOTION stands behind the quality of our products and wants you to be completely satisfied with your purchase. This Refund Policy outlines our procedures for returns, exchanges, and refunds to ensure a fair and transparent process for all customers.",
    ],
  },
  {
    number: "02",
    title: "Return Eligibility",
    content: [
      { subheading: "2.1 General Return Requirements" },
      {
        list: [
          "Items must be returned within 30 days of delivery",
          "Products must be in original, unused condition",
          "Original packaging and tags must be included",
          "Proof of purchase required (order confirmation or receipt)",
        ],
      },
      { subheading: "2.2 Condition Requirements" },
      {
        list: [
          "Items must be unworn, unwashed, and undamaged",
          "All original tags and labels must be attached",
          "Products must be free from odors, stains, or damage",
          "Packaging should be in resalable condition",
        ],
      },
      { subheading: "2.3 Return Window" },
      {
        list: [
          "30-day return window starts from delivery date",
          "Holiday purchases: Extended return period until January 31",
          "Defective items: 90-day return window",
          "Custom orders: No returns unless defective",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Non-Returnable Items",
    content: [
      { subheading: "3.1 Excluded Products" },
      {
        list: [
          "Custom or personalized items",
          "Intimate apparel and undergarments",
          "Perishable goods and consumables",
          "Digital products and downloads",
          "Gift cards and store credit",
          "Final sale or clearance items",
        ],
      },
      { subheading: "3.2 Health and Safety Items" },
      {
        list: [
          "Personal care products",
          "Items that come into contact with skin",
          "Products with broken safety seals",
          "Items with hygiene considerations",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Return Process",
    content: [
      { subheading: "4.1 Initiating a Return" },
      {
        list: [
          "Log into your account and select the order",
          "Click \u201cReturn Items\u201d and select products to return",
          "Choose reason for return from dropdown menu",
          "Print prepaid return shipping label",
        ],
      },
      { subheading: "4.2 Return Authorization" },
      {
        list: [
          "Return Merchandise Authorization (RMA) number provided",
          "Include RMA number on return package",
          "Returns without RMA may experience processing delays",
          "RMA valid for 14 days from issue date",
        ],
      },
      { subheading: "4.3 Packaging and Shipping" },
      {
        list: [
          "Use original packaging when possible",
          "Secure items to prevent damage during transit",
          "Include all accessories and documentation",
          "Use provided prepaid return label",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Refund Processing",
    content: [
      { subheading: "5.1 Inspection Process" },
      {
        list: [
          "Items inspected within 2-3 business days of receipt",
          "Verification of condition and eligibility",
          "Quality control check for defects or damage",
          "Email notification sent upon inspection completion",
        ],
      },
      { subheading: "5.2 Refund Methods" },
      {
        list: [
          "Original payment method (credit card, PayPal, etc.)",
          "Store credit option for faster processing",
          "Gift card refunds for gift purchases",
          "Cash refunds not available for online orders",
        ],
      },
      { subheading: "5.3 Refund Timeframes" },
      {
        list: [
          "Credit card refunds: 5-7 business days",
          "PayPal refunds: 1-3 business days",
          "Bank transfer refunds: 7-10 business days",
          "Store credit: Immediate upon approval",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Refund Amounts",
    content: [
      { subheading: "6.1 Full Refunds" },
      {
        list: [
          "Purchase price refunded for eligible returns",
          "Original shipping costs refunded if entire order returned",
          "Taxes refunded according to applicable laws",
          "Promotional discounts maintained in refund calculation",
        ],
      },
      { subheading: "6.2 Partial Refunds" },
      {
        list: [
          "Items showing signs of use: Up to 50% refund",
          "Missing accessories or packaging: Deduction applied",
          "Damaged items due to misuse: Partial refund or denial",
          "Late returns (31-45 days): 50% refund",
        ],
      },
      { subheading: "6.3 Shipping Costs" },
      {
        list: [
          "Original shipping costs refunded for defective items",
          "Free return shipping for defective or incorrect items",
          "Customer pays return shipping for change of mind",
          "Expedited shipping costs generally non-refundable",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Exchanges",
    content: [
      { subheading: "7.1 Exchange Process" },
      {
        list: [
          "Select \u201cExchange\u201d option when initiating return",
          "Choose replacement size, color, or style",
          "Price difference charged or refunded as applicable",
          "New item shipped upon receipt of returned item",
        ],
      },
      { subheading: "7.2 Exchange Limitations" },
      {
        list: [
          "Exchanges available for same product in different size/color",
          "Different products require separate return and purchase",
          "One exchange allowed per original purchase",
          "Exchange items subject to availability",
        ],
      },
    ],
  },
  {
    number: "08",
    title: "Defective or Incorrect Items",
    content: [
      { subheading: "8.1 Defective Products" },
      {
        list: [
          "Manufacturing defects covered under warranty",
          "Damage during shipping covered by return policy",
          "Report defects within 7 days of delivery",
          "Photo evidence may be requested",
        ],
      },
      { subheading: "8.2 Incorrect Orders" },
      {
        list: [
          "Wrong item sent due to fulfillment error",
          "Incorrect size, color, or style shipped",
          "Missing items from order",
          "Expedited replacement processing",
        ],
      },
      { subheading: "8.3 Resolution Options" },
      {
        list: [
          "Full refund including shipping costs",
          "Free replacement item",
          "Store credit with bonus amount",
          "Partial refund for minor defects",
        ],
      },
    ],
  },
  {
    number: "09",
    title: "International Returns",
    content: [
      { subheading: "9.1 International Return Process" },
      {
        list: [
          "Contact customer service before returning",
          "Customer responsible for return shipping costs",
          "Customs forms and declarations required",
          "Extended processing time for international returns",
        ],
      },
      { subheading: "9.2 International Refund Considerations" },
      {
        list: [
          "Currency conversion rates may affect refund amount",
          "Bank fees may be deducted from refund",
          "Customs duties and taxes non-refundable",
          "Local return options may be available",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Subscription Refunds",
    content: [
      { subheading: "10.1 Subscription Order Returns" },
      {
        list: [
          "Individual subscription shipments can be returned",
          "Standard return policy applies to each shipment",
          "Subscription continues unless cancelled separately",
          "Refunds processed independently for each shipment",
        ],
      },
      { subheading: "10.2 Subscription Cancellation Refunds" },
      {
        list: [
          "No refunds for previous subscription charges",
          "Prorated refunds not available",
          "Final shipment may be cancelled if not processed",
          "Unused subscription credits may be refunded",
        ],
      },
    ],
  },
  {
    number: "11",
    title: "Gift Returns",
    content: [
      { subheading: "11.1 Gift Return Process" },
      {
        list: [
          "Gift recipients can return items without original receipt",
          "Refund issued as store credit or gift card",
          "Original purchaser can process return for cash refund",
          "Gift message or order number helpful for processing",
        ],
      },
      { subheading: "11.2 Gift Card Refunds" },
      {
        list: [
          "Gift cards are non-refundable",
          "Unused gift card balances do not expire",
          "Lost or stolen gift cards may be replaced with proof of purchase",
          "Gift card terms and conditions apply",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Dispute Resolution",
    content: [
      { subheading: "12.1 Return Disputes" },
      {
        list: [
          "Contact customer service for return issues",
          "Provide photos and detailed description",
          "Escalation process available for unresolved disputes",
          "Final decision made by customer service manager",
        ],
      },
      { subheading: "12.2 Chargeback Protection" },
      {
        list: [
          "Contact us before initiating chargebacks",
          "Provide opportunity to resolve issues directly",
          "Documentation maintained for chargeback defense",
          "Account restrictions may apply for excessive chargebacks",
        ],
      },
    ],
  },
  {
    number: "13",
    title: "Contact Information",
    content: [
      "For refund questions or assistance:",
      "Email: returns@motion.com",
      "Phone: 1-800-MOTION-5",
      "Hours: Monday-Friday, 8 AM - 8 PM EST / Saturday: 10 AM - 4 PM EST",
      "Response Time: Within 24 hours",
    ],
  },
  {
    number: "14",
    title: "Policy Updates",
    content: [
      "We may update this Refund Policy to reflect changes in our processes, legal requirements, or customer feedback. Updates will be posted on our website with the effective date.",
    ],
  },
];

export default function RefundPage() {
  return (
    <PolicyLayout
      label="Returns"
      title="Refund"
      titleAccent="Policy"
      subtitle="We stand behind every product we make. If you're not completely satisfied, we'll make it right."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/157cb292-183b-4e28-86c6-40f5f7a54b5e.jpg"
      effectiveDate="August 25, 2025"
      lastUpdated="August 25, 2025"
      sections={sections}
      contactEmail="returns@motion.com"
      contactPhone="1-800-MOTION-5"
      contactHours="Monday-Friday, 8 AM - 8 PM EST / Saturday: 10 AM - 4 PM EST"
      contactResponse="Response Time: Within 24 hours"
    >
      {/* 30-Day Money-Back Guarantee Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-14"
      >
        <div className="relative rounded-2xl border border-cyan/[0.15] bg-cyan/[0.03] p-8 sm:p-10 text-center overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan/[0.08] border border-cyan/[0.15] text-cyan/80 mb-6">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white mb-3">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-sm text-muted/50 font-light leading-relaxed max-w-lg mx-auto">
              MOTION stands behind the quality of our products and wants you to
              be completely satisfied with your purchase. This Refund Policy
              outlines our procedures for returns, exchanges, and refunds to
              ensure a fair and transparent process for all customers.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] tracking-[0.2em] uppercase text-cyan/60 font-light">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan/60" />
                Free Returns
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan/60" />
                No Restocking Fees
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan/60" />
                Fast Processing
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3-Step Returns Process */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="text-center mb-10">
          <span className="text-[11px] tracking-[0.25em] uppercase text-muted/80 block">
            Simple Process
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extralight tracking-tight">
            How Returns <span className="text-gradient">Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          {returnSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center"
            >
              {i < returnSteps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+36px)] w-[calc(100%-36px)] h-px">
                  <div className="w-full h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                </div>
              )}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan/[0.04] border border-white/[0.06] text-cyan/70 mb-4">
                {step.icon}
              </div>
              <div className="text-[11px] font-mono text-muted/30 tracking-[0.3em] mb-2">
                {step.number}
              </div>
              <h3 className="text-base font-light mb-2 text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted/50 max-w-[220px] mx-auto leading-relaxed text-sm font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Divider before sections */}
      <div className="mb-14 section-divider" />
    </PolicyLayout>
  );
}
