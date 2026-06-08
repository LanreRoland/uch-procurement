import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact | UCH Procurement Portal",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-uch-green text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Reach the UCH Procurement Department for enquiries about tenders,
              contracts, and procurement notices.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-7">
              <h2 className="font-display text-2xl font-bold text-uch-green">
                Procurement Department
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Procurement Department of the University College Hospital (UCH),
                Ibadan, is responsible for the procurement of goods, works, and services
                in compliance with the Public Procurement Act 2007 and the Bureau of
                Public Procurement (BPP) guidelines.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "Procurement Department, University College Hospital,\nQueen Elizabeth Road, Ibadan, Oyo State, Nigeria.",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+234 (0) 2 241 1768",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "procurement@uchibadan.edu.ng",
                  },
                  {
                    icon: Clock,
                    label: "Office Hours",
                    value: "Monday – Friday: 8:00 am – 4:00 pm\n(Closed on Public Holidays)",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 bg-uch-green-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-uch-green" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                      <p className="text-gray-700 text-sm whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note to vendors */}
            <div className="bg-uch-green-light border border-uch-green/20 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-uch-green mb-4">Note to Vendors & Suppliers</h3>
              <ul className="space-y-3 text-sm text-gray-700 leading-relaxed list-none">
                {[
                  "All procurement activities are conducted in strict compliance with the Public Procurement Act 2007.",
                  "Tender documents must be obtained from the Procurement Department. Unofficial copies are not accepted.",
                  "No procurement officer is authorised to request payment or gifts outside the official tender process.",
                  "To report corruption or malpractice, contact the Bureau of Public Procurement (BPP) at www.bpp.gov.ng.",
                  "Bids must be submitted in sealed envelopes and delivered in person before the stated deadline.",
                ].map((point, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-uch-green text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
