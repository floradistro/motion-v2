import PolicyLayout, { type PolicySection } from "@/components/PolicyLayout";

const sections: PolicySection[] = [
  {
    number: "01",
    title: "Introduction",
    content: [
      "MOTION (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make a purchase, or interact with our services.",
    ],
  },
  {
    number: "02",
    title: "Information We Collect",
    content: [
      { subheading: "2.1 Personal Information" },
      {
        list: [
          "Name and contact information (email address, phone number, mailing address)",
          "Billing and shipping addresses",
          "Payment information (processed securely through third-party payment processors)",
          "Account credentials (username, password)",
          "Communication preferences",
          "Customer service interactions",
        ],
      },
      { subheading: "2.2 Automatically Collected Information" },
      {
        list: [
          "IP address and device identifiers",
          "Browser type and version",
          "Operating system",
          "Referring website addresses",
          "Pages viewed and time spent on our site",
          "Date and time of visits",
          "Clickstream data",
        ],
      },
      { subheading: "2.3 Cookies and Tracking Technologies" },
      {
        list: [
          "Essential cookies for website functionality",
          "Analytics cookies to understand site usage",
          "Marketing cookies for personalized advertising",
          "Social media cookies for sharing functionality",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: [
      { subheading: "3.1 Primary Uses" },
      {
        list: [
          "Process and fulfill orders",
          "Provide customer support",
          "Communicate about your orders and account",
          "Send marketing communications (with your consent)",
          "Improve our products and services",
          "Prevent fraud and enhance security",
          "Comply with legal obligations",
        ],
      },
      { subheading: "3.2 Marketing Communications" },
      {
        list: [
          "Product updates and new arrivals",
          "Special offers and promotions",
          "Newsletter and company updates",
          "Personalized recommendations",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Information Sharing and Disclosure",
    content: [
      { subheading: "4.1 Service Providers" },
      "We share information with trusted third-party service providers who assist us in:",
      {
        list: [
          "Payment processing",
          "Order fulfillment and shipping",
          "Email marketing",
          "Website analytics",
          "Customer support",
          "Fraud prevention",
        ],
      },
      { subheading: "4.2 Legal Requirements" },
      "We may disclose your information when required by law or to:",
      {
        list: [
          "Comply with legal processes",
          "Respond to government requests",
          "Protect our rights and property",
          "Ensure user safety",
          "Investigate potential violations",
        ],
      },
      { subheading: "4.3 Business Transfers" },
      "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.",
    ],
  },
  {
    number: "05",
    title: "Data Security",
    content: [
      {
        list: [
          "Industry-standard encryption for data transmission",
          "Secure servers and data storage",
          "Regular security assessments",
          "Limited access to personal information",
          "Employee training on data protection",
          "Incident response procedures",
        ],
      },
    ],
  },
  {
    number: "06",
    title: "Your Rights and Choices",
    content: [
      { subheading: "6.1 Access and Control" },
      {
        list: [
          "Access your personal information",
          "Correct inaccurate data",
          "Delete your account and data",
          "Export your data",
          "Restrict processing",
          "Object to certain uses",
        ],
      },
      { subheading: "6.2 Marketing Preferences" },
      {
        list: [
          "Unsubscribe from marketing emails",
          "Opt out of SMS communications",
          "Manage cookie preferences",
          "Control personalized advertising",
        ],
      },
    ],
  },
  {
    number: "07",
    title: "Data Retention",
    content: [
      "We retain your information for as long as necessary to:",
      {
        list: [
          "Provide our services",
          "Comply with legal obligations",
          "Resolve disputes",
          "Enforce our agreements",
        ],
      },
      "Account information is typically retained for 7 years after account closure. Marketing data is retained until you opt out or for 3 years of inactivity.",
    ],
  },
  {
    number: "08",
    title: "International Data Transfers",
    content: [
      "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.",
    ],
  },
  {
    number: "09",
    title: "Children\u2019s Privacy",
    content: [
      "Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.",
    ],
  },
  {
    number: "10",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.",
    ],
  },
  {
    number: "11",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy periodically. We will notify you of significant changes by:",
      {
        list: [
          "Posting the updated policy on our website",
          "Sending email notifications to registered users",
          "Displaying prominent notices on our site",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Contact Information",
    content: [
      "For questions about this Privacy Policy or to exercise your rights, contact us:",
      "Email: privacy@motion.com",
      "Response Time: We will respond to your inquiry within 30 days",
      "Data Protection Officer: Available for privacy-related inquiries",
    ],
  },
  {
    number: "13",
    title: "State-Specific Rights",
    content: [
      { subheading: "13.1 California Residents (CCPA)" },
      "California residents have additional rights including:",
      {
        list: [
          "Right to know what personal information is collected",
          "Right to delete personal information",
          "Right to opt out of sale of personal information",
          "Right to non-discrimination",
        ],
      },
      { subheading: "13.2 European Residents (GDPR)" },
      "European residents have rights including:",
      {
        list: [
          "Right of access",
          "Right to rectification",
          "Right to erasure",
          "Right to restrict processing",
          "Right to data portability",
          "Right to object",
        ],
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyLayout
      label="Legal"
      title="Privacy"
      titleAccent="Policy"
      subtitle="Your privacy matters to us. Here's how MOTION handles your data."
      heroImage="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/58E62E61-75D1-4A79-8BED-3A3FB8F9400D/standalone/4f953d15-4fdb-447b-93df-88926e61c15f.jpg"
      lastUpdated="August 25, 2025"
      effectiveDate="August 25, 2025"
      sections={sections}
      contactEmail="privacy@motion.com"
      contactResponse="We will respond to your inquiry within 30 days"
    />
  );
}
