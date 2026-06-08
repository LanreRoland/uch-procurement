import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileCheck, Scale } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Header */}
      <div className="bg-uch-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-uch-gold text-xs uppercase tracking-[0.25em] mb-3">About</p>
          <h1 className="font-display text-4xl font-bold mb-4">Procurement Department</h1>
          <p className="text-white/75 max-w-2xl text-lg leading-relaxed">
            The Procurement Department of University College Hospital, Ibadan ensures transparent,
            competitive, and accountable public procurement in line with Nigerian law.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Our Mission</h2>
            <div className="w-12 h-0.5 bg-uch-gold mb-5" />
            <p className="text-gray-600 leading-relaxed">
              To procure goods, services, and works for UCH Ibadan with the highest standards of
              transparency, value for money, and efficiency — ensuring that every naira spent
              serves the health needs of Nigerians.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Shield, title: "Transparency", text: "All tenders and awards are publicly disclosed on this portal." },
              { icon: FileCheck, title: "Compliance", text: "We operate strictly under the Public Procurement Act 2007 and BPP guidelines." },
              { icon: Scale, title: "Fairness", text: "Competitive bidding ensures equal opportunity for all registered vendors." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 items-start p-4 bg-uch-green-light rounded-lg">
                <span className="bg-uch-green text-white p-2 rounded-lg shrink-0">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policy */}
        <section id="policy" className="bg-gray-50 rounded-2xl p-8">
          <h2 className="section-title">Procurement Policy</h2>
          <div className="w-12 h-0.5 bg-uch-gold mb-6" />
          <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
            <p>
              UCH Ibadan&apos;s procurement activities are governed by the <strong>Public Procurement
              Act No. 14 of 2007</strong> and the regulations of the <strong>Bureau of Public Procurement
              (BPP)</strong>. The Act establishes harmonised standards and modern best practices for
              all public sector procurement in Nigeria.
            </p>
            <p>
              All contractors and suppliers are required to be registered with the BPP. Pre-qualification
              documents, bidding documents, and evaluation criteria are published on this portal and made
              available to all interested parties without discrimination.
            </p>
            <p>
              Interested vendors may submit bids in sealed envelopes to the Procurement Department on or
              before the stated deadline. Late submissions will not be considered.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
