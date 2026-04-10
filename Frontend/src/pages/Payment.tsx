import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MagazinePreview from "../components/MagazinePreview";
import {
  Lock,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Calendar,
  User as UserIcon,
  CreditCard as CardIcon,
  FileUp,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadReceipt } from "../services/purchaseService";

interface PaymentProps {
  onNavigate: (page: string) => void;
  issue: any;
  user: any;
}

const Payment: React.FC<PaymentProps> = ({ onNavigate, issue, user }) => {
  const [step, setStep] = useState(1); // 1: Checkout, 2: Success
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'receipt'>('card');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!issue) {
      onNavigate("library");
    }
    window.scrollTo(0, 0);
  }, [issue]);

  if (!issue) return null;

  // Auto-format card number
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Auto-format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onNavigate("login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === 'receipt') {
        if (!receiptFile) {
          setError("Please upload a receipt file.");
          setLoading(false);
          return;
        }
        await uploadReceipt(user.id, issue.id, issue.price || 500, receiptFile);
        setStep(2);
      } else {
        // Simulating card payment success for now
        setTimeout(() => {
          setLoading(false);
          setStep(2);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
        return;
      }
    } catch (err: any) {
      setError("Failed to process payment. Please try again.");
      console.error(err);
    } finally {
      if (paymentMethod === 'receipt') setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Header activePage="library" onNavigate={onNavigate} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 md:py-16 space-y-16">
        {step === 1 ? (
          <>
            {/* Top Section: Magazine Preview */}
            <MagazinePreview issue={issue} />

            {/* Bottom Section: Payment Section */}
            <section id="payment" className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Payment Form Card */}
                <div className="lg:col-span-8 h-full">
                  <motion.div 
                    layout
                    className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-10 md:p-12 h-full"
                  >
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a017] mb-5">Select Payment Method</p>
                        <div className="flex flex-col md:flex-row gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 p-5 rounded-xl border-[1.5px] transition-all flex flex-col items-center justify-center gap-1.5 group ${
                              paymentMethod === 'card' 
                              ? 'border-[#d4a017] bg-[#fffcf0]' 
                              : 'border-gray-100 bg-white hover:border-[#d4a017]/30'
                            }`}
                          >
                            <CardIcon className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#d4a017]' : 'text-gray-400'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${paymentMethod === 'card' ? 'text-[#d4a017]' : 'text-gray-500'}`}>Card</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('receipt')}
                            className={`flex-1 p-5 rounded-xl border-[1.5px] transition-all flex flex-col items-center justify-center gap-1.5 group ${
                              paymentMethod === 'receipt' 
                              ? 'border-[#d4a017] bg-[#fffcf0]' 
                              : 'border-gray-100 bg-white hover:border-[#d4a017]/30'
                            }`}
                          >
                            <FileUp className={`w-6 h-6 ${paymentMethod === 'receipt' ? 'text-[#d4a017]' : 'text-gray-400'}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${paymentMethod === 'receipt' ? 'text-[#d4a017]' : 'text-gray-500'}`}>Upload Receipt</span>
                          </button>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {paymentMethod === 'card' ? (
                          <motion.div 
                            key="card-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                          >
                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">Cardholder Name</label>
                              <div className="relative group">
                                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] group-focus-within:text-[#1e293b] transition-colors" />
                                <input 
                                  required={paymentMethod === 'card'}
                                  type="text"
                                  placeholder="J. Smith"
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value)}
                                  className="w-full bg-[#f8fafc] border border-transparent focus:border-[#e2e8f0] focus:bg-white rounded-xl pl-14 pr-6 py-5 text-sm transition-all focus:outline-none placeholder:text-[#cbd5e1] text-[#1e293b] font-medium"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">Card Number</label>
                              <div className="relative group">
                                <CardIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] group-focus-within:text-[#1e293b] transition-colors" />
                                <input 
                                  required={paymentMethod === 'card'}
                                  type="text"
                                  placeholder="0000 0000 0000 0000"
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                  className="w-full bg-[#f8fafc] border border-transparent focus:border-[#e2e8f0] focus:bg-white rounded-xl pl-14 pr-6 py-5 text-sm transition-all focus:outline-none placeholder:text-[#cbd5e1] text-[#1e293b] font-medium"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">Expiry Date</label>
                                <div className="relative group">
                                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] group-focus-within:text-[#1e293b] transition-colors" />
                                  <input 
                                    required={paymentMethod === 'card'}
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                    className="w-full bg-[#f8fafc] border border-transparent focus:border-[#e2e8f0] focus:bg-white rounded-xl pl-14 pr-6 py-5 text-sm transition-all focus:outline-none placeholder:text-[#cbd5e1] text-[#1e293b] font-medium"
                                  />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8] ml-1">CVV</label>
                                <div className="relative group">
                                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] group-focus-within:text-[#1e293b] transition-colors" />
                                  <input 
                                    required={paymentMethod === 'card'}
                                    type="password"
                                    placeholder=". . ."
                                    maxLength={3}
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                                    className="w-full bg-[#f8fafc] border border-transparent focus:border-[#e2e8f0] focus:bg-white rounded-xl pl-14 pr-6 py-5 text-sm transition-all focus:outline-none placeholder:text-[#cbd5e1] text-[#1e293b] font-medium"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="receipt-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                          >
                            <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                              <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                                  {receiptFile ? (
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                  ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-700">
                                    {receiptFile ? receiptFile.name : "Select your receipt file"}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                                    Upload a photo or PDF of your bank transfer or manual payment proof.
                                  </p>
                                </div>
                                <label className="cursor-pointer bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                                  {receiptFile ? "Change File" : "Choose File"}
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*,application/pdf"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                            </div>
                            
                            <div className="p-5 bg-[#fffcf0] border border-[#d4a017]/20 rounded-2xl flex gap-3">
                              <AlertCircle className="w-4 h-4 text-[#d4a017] shrink-0" />
                              <p className="text-[11px] text-[#86660d] leading-relaxed">
                                Note: Our team will review your receipt and grant access within 2-4 hours. You'll receive a notification once approved.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-center">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <p className="text-xs text-red-600 font-medium">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#1e293b] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 active:scale-[0.98]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-[#d4a017]" />
                            {paymentMethod === 'receipt' ? "Uploading Receipt..." : "Processing Purchase..."}
                          </>
                        ) : (
                          <>
                            {paymentMethod === 'receipt' ? "Submit for Approval" : "Complete Purchase"}
                            <ArrowRight className="w-5 h-5 opacity-90" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                </div>

                {/* Right: Summary Side Side */}
                <div className="lg:col-span-4 h-full">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-10 h-full flex flex-col">
                    <div className="flex-grow">
                      <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-100">
                        <div className="w-20 h-24 shrink-0 shadow-lg rotate-[-2deg]">
                          <img src={issue.image} className="w-full h-full object-cover rounded-xl" alt="Thumbnail" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-xl font-serif font-bold text-[#1e293b]">{issue.title}</h4>
                          <p className="text-[10px] font-bold text-[#d4a017] uppercase tracking-[0.2em]">Digital Access Only</p>
                        </div>
                      </div>

                      <div className="space-y-5 mb-10">
                        <div className="flex justify-between text-[13px] font-medium">
                          <span className="text-[#94a3b8]">Magazine Price</span>
                          <span className="text-[#1e293b] font-bold">LKR {Number(issue.price || 500).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[13px] font-medium">
                          <span className="text-[#94a3b8]">Platform Fee</span>
                          <span className="text-green-500 font-bold">FREE</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-baseline pt-4 border-t border-gray-100">
                        <span className="text-lg font-serif font-bold text-[#1e293b]">Total Amount</span>
                        <span className="text-3xl font-bold text-[#d4a017]">LKR {Number(issue.price || 500).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-12 space-y-8">
                      <div className="flex items-start gap-3 p-5 bg-[#fffcf0] rounded-2xl border border-[#fff1bd]">
                        <ShieldCheck className="w-4 h-4 text-[#d4a017] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#86660d] font-medium leading-relaxed opacity-80">
                          Your payment information is protected with 256-bit SSL encryption. All transactions are secure and private.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-6 saturate-0 opacity-40">
                           <span className="text-[11px] font-black italic text-[#1e293b]">VISA</span>
                           <div className="h-4 w-[1px] bg-gray-200"></div>
                           <div className="flex items-center gap-1">
                             <div className="w-3 h-3 rounded-full bg-orange-400 -mr-1"></div>
                             <div className="w-3 h-3 rounded-full bg-red-400 opacity-60"></div>
                             <span className="text-[9px] font-bold tracking-tighter ml-1">MASTERCARD</span>
                           </div>
                           <div className="h-4 w-[1px] bg-gray-200"></div>
                           <span className="text-[11px] font-black text-[#1e293b]">AMEX</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </>
        ) : (
          /* Success Step */
          <div className="max-w-xl mx-auto text-center py-12 lg:py-24 bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-green-600 mb-4">
              {paymentMethod === 'receipt' ? "Submission Successful" : "Transaction Successful"}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] mb-6">
              {paymentMethod === 'receipt' ? "Receipt Received!" : "Unlock Complete!"}
            </h2>
            <p className="text-gray-500 mb-12 leading-relaxed italic font-serif text-lg max-w-sm mx-auto">
              {paymentMethod === 'receipt' 
                ? `Your proof of payment for "${issue.title}" has been submitted. Our team will review it shortly. Check your library once it's approved.`
                : `You now have full access to "${issue.title}". The content is waiting for you in your library.`
              }
            </p>

            <div className="space-y-4 flex flex-col sm:flex-row gap-4 sm:space-y-0">
              <button
                onClick={() => onNavigate("library")}
                className="flex-1 py-5 bg-[#0F172A] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                {paymentMethod === 'receipt' ? "Check Status" : "Go to My Library"}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("home")}
                className="flex-1 py-5 border border-gray-100 text-gray-500 rounded-2xl font-bold text-xs hover:bg-gray-50 transition-all uppercase tracking-widest"
              >
                Return Home
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
