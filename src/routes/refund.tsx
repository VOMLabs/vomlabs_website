import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund")({ component: RefundPage });

function RefundPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Return and Refund Policy.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Information about returns, refunds, and cancellations.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Open Source Software">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Most VOMLabs software is provided as open source and is available
              free of charge. Because there is no monetary transaction for
              these products, standard return and refund rights do not apply.
              You may discontinue use at any time without penalty.
            </p>
          </Section>
          <Section title="Commercial Licenses">
            <p className="text-muted-foreground text-xs leading-relaxed">
              If you have purchased a commercial license or paid service from
              VOMLabs and believe you are entitled to a refund, please contact
              us within 14 days of purchase. Each request will be evaluated on
              a case-by-case basis. Refunds are not guaranteed and are granted
              at the sole discretion of VOMLabs.
            </p>
          </Section>
          <Section title="Processing">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Approved refunds will be processed within 14 business days using
              the original payment method. VOMLabs is not responsible for any
              fees imposed by payment processors in connection with the
              transaction.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For return and refund inquiries, contact us at:{" "}
              <a
                className="underline underline-offset-2 hover:text-foreground"
                href="mailto:support@vomlabs.com"
              >
                support@vomlabs.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-muted p-4 transition-colors duration-150 hover:border-foreground/20">
      <h2 className="mb-3 font-semibold text-sm">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
