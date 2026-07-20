import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — KhanaBook" },
      {
        name: "description",
        content: `Privacy Policy for KhanaBook, a product of ${BUSINESS.legalName}.`,
      },
      { property: "og:url", content: absUrl("/privacy-policy") },
    ],
    links: [{ rel: "canonical", href: absUrl("/privacy-policy") }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <Section
      eyebrow="Legal"
      title={
        <>
          Privacy <span className="hl">Policy.</span>
        </>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <p>
          This Privacy Policy describes how{" "}
          <strong className="text-foreground">{BUSINESS.legalName}</strong> ("we", "us") handles
          personal information in relation to the KhanaBook restaurant POS product.
        </p>
        <p>
          <em>
            Effective date: {BUSINESS.effectiveDate}. Last updated: {BUSINESS.lastUpdatedDate}.
          </em>
        </p>

        <Block title="Data we collect">
          We collect restaurant and account information such as business name, contact details and
          staff login details; customer details entered by the restaurant, such as a name or phone
          number; bills, orders, invoices, menu, inventory and payment-mode records; and device,
          synchronisation and diagnostic information needed to operate and support KhanaBook.
        </Block>
        <Block title="Local device storage and offline use">
          KhanaBook stores operational records on the Android device so billing, menu access and KOT
          printing can continue during temporary connectivity interruptions. Anyone with authorised
          access to the device may be able to access data available to their KhanaBook role.
        </Block>
        <Block title="Cloud synchronisation">
          When connectivity is available, eligible records are synchronised to our cloud
          infrastructure for backup, account operation and restaurant-level reporting across
          approved terminals.
        </Block>
        <Block title="Menu photo import">
          When you choose the menu-photo import feature, the selected image is processed on the
          Android device to suggest menu text. You should review extracted names and prices before
          saving them.
        </Block>
        <Block title="Invoice sharing and exports">
          When you choose to share an invoice through WhatsApp, SMS or another installed service,
          recipient information and the shared content are handled by that service under its own
          privacy terms. PDF or CSV files exported from KhanaBook are controlled by the restaurant
          after export.
        </Block>
        <Block title="Payment information">
          KhanaBook currently records payment modes and references entered by the restaurant. It
          does not currently process or verify customer payments through an integrated payment
          gateway.
        </Block>
        <Block title="Service providers">
          We may use hosting, communications, diagnostics, support and form-processing providers to
          operate KhanaBook and this website. We share only the information reasonably needed for
          the requested service and require providers to handle it under applicable terms and law.
        </Block>
        <Block title="Retention">
          We retain information while an account is active and afterward only for legitimate
          operational, security, backup or legal requirements. The exact period depends on the
          record and applicable law. You may contact us to request deletion; some records may need
          to be retained where the law requires it.
        </Block>
        <Block title="Security">
          {DISCLAIMERS.security} No storage or transmission method can be guaranteed to be
          completely secure.
        </Block>
        <Block title="Your choices and rights">
          You may request access, correction, export or deletion of personal information by
          contacting us. We may need to verify the request and may retain information where required
          by law or needed to protect legitimate rights.
        </Block>
        <Block title="Privacy and grievance contact">
          {BUSINESS.grievanceOfficer ? <>Grievance Officer: {BUSINESS.grievanceOfficer}. </> : null}
          Email: {BUSINESS.supportEmail}. Address: {BUSINESS.registeredAddress}.
        </Block>
      </div>
    </Section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-black text-foreground mb-2">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
