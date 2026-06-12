import { getAllFAQs } from "@/lib/faq";
import FAQContent from "@/components/faq/faq-content";

export default function FAQPage() {
  const faqs = getAllFAQs();

  return <FAQContent initialFAQs={faqs} />;
}
