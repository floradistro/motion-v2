import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Overview",
    content: [
      "MOTION offers subscription services that allow you to receive products on a recurring basis. This Subscription Policy outlines the terms and conditions governing our subscription services, including billing, delivery, modifications, and cancellation.",
    ],
  },
  {
    number: "02",
    title: "Subscription Services",
    content: [
      { subheading: "2.1 Available Subscriptions" },
      {
        list: [
          "Monthly subscriptions (delivered every 30 days)",
          "Bi-monthly subscriptions (delivered every 60 days)",
          "Quarterly subscriptions (delivered every 90 days)",
          "Custom frequency options for select products",
        ],
      },
      { subheading: "2.2 Subscription Products" },
      {
        list: [
          "Only eligible products can be added to subscriptions",
          "Subscription availability is indicated on product pages",
          "Product selection may vary based on availability",
          "New products may be added to subscription options",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Enrollment and Setup",
    content: [
      { subheading: "3.1 Subscription Enrollment" },
      {
        list: [
          "Select subscription option during checkout",
          "Choose delivery frequency that suits your needs",
          "Provide valid payment method for recurring billing",
          "Confirm subscription details before completing order",
        ],
      },
      { subheading: "3.2 Account Requirements" },
      {
        list: [
          "Account creation required for subscription management",
          "Maintain current contact and payment information",
          "Access subscription dashboard through your account",
          "Receive email confirmations for all subscription activities",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Billing and Payment",
    content: [
      { subheading: "4.1 Billing Cycle" },
      {
        list: [
          "Billing occurs automatically based on selected frequency",
          "First billing happens upon initial subscription order",
          "Subsequent billing occurs before each scheduled delivery",
          "Billing date remains consistent throughout subscription",
        ],
      },
      { subheading: "4.2 Payment Methods" },
      {
        list: [
          "Credit cards (Visa, MasterCard, American Express, Discover)",
          "Debit cards with credit card processing",
          "PayPal and other approved digital payment methods",
          "Payment method must remain valid for continued service",
        ],
      },
      { subheading: "4.3 Payment Processing" },
      {
        list: [
          "Automatic payment processing 1-2 days before shipment",
          "Email notification sent upon successful payment",
          "Failed payments result in subscription suspension",
          "Multiple payment retry attempts over 7 days",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Delivery and Shipping",
    content: [
      { subheading: "5.1 Delivery Schedule" },
      {
        list: [
          "Deliveries occur according to selected frequency",
          "Delivery dates may vary slightly due to processing and shipping",
          "Holiday periods may affect delivery timing",
          "Advance notice provided for any schedule changes",
        ],
      },
      { subheading: "5.2 Shipping Costs" },
      {
        list: [
          "Standard shipping included with all subscriptions",
          "Expedited shipping available for additional cost",
          "Free shipping thresholds apply to subscription orders",
          "International shipping available with additional fees",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Subscription Management",
    content: [
      { subheading: "6.1 Account Dashboard" },
      {
        list: [
          "View upcoming deliveries and billing dates",
          "Modify delivery frequency",
          "Update payment methods and shipping addresses",
          "Pause or cancel subscriptions",
        ],
      },
      { subheading: "6.2 Modifications" },
      {
        list: [
          "Changes must be made at least 48 hours before next billing",
          "Frequency changes take effect with next billing cycle",
          "Product substitutions subject to availability",
          "Quantity adjustments allowed within subscription limits",
        ],
      },
      { subheading: "6.3 Pausing Subscriptions" },
      {
        list: [
          "Pause subscriptions for up to 90 days",
          "No billing occurs during pause period",
          "Resume subscriptions at any time during pause",
          "Automatic resumption after 90 days unless cancelled",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Cancellation",
    content: [
      { subheading: "7.1 Cancellation Process" },
      {
        list: [
          "Cancel anytime through your account dashboard",
          "Contact customer service for cancellation assistance",
          "Cancellation must occur before next billing cycle",
          "Confirmation email sent upon successful cancellation",
        ],
      },
      { subheading: "7.2 Cancellation Timing" },
      {
        list: [
          "Cancel at least 48 hours before next billing date",
          "Late cancellations may result in one additional shipment",
          "No cancellation fees or penalties",
          "Immediate cancellation available for customer service issues",
        ],
      },
    ],
  },
  {
    number: "08",
    title: "Returns and Refunds",
    content: [
      {
        list: [
          "Subscription orders subject to standard return policy",
          "Individual shipments can be returned independently",
          "Refunds processed to original payment method",
          "Subscription continues unless specifically cancelled",
        ],
      },
    ],
  },
  {
    number: "09",
    title: "Product Availability",
    content: [
      {
        list: [
          "Substitute products may be provided if items unavailable",
          "Substitutions of equal or greater value",
          "Notification provided for any substitutions",
          "Option to decline substitutions and receive credit",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Customer Support",
    content: [
      "For subscription assistance, contact us:",
      "Email: subscriptions@motion.com",
      "Phone: 1-800-MOTION-2",
      "Hours: Monday-Friday, 8 AM - 8 PM EST",
      "Response Time: Within 24 hours",
    ],
  },
];

export default function SubscriptionPolicyPage() {
  return (
    <PolicyLayout
      label="Subscriptions"
      title="Subscription"
      titleAccent="Policy"
      subtitle="MOTION offers subscription services that allow you to receive products on a recurring basis."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/c994d190-26f1-4928-aa65-45c51e1f7fca.jpg"
      effectiveDate="August 25, 2025"
      lastUpdated="August 25, 2025"
      sections={sections}
      contactEmail="subscriptions@motion.com"
      contactPhone="1-800-MOTION-2"
      contactHours="Monday-Friday, 8 AM - 8 PM EST"
      contactResponse="Within 24 hours"
    />
  );
}
