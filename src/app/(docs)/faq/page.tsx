import FAQContent from "@/components/faq/faq-content";
import { getAllFAQs } from "@/lib/faq";

export default function FAQPage() {
  const faqs = getAllFAQs();

  return <FAQContent initialFAQs={faqs} />;
}
