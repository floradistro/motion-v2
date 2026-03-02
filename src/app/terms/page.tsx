import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Agreement to Terms",
    content: [
      "By accessing or using MOTION's website, products, or services, you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, please do not use our services.",
    ],
  },
  {
    number: "02",
    title: "Description of Service",
    content: [
      "MOTION provides e-commerce services including the sale of products through our online platform. We reserve the right to modify, suspend, or discontinue any aspect of our service at any time.",
    ],
  },
  {
    number: "03",
    title: "Eligibility",
    content: [
      {
        list: [
          "You must be at least 18 years old to use our services",
          "You must provide accurate and complete information",
          "You must comply with all applicable laws and regulations",
          "You may not use our services if prohibited by law",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Account Registration",
    content: [
      { subheading: "4.1 Account Creation" },
      {
        list: [
          "You may be required to create an account to access certain features",
          "You are responsible for maintaining account security",
          "You must notify us immediately of any unauthorized access",
          "You are responsible for all activities under your account",
        ],
      },
      { subheading: "4.2 Account Information" },
      {
        list: [
          "Provide accurate, current, and complete information",
          "Update information promptly when changes occur",
          "Do not share account credentials with others",
          "Use strong passwords and security measures",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Orders and Purchases",
    content: [
      { subheading: "5.1 Order Process" },
      {
        list: [
          "All orders are subject to acceptance by MOTION",
          "We reserve the right to refuse or cancel orders",
          "Prices are subject to change without notice",
          "Orders are not confirmed until payment is processed",
        ],
      },
      { subheading: "5.2 Payment Terms" },
      {
        list: [
          "Payment is due at time of order",
          "We accept major credit cards and approved payment methods",
          "All payments are processed securely through third-party processors",
          "You authorize us to charge your payment method for all purchases",
        ],
      },
      { subheading: "5.3 Pricing and Availability" },
      {
        list: [
          "All prices are in USD unless otherwise specified",
          "Prices include applicable taxes where required",
          "Product availability is subject to change",
          "We reserve the right to correct pricing errors",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Shipping and Delivery",
    content: [
      {
        list: [
          "Shipping terms are outlined in our Shipping Policy",
          "Delivery times are estimates and not guaranteed",
          "Risk of loss transfers upon delivery to carrier",
          "You are responsible for providing accurate shipping information",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Returns and Refunds",
    content: [
      {
        list: [
          "Return and refund terms are outlined in our Refund Policy",
          "Returns must be initiated within specified timeframes",
          "Products must be in original condition for return",
          "Refunds are processed to original payment method",
        ],
      },
    ],
  },
  {
    number: "08",
    title: "Intellectual Property",
    content: [
      { subheading: "8.1 Our Content" },
      {
        list: [
          "All website content is owned by MOTION or licensed to us",
          "Content is protected by copyright, trademark, and other laws",
          "You may not reproduce, distribute, or create derivative works",
          "Limited license granted for personal, non-commercial use",
        ],
      },
      { subheading: "8.2 User Content" },
      {
        list: [
          "You retain ownership of content you submit",
          "You grant us license to use, display, and distribute your content",
          "You represent that you have rights to submit content",
          "We may remove content that violates these Terms",
        ],
      },
    ],
  },
  {
    number: "09",
    title: "Prohibited Uses",
    content: [
      "You may not use our services to:",
      {
        list: [
          "Violate any laws or regulations",
          "Infringe on intellectual property rights",
          "Transmit harmful or malicious code",
          "Engage in fraudulent activities",
          "Harass or harm other users",
          "Interfere with service operation",
          "Collect user information without consent",
          "Use automated systems to access our services",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Privacy",
    content: [
      "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using our services, you consent to our privacy practices.",
    ],
  },
  {
    number: "11",
    title: "Disclaimers",
    content: [
      { subheading: "11.1 Service Availability" },
      {
        list: [
          "Services are provided \"as is\" and \"as available\"",
          "We do not guarantee uninterrupted service",
          "We may perform maintenance that affects availability",
          "We are not liable for service interruptions",
        ],
      },
      { subheading: "11.2 Product Information" },
      {
        list: [
          "We strive for accuracy in product descriptions",
          "Colors and images may vary from actual products",
          "We do not warrant product descriptions are error-free",
          "Products may be discontinued without notice",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law:",
      {
        list: [
          "Our liability is limited to the amount you paid for products",
          "We are not liable for indirect, incidental, or consequential damages",
          "We are not liable for lost profits or business interruption",
          "Some jurisdictions do not allow liability limitations",
        ],
      },
    ],
  },
  {
    number: "13",
    title: "Indemnification",
    content: [
      "You agree to indemnify and hold harmless MOTION from claims arising from:",
      {
        list: [
          "Your use of our services",
          "Your violation of these Terms",
          "Your violation of third-party rights",
          "Your negligent or wrongful conduct",
        ],
      },
    ],
  },
  {
    number: "14",
    title: "Termination",
    content: [
      { subheading: "14.1 Termination by You" },
      {
        list: [
          "You may terminate your account at any time",
          "Termination does not affect completed transactions",
          "You remain liable for charges incurred before termination",
        ],
      },
      { subheading: "14.2 Termination by Us" },
      {
        list: [
          "We may terminate accounts for Terms violations",
          "We may suspend services for investigation",
          "We may terminate services with or without notice",
          "Termination does not affect our rights or your obligations",
        ],
      },
    ],
  },
  {
    number: "15",
    title: "Governing Law",
    content: [
      "These Terms are governed by the laws of the United States and the state where MOTION is headquartered, without regard to conflict of law principles.",
    ],
  },
  {
    number: "16",
    title: "Dispute Resolution",
    content: [
      { subheading: "16.1 Informal Resolution" },
      "Before filing any legal action, you agree to attempt informal resolution by contacting us directly.",
      { subheading: "16.2 Arbitration" },
      "Disputes that cannot be resolved informally will be resolved through binding arbitration, except for:",
      {
        list: [
          "Small claims court matters",
          "Intellectual property disputes",
          "Injunctive relief requests",
        ],
      },
    ],
  },
  {
    number: "17",
    title: "Severability",
    content: [
      "If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.",
    ],
  },
  {
    number: "18",
    title: "Changes to Terms",
    content: [
      "We may update these Terms periodically. We will notify you of material changes by:",
      {
        list: [
          "Posting updated Terms on our website",
          "Sending email notifications",
          "Displaying prominent notices",
        ],
      },
      "Continued use of our services after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    number: "19",
    title: "Contact Information",
    content: [
      "For questions about these Terms, contact us:",
      "Email: legal@motion.com",
      "Response Time: We will respond within 5-7 business days",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyLayout
      label="Legal"
      title="Terms of"
      titleAccent="Service"
      subtitle="Please read these terms carefully before using MOTION's products and services."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/03370f2e-d450-4b8b-9c37-afbd7ce606fc.jpg"
      lastUpdated="August 25, 2025"
      effectiveDate="August 25, 2025"
      sections={sections}
      contactEmail="legal@motion.com"
      contactResponse="We will respond within 5-7 business days"
    />
  );
}
