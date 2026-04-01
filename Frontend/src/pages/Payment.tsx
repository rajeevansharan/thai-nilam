import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  CreditCard,
  Lock,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Info,
} from "lucide-react";
import { initiatePayment } from "../services/issueService";

interface PaymentProps {
  onNavigate: (page: string) => void;
  issue: any;
  user: any;
}

declare global {
  interface Window {
    payhere: any;
  }
}

const Payment: React.FC<PaymentProps> = ({ onNavigate, issue, user }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Processing, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically load PayHere script based on environment
    const isProduction = import.meta.env.PROD;
    const scriptUrl = isProduction
      ? "https://www.payhere.lk/lib/payhere.js"
      : "https://sandbox.payhere.lk/lib/payhere.js";

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.id = "payhere-sdk";
    script.onload = () => {
      console.log(`PayHere SDK loaded from ${scriptUrl}`);
    };
    document.head.appendChild(script);

    // Check if redirected back from PayHere with success status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status === "success") {
      // In a real app, we should verify status with backend here
      setStep(3);
    } else if (status === "cancel") {
      setError("Payment was cancelled. Please try again.");
    }

    return () => {
      // Clean up script on unmount safely
      const scriptNode = document.getElementById("payhere-sdk");
      if (scriptNode && scriptNode.parentNode) {
        scriptNode.parentNode.removeChild(scriptNode);
      }
    };
  }, []);

  if (!issue) {
    onNavigate("home");
    return null;
  }

  const handlePayment = async () => {
    if (!user) {
      alert("Please login to continue");
      onNavigate("login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const paymentParams = await initiatePayment(user.id, issue.id);

      // PayHere methods
      window.payhere.onCompleted = function onCompleted(orderId: string) {
        console.log("Payment completed. OrderID:" + orderId);
        setStep(3);
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        setLoading(false);
      };

      window.payhere.onError = function onError(error: string) {
        console.log("Error:" + error);
        setError("Payment error occurred. Please try again.");
        setLoading(false);
      };

      // Start PayHere Payment
      window.payhere.startPayment(paymentParams);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Failed to initiate payment. Please try again.",
      );
      setLoading(false);
    }
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
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-600 mb-2">
                      {issue.month}
                    </p>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                      {issue.title}
                    </h1>
                    <p className="text-gray-600 leading-relaxed italic mb-6">
                      {issue.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Digital Thai Nilam
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
                  <h2 className="text-xl font-serif font-semibold text-gray-900">
                    Inside this Thai Nilam
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    Sneak Peek
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {issue.contentImages && issue.contentImages.length > 0
                    ? issue.contentImages.map((img: any, idx: number) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-sm transition-transform hover:scale-[1.02]"
                        >
                          <img
                            src={
                              img.url.startsWith("http")
                                ? img.url
                                : `http://localhost:5000/${img.url.replace(/\\/g, "/")}`
                            }
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    : // Fallback placeholders if no content images found
                      [1, 2, 3].map((_, idx) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200"
                        >
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                            Preview {idx + 1}
                          </span>
                        </div>
                      ))}
                </div>
                <p className="text-xs text-center text-gray-400 italic">
                  * Unlock the full issue to view all 60+ pages of
                  high-resolution content.
                </p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-8">
                  Secure Checkout
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between py-4 border-b border-gray-50">
                    <span className="text-gray-500">Thai Nilam Price</span>
                    <span className="font-bold text-gray-900">
                      LKR {Number(issue.price || 500).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-50">
                    <span className="text-gray-500">Platform Fee</span>
                    <span className="font-bold text-emerald-500">FREE</span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-gray-900 font-bold">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      LKR {Number(issue.price || 500).toFixed(2)}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Payment Method
                  </p>
                  <div className="p-4 border-2 border-amber-500 bg-amber-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          PayHere Checkout
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Visa, Mastercard, Amex, Genie
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-amber-600 fill-amber-600/10" />
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 bg-[#0a0d16] text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  ) : (
                    <>
                      Pay via PayHere
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <img
                    src="https://www.payhere.lk/downloads/images/payhere_long_banner.png"
                    alt="PayHere"
                    className="h-4 object-contain opacity-70 grayscale hover:grayscale-0 transition-all"
                  />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Once purchased, this Thai Nilam will be permanently added to
                    your library and accessible from any device.
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
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Processing Payment
            </h2>
            <p className="text-gray-500">
              Please do not refresh the page or close this window. We are
              securing your transaction.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-lg mx-auto text-center py-20 bg-white rounded-3xl p-12 shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Unlock Successful!
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Congratulations! You now have full access to{" "}
              <span className="font-bold text-gray-900">"{issue.title}"</span>.
              The digital Thai Nilam has been added to your library.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => onNavigate("library")}
                className="w-full py-4 bg-amber-500 text-[#0a0d16] rounded-xl font-bold text-sm hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group"
              >
                Go to My Library
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("home")}
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
