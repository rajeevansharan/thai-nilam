import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';


const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLanding = (location.state )?.fromLanding === true;

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
              Privacy Policy
            </h1>
            <div className="h-1 w-20 bg-[#d4a017] mx-auto rounded-full"></div>
            <p className="mt-4 text-sm text-gray-500 uppercase tracking-widest font-bold">
              Last Updated: April 2026
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Introduction</h2>
              <p>
                Welcome to Thai Nilam Magazine. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Information We Collect</h2>
              <p className="mb-2">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Account Data:</strong> includes your purchase history and saved preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Payment Information</h2>
              <p>
                All payments for magazine issues are processed securely via our payment partner, PayHere. Thai Nilam does not store, process, or transmit your credit card details or bank account information on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. How We Use Your Data</h2>
              <p className="mb-2">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To register you as a new user and manage your account.</li>
                <li>To process and deliver your magazine purchases.</li>
                <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
                <li>To control access to premium content based on your purchase history.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Data Sharing</h2>
              <p>
                We do not sell your personal data to third parties. We may share your personal data with trusted third parties only when necessary, such as with our payment provider (PayHere) to process your transactions, or to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to those employees and agents who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Your Legal Rights</h2>
              <p className="mb-2">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of the personal data that we hold about you.</li>
                <li>Request erasure of your personal data (delete your account).</li>
              </ul>
              <p className="mt-2">If you wish to exercise any of the rights set out above, please contact us.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Cookies</h2>
              <p>
                We use strictly necessary cookies to keep you logged in and remember your preferences. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this application may become inaccessible or not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, including any requests to exercise your legal rights, please contact us at <strong>thaainilampublications@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
