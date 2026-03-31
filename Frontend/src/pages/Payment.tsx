import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CreditCard, Lock, CheckCircle, ShieldCheck, ArrowRight, Loader2, Info } from 'lucide-react';

interface PaymentProps {
  onNavigate: (page: string) => void;
  issue: any;
  user: any;
}

const Payment: React.FC<PaymentProps> = ({ onNavigate, issue }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Processing, 3: Success

  if (!issue) {
    onNavigate('home');
    return null;
  }

  const handlePayment = () => {
    setStep(2);
    // Simulate payment processing
    setTimeout(() => {
      setStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="library" onNavigate={onNavigate} />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-12 md:py-20">
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Magazine Details & Content Preview */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                      <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-600 mb-2">{issue.month}</p>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{issue.title}</h1>
                    <p className="text-gray-600 leading-relaxed italic mb-6">
                      {issue.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Digital Edition
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Secure Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Preview Images */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-semibold text-gray-900">Inside this Edition</h2>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Sneak Peek</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {issue.contentImages && issue.contentImages.length > 0 ? (
                    issue.contentImages.map((img: any, idx: number) => (
                      <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-sm transition-transform hover:scale-[1.02]">
                        <img 
                          src={img.url.startsWith('http') ? img.url : `http://localhost:5000/${img.url.replace(/\\/g, "/")}`} 
                          alt={`Preview ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))
                  ) : (
                    // Fallback placeholders if no content images found
                    [1, 2, 3].map((_, idx) => (
                      <div key={idx} className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200">
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Preview {idx + 1}</span>
                      </div>
                    ))
                  )}
                </div>
                <p className="text-xs text-center text-gray-400 italic">
                  * Unlock the full issue to view all 60+ pages of high-resolution content.
                </p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-8">Secure Checkout</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between py-4 border-b border-gray-50">
                    <span className="text-gray-500">Edition Price</span>
                    <span className="font-bold text-gray-900">{issue.price || '$4.99'}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-50">
                    <span className="text-gray-500">Platform Fee</span>
                    <span className="font-bold text-emerald-500">FREE</span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-gray-900 font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-amber-600">{issue.price || '$4.99'}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment Method</p>
                  <div className="p-4 border-2 border-amber-500 bg-amber-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Credit / Debit Card</p>
                        <p className="text-[10px] text-gray-500">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-amber-600 fill-amber-600/10" />
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="w-full py-4 bg-[#0a0d16] text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/10"
                >
                  Pay Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-6 opacity-40">
                  <span className="text-[10px] font-bold uppercase tracking-widest grayscale">Checkout</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest grayscale">Stripe</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest grayscale">PayPal</span>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Once purchased, this edition will be permanently added to your library and accessible from any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-amber-100 rounded-full"></div>
              <Loader2 className="absolute inset-0 w-full h-full text-amber-500 animate-spin" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Processing Payment</h2>
            <p className="text-gray-500">Please do not refresh the page or close this window. We are securing your transaction.</p>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-lg mx-auto text-center py-20 bg-white rounded-3xl p-12 shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Unlock Successful!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Congratulations! You now have full access to <span className="font-bold text-gray-900">"{issue.title}"</span>. 
              The digital edition has been added to your library.
            </p>
            
            <div className="space-y-4">
               <button 
                onClick={() => onNavigate('library')}
                className="w-full py-4 bg-amber-500 text-[#0a0d16] rounded-xl font-bold text-sm hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group"
              >
                Go to My Library
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="w-full py-4 text-gray-500 font-bold text-sm hover:text-gray-700 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
