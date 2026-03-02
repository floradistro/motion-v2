"use client";

import { motion } from "framer-motion";
import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const quickRef = [
  {
    label: "Standard",
    time: "5–7 Business Days",
    price: "$5.99",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Expedited",
    time: "3–4 Business Days",
    price: "$9.99",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Express",
    time: "1–2 Business Days",
    price: "$19.99",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: "Overnight",
    time: "Next Business Day",
    price: "$29.99",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Overview",
    content: [
      "MOTION is committed to delivering your orders safely and efficiently. This Shipping Policy outlines our shipping methods, delivery times, costs, and terms for domestic and international orders.",
    ],
  },
  {
    number: "02",
    title: "Processing Time",
    content: [
      { subheading: "2.1 Standard Processing" },
      {
        list: [
          "Orders are processed within 1-2 business days",
          "Processing begins after payment confirmation",
          "Business days are Monday through Friday, excluding holidays",
          "Orders placed after 2 PM EST are processed the next business day",
        ],
      },
      { subheading: "2.2 Custom or Made-to-Order Items" },
      {
        list: [
          "Processing time varies by product (specified on product page)",
          "Typical processing time: 3-7 business days",
          "You will receive updates on processing status",
          "Rush processing may be available for additional fees",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Domestic Shipping (United States)",
    content: [
      { subheading: "3.1 Shipping Methods" },
      {
        table: {
          headers: ["Method", "Delivery Time", "Cost"],
          rows: [
            ["Standard Shipping", "5-7 business days", "$5.99"],
            ["Expedited Shipping", "3-4 business days", "$9.99"],
            ["Express Shipping", "1-2 business days", "$19.99"],
            ["Overnight Shipping", "Next business day", "$29.99"],
          ],
        },
      },
      { subheading: "3.2 Free Shipping" },
      {
        list: [
          "Free standard shipping on orders over $75",
          "Applies to standard shipping method only",
          "Excludes Alaska, Hawaii, and US territories",
          "Cannot be combined with other shipping promotions",
        ],
      },
      { subheading: "3.3 Shipping Carriers" },
      {
        list: [
          "USPS (United States Postal Service)",
          "UPS (United Parcel Service)",
          "FedEx",
          "Carrier selection based on destination and shipping method",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "International Shipping",
    content: [
      { subheading: "4.1 Available Countries" },
      "We ship to most countries worldwide. Shipping availability is determined at checkout based on your location.",
      { subheading: "4.2 International Shipping Methods" },
      {
        table: {
          headers: ["Method", "Delivery Time", "Cost"],
          rows: [
            ["International Standard", "7-14 business days", "$15.99"],
            ["International Express", "3-7 business days", "$39.99"],
          ],
        },
      },
      { subheading: "4.3 Customs and Duties" },
      {
        list: [
          "International orders may be subject to customs duties and taxes",
          "Customs fees are the responsibility of the recipient",
          "We declare accurate values on customs forms",
          "Delivery may be delayed due to customs processing",
          "We cannot predict or control customs fees",
        ],
      },
      { subheading: "4.4 Restricted Countries" },
      "We do not ship to countries under trade restrictions or embargoes. Current restrictions may apply to certain regions due to legal or logistical constraints.",
    ],
  },
  {
    number: "05",
    title: "Shipping Addresses",
    content: [
      { subheading: "5.1 Address Requirements" },
      {
        list: [
          "Provide complete and accurate shipping addresses",
          "Include apartment or suite numbers when applicable",
          "Ensure recipient name matches delivery address",
          "We are not responsible for delays due to incorrect addresses",
        ],
      },
      { subheading: "5.2 Address Changes" },
      {
        list: [
          "Address changes must be requested before shipment",
          "Contact customer service immediately for changes",
          "Address changes may incur additional fees",
          "Changes cannot be made after shipment",
        ],
      },
      { subheading: "5.3 PO Boxes and Military Addresses" },
      {
        list: [
          "We ship to PO Boxes via USPS only",
          "APO/FPO/DPO addresses are supported",
          "Delivery times may vary for military addresses",
          "Some shipping methods may not be available",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Order Tracking",
    content: [
      { subheading: "6.1 Tracking Information" },
      {
        list: [
          "Tracking numbers provided via email upon shipment",
          "Track orders through carrier websites or our order portal",
          "Tracking updates may take 24-48 hours to appear",
          "Contact us if tracking information is not received",
        ],
      },
      { subheading: "6.2 Delivery Confirmation" },
      {
        list: [
          "Signature confirmation required for orders over $200",
          "Delivery confirmation available through carrier tracking",
          "We are not responsible for packages marked as delivered",
          "Report delivery issues within 48 hours",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Delivery Issues",
    content: [
      { subheading: "7.1 Failed Delivery Attempts" },
      {
        list: [
          "Carriers typically make 3 delivery attempts",
          "Packages may be held at local facility for pickup",
          "Undeliverable packages are returned to us",
          "Return shipping fees may apply for reshipment",
        ],
      },
      { subheading: "7.2 Lost or Damaged Packages" },
      {
        list: [
          "Report lost or damaged packages within 48 hours of delivery date",
          "We will investigate with the carrier",
          "Replacement or refund provided for confirmed losses",
          "Photo evidence required for damage claims",
        ],
      },
      { subheading: "7.3 Stolen Packages" },
      {
        list: [
          "We are not responsible for packages stolen after delivery",
          "File police reports for stolen packages",
          "Consider delivery to secure locations or workplaces",
          "Signature confirmation recommended for high-value orders",
        ],
      },
    ],
  },
  {
    number: "08",
    title: "Special Shipping Situations",
    content: [
      { subheading: "8.1 Large or Heavy Items" },
      {
        list: [
          "Oversized items may require special shipping arrangements",
          "Additional shipping fees may apply",
          "Delivery appointments may be required",
          "White glove delivery available for select items",
        ],
      },
      { subheading: "8.2 Hazardous Materials" },
      {
        list: [
          "Certain products may have shipping restrictions",
          "Ground shipping only for hazardous materials",
          "International shipping may be prohibited",
          "Additional fees may apply for special handling",
        ],
      },
      { subheading: "8.3 Seasonal Delays" },
      {
        list: [
          "Expect delays during peak holiday seasons",
          "Weather conditions may affect delivery times",
          "We will communicate known delays proactively",
          "Consider expedited shipping during busy periods",
        ],
      },
    ],
  },
  {
    number: "09",
    title: "Shipping Insurance",
    content: [
      {
        list: [
          "All orders are automatically insured up to $100",
          "Additional insurance available for high-value orders",
          "Insurance covers loss or damage during transit",
          "Claims must be filed within specified timeframes",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Multiple Item Orders",
    content: [
      {
        list: [
          "Orders may ship in multiple packages",
          "Each package receives separate tracking information",
          "Shipping costs calculated per order, not per package",
          "Delivery dates may vary between packages",
        ],
      },
    ],
  },
  {
    number: "11",
    title: "Shipping Promotions",
    content: [
      {
        list: [
          "Promotional shipping offers have specific terms and conditions",
          "Promotions cannot be combined unless specified",
          "Standard shipping method applies unless upgraded",
          "Promotional terms override standard shipping policies",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Contact Information",
    content: [
      "For shipping questions or issues, contact us:",
      "Email: shipping@motion.com",
      "Phone: 1-800-MOTION-1",
      "Hours: Monday-Friday, 9 AM - 6 PM EST",
      "Response Time: Within 24 hours",
    ],
  },
  {
    number: "13",
    title: "Policy Updates",
    content: [
      "We may update this Shipping Policy to reflect changes in our services, carrier partnerships, or shipping costs. Updates will be posted on our website with the effective date.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <PolicyLayout
      label="Shipping"
      title="Shipping"
      titleAccent="Policy"
      subtitle="MOTION is committed to delivering your orders safely and efficiently."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/eb9336bd-0a60-45fe-b2fb-458b1f40c63b.jpg"
      effectiveDate="August 25, 2025"
      lastUpdated="August 25, 2025"
      sections={sections}
      contactEmail="shipping@motion.com"
      contactPhone="1-800-MOTION-1"
      contactHours="Monday-Friday, 9 AM - 6 PM EST"
      contactResponse="Within 24 hours"
    >
      {/* Quick Reference Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-14"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickRef.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-white/[0.04] bg-surface p-6 text-center hover:border-white/[0.08] transition-all duration-500"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan/[0.06] border border-cyan/[0.1] flex items-center justify-center text-cyan/80 mb-4">
                {item.icon}
              </div>
              <h3 className="text-sm font-light text-white mb-1.5 tracking-tight">
                {item.label}
              </h3>
              <p className="text-lg font-extralight text-gradient mb-1">
                {item.time}
              </p>
              <p className="text-[12px] text-muted/40 font-light">
                {item.price}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Free shipping note */}
        <div className="mt-4 text-center">
          <p className="text-[12px] tracking-[0.15em] uppercase text-cyan/60 font-light">
            Free standard shipping on orders over $75
          </p>
        </div>
      </motion.div>
    </PolicyLayout>
  );
}
