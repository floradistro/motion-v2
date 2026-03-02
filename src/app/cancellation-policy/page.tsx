import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Overview",
    content: [
      "MOTION understands that circumstances may require order cancellation. This Cancellation Policy outlines the procedures, timeframes, and conditions for cancelling orders, subscriptions, and services.",
    ],
  },
  {
    number: "02",
    title: "Order Cancellation",
    content: [
      { subheading: "2.1 Standard Orders" },
      {
        list: [
          "Orders can be cancelled within 1 hour of placement",
          "Cancellation available if order has not entered processing",
          "No cancellation fees for orders cancelled within allowed timeframe",
          "Full refund issued to original payment method",
        ],
      },
      { subheading: "2.2 Cancellation Timeframes" },
      {
        list: [
          "Immediate cancellation: Within 1 hour of order placement",
          "Standard cancellation: Before order enters processing stage",
          "Processing stage: Order preparation has begun",
          "Shipped orders: Cannot be cancelled, subject to return policy",
        ],
      },
      { subheading: "2.3 Order Status Definitions" },
      {
        list: [
          "Pending: Order received, payment processing",
          "Confirmed: Payment approved, awaiting processing",
          "Processing: Order being prepared for shipment",
          "Shipped: Order dispatched from fulfillment center",
          "Delivered: Order received by customer",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "How to Cancel Orders",
    content: [
      { subheading: "3.1 Self-Service Cancellation" },
      {
        list: [
          "Log into your account and view order history",
          "Select the order you wish to cancel",
          "Click \"Cancel Order\" if option is available",
          "Confirm cancellation and receive email confirmation",
        ],
      },
      { subheading: "3.2 Customer Service Cancellation" },
      {
        list: [
          "Contact customer service if self-service option unavailable",
          "Provide order number and reason for cancellation",
          "Verification of account ownership required",
          "Cancellation confirmation provided via email",
        ],
      },
      { subheading: "3.3 Required Information" },
      {
        list: [
          "Order number",
          "Email address associated with order",
          "Billing address or phone number for verification",
          "Reason for cancellation (optional but helpful)",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Special Order Types",
    content: [
      { subheading: "4.1 Custom or Personalized Orders" },
      {
        list: [
          "Cancellation allowed within 2 hours of order placement",
          "No cancellation once customization process begins",
          "Custom orders are non-refundable once production starts",
          "Cancellation fees may apply for custom orders",
        ],
      },
      { subheading: "4.2 Pre-Orders" },
      {
        list: [
          "Pre-orders can be cancelled anytime before shipping",
          "Full refund issued for cancelled pre-orders",
          "Email notification sent when pre-order items become available",
          "Option to cancel provided in availability notification",
        ],
      },
      { subheading: "4.3 Backorders" },
      {
        list: [
          "Backorders can be cancelled at any time",
          "Partial cancellation available for multi-item backorders",
          "Refund issued for cancelled backordered items",
          "Remaining items continue to ship when available",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Subscription Cancellations",
    content: [
      { subheading: "5.1 Subscription Cancellation Process" },
      {
        list: [
          "Cancel anytime through account dashboard",
          "Contact customer service for assistance",
          "No cancellation fees or penalties",
          "Cancellation takes effect after current billing cycle",
        ],
      },
      { subheading: "5.2 Timing Requirements" },
      {
        list: [
          "Cancel at least 48 hours before next billing date",
          "Late cancellations may result in one additional charge",
          "Immediate cancellation available for billing disputes",
          "Confirmation email sent upon successful cancellation",
        ],
      },
      { subheading: "5.3 Subscription Pause vs. Cancellation" },
      {
        list: [
          "Pause: Temporary suspension up to 90 days",
          "Cancellation: Permanent termination of subscription",
          "Paused subscriptions can be resumed or cancelled",
          "Cancelled subscriptions require new enrollment to restart",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Refund Processing",
    content: [
      { subheading: "6.1 Refund Methods" },
      {
        list: [
          "Refunds issued to original payment method",
          "Credit card refunds: 3-5 business days",
          "PayPal refunds: 1-2 business days",
          "Bank transfers: 5-7 business days",
        ],
      },
      { subheading: "6.2 Refund Amounts" },
      {
        list: [
          "Full purchase price refunded for eligible cancellations",
          "Shipping costs refunded if order not shipped",
          "Processing fees may be deducted for certain payment methods",
          "Promotional discounts maintained in refund calculation",
        ],
      },
      { subheading: "6.3 Partial Cancellations" },
      {
        list: [
          "Individual items can be cancelled from multi-item orders",
          "Partial refund issued for cancelled items",
          "Remaining items continue to process and ship",
          "Shipping costs adjusted based on remaining order value",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Non-Cancellable Orders",
    content: [
      { subheading: "7.1 Orders That Cannot Be Cancelled" },
      {
        list: [
          "Orders already shipped from fulfillment center",
          "Custom orders in production",
          "Digital products after download/access granted",
          "Gift cards and store credit purchases",
        ],
      },
      { subheading: "7.2 Alternative Options" },
      {
        list: [
          "Return shipped orders upon delivery",
          "Exchange options for certain products",
          "Store credit for non-returnable items",
          "Contact customer service for special circumstances",
        ],
      },
    ],
  },
  {
    number: "08",
    title: "Cancellation Fees",
    content: [
      { subheading: "8.1 When Fees Apply" },
      {
        list: [
          "Custom orders after production begins",
          "Special handling or rush orders",
          "International orders with customs processing",
          "Third-party processing fees (rare circumstances)",
        ],
      },
      { subheading: "8.2 Fee Structure" },
      {
        list: [
          "Custom order cancellation: Up to 25% of order value",
          "Rush order cancellation: $15 processing fee",
          "International cancellation: Actual processing costs",
          "Fees disclosed before cancellation confirmation",
        ],
      },
    ],
  },
  {
    number: "09",
    title: "Force Majeure and Exceptional Circumstances",
    content: [
      {
        list: [
          "Orders may be cancelled due to inventory issues",
          "Natural disasters or shipping disruptions",
          "Supplier or manufacturing problems",
          "Full refund provided for company-initiated cancellations",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Dispute Resolution",
    content: [
      {
        list: [
          "Contact customer service for cancellation disputes",
          "Escalation process available for unresolved issues",
          "Documentation required for dispute claims",
          "Resolution typically provided within 5-7 business days",
        ],
      },
    ],
  },
  {
    number: "11",
    title: "Contact Information",
    content: [
      "For cancellation assistance:",
      "Email: cancellations@motion.com",
      "Phone: 1-800-MOTION-3",
      "Hours: Monday-Friday, 8 AM - 8 PM EST / Saturday: 10 AM - 4 PM EST",
      "Response Time: Within 2 hours during business hours",
    ],
  },
  {
    number: "12",
    title: "Policy Updates",
    content: [
      "Updates to this Cancellation Policy reflect process changes or legal requirements and will be posted with effective dates.",
    ],
  },
];

export default function CancellationPolicyPage() {
  return (
    <PolicyLayout
      label="Legal"
      title="Cancellation"
      titleAccent="Policy"
      subtitle="MOTION understands that circumstances may require order cancellation."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/371f1dca-0bfd-4795-87a1-585d3d9bbcc8.jpg"
      effectiveDate="August 25, 2025"
      lastUpdated="August 25, 2025"
      sections={sections}
      contactEmail="cancellations@motion.com"
      contactPhone="1-800-MOTION-3"
      contactHours="Monday-Friday, 8 AM - 8 PM EST / Saturday: 10 AM - 4 PM EST"
      contactResponse="Within 2 hours during business hours"
    />
  );
}
