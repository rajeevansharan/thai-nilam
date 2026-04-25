import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';


const TermsConditions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLanding = (location.state)?.fromLanding === true;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (fromLanding) {
      navigate('/');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#d4a017] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          BACK
        </button>
      </div>
      
      <main className="flex-grow flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] mb-4">
              Terms & Conditions
            </h1>
            <div className="h-1 w-20 bg-[#d4a017] mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-gray-500 uppercase tracking-widest font-bold">
              Last Updated: April 2026
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Thai Nilam Magazine digital platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. User Accounts & Responsibilities</h2>
              <p>
                To access premium content, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when registering.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Payment Terms</h2>
              <p>
                Thai Nilam operates on a pay-per-issue model. You can purchase individual magazine issues to gain access to their content. All payments are securely processed through our authorized payment gateway, PayHere. All sales are final and non-refundable unless otherwise required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Access Rules</h2>
              <p>
                Once an issue is purchased, you are granted a non-exclusive, non-transferable right to access and read the issue through our platform anytime, subject to the availability of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. No Download & Redistribution Policy</h2>
              <p className="mb-2">To protect our intellectual property and the hard work of our contributors, you agree that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You will not attempt to download, save, or extract the PDF files or contents from our platform.</li>
                <li>You will not redistribute, share, copy, reproduce, or publish any part of the magazine content without explicit written permission.</li>
                <li>Your access is for personal, non-commercial use only.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Intellectual Property Rights</h2>
              <p>
                All content, including but not limited to articles, images, logos, graphics, and software, is the property of Thai Nilam Magazine or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Account Suspension & Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account and access to the platform immediately, without prior notice or liability, if you breach any of these Terms and Conditions, especially our redistribution policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Limitation of Liability</h2>
              <p>
                Thai Nilam Magazine and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes by updating the date at the top of this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
