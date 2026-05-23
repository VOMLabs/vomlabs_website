export const metadata = {
  title: "Terms of Service - VOMLabs",
  description: "VOMLabs Terms of Service",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-red-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: April 2026
        </p>

        <div className="mt-8 space-y-6 text-neutral-600 dark:text-neutral-400">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing and using the VOMLabs website, you accept and agree
              to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Use License
            </h2>
            <p className="mt-2">
              Permission is granted to temporarily use VOMLabs websites and
              services for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              User Account Responsibilities
            </h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Prohibited Uses
            </h2>
            <p className="mt-2">
              You may not use our services to: violate any applicable laws or
              regulations, infringe upon the rights of others, or engage in any
              behavior that could harm VOMLabs or its users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Limitation of Liability
            </h2>
            <p className="mt-2">
              VOMLabs shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Changes to Terms
            </h2>
            <p className="mt-2">
              We reserve the right to modify these terms at any time. Your
              continued use of the website following any changes indicates your
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Contact Us
            </h2>
            <p className="mt-2">
              If you have any questions about these terms, please contact us at{" "}
              <a
                href="mailto:support@vomlabs.com"
                className="text-red-500 hover:underline dark:text-red-400"
              >
                support@vomlabs.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
