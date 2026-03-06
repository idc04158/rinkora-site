import React from 'react';

const CHECKOUT_LINK = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL?.trim() || "";
const HAS_CHECKOUT_LINK = CHECKOUT_LINK.length > 0;

export default function JapanDistributorPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Max-width container for centered layout */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24">
        
        {/* 1. Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">
              Find verified Japanese beauty distributors and importers.
            </h2>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Japan Beauty Distributor <span className="text-indigo-600">Discovery Pack</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated database of 150 Japanese beauty distributors and importers designed for global brands entering the Japanese market.
            </p>
          </div>
          <div className="pt-4">
            <a
              href={HAS_CHECKOUT_LINK ? CHECKOUT_LINK : "#"}
              aria-disabled={!HAS_CHECKOUT_LINK}
              className={`inline-block px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg ${
                HAS_CHECKOUT_LINK
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none shadow-gray-200"
              }`}
            >
              Buy Now
            </a>
          </div>
        </section>

        {/* 2. What's Included */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "150 verified Japanese beauty distributors",
              "Importer / wholesaler classification",
              "Company website links",
              "Distributor category (retail, wholesale, importer)",
              "Outreach email templates",
              "Japan beauty distribution market guide"
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <svg className="h-6 w-6 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Who This Is For */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Who This Is For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Beauty brands entering Japan",
              "K-beauty startups expanding globally",
              "Export managers",
              "Beauty industry consultants"
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-800 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sample Data Table */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Sample Data Table</h2>
          <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">City</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">I-ne</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Distributor</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Osaka</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cosme Kitchen</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Retailer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Tokyo</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alpen Rose</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Importer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Tokyo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Pricing Section */}
        <section className="bg-indigo-600 rounded-3xl p-12 text-center text-white space-y-6 shadow-xl shadow-indigo-100">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Simple Pricing</h2>
            <div className="text-6xl font-extrabold">$49</div>
            <p className="text-indigo-100 text-lg">One-time purchase. Instant download.</p>
          </div>
          <div className="pt-4">
            <a
              href={HAS_CHECKOUT_LINK ? CHECKOUT_LINK : "#"}
              aria-disabled={!HAS_CHECKOUT_LINK}
              className={`inline-block px-10 py-4 rounded-full font-bold text-xl transition-colors shadow-lg ${
                HAS_CHECKOUT_LINK
                  ? "bg-white text-indigo-600 hover:bg-gray-100"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none shadow-gray-200"
              }`}
            >
              Buy Now
            </a>
          </div>
        </section>

        {/* 6. Footer Note */}
        <footer className="text-center pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm italic">
            Digital product. Instant download after purchase.
          </p>
        </footer>

      </main>
    </div>
  );
}
