import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Clock, Eye, Filter, Search, DollarSign, Wallet } from "lucide-react";
import { getAllPurchases, updatePurchaseStatus } from "../../services/purchaseService";

interface Payment {
  id: number;
  userId: number;
  magazineIssueId: number;
  amount: number;
  receiptUrl: string;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
  user?: { name: string; email: string };
  issue?: { title: string };
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getAllPurchases();
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: 'paid' | 'failed') => {
    try {
      await updatePurchaseStatus(id, status);
      setPayments(payments.map(p => p.id === id ? { ...p, status } : p));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating payment status.");
    }
  };

  const getFileUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  const filteredPayments = payments.filter(p => 
    p.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.issue?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A]">Payment Approval</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Verify manual payments and grant access to subscribers.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm w-fit">
          <Wallet className="w-4 h-4 text-[#d4a017]" />
          <span className="text-[10px] md:text-xs font-bold text-[#0F172A] uppercase tracking-widest">
            {payments.filter(p => p.status === 'pending').length} Pending Approvals
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or issue title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#d4a017] transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold text-[10px] uppercase tracking-widest text-[#1e293b]">
          <Filter className="w-4 h-4" />
          Status
        </button>
      </div>

      <div className="bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receipt</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Approvals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-gray-400 text-sm font-medium italic">Synchronizing payment records...</p>
                  </td>
                </tr>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e293b]">{payment.user?.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{payment.issue?.title || "Monthly Issue"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-[#1e293b]">LKR {payment.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight mt-0.5">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit ${
                        payment.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 
                        payment.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                        {payment.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                        {payment.status === 'failed' && <XCircle className="w-3 h-3" />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => setViewingReceipt(getFileUrl(payment.receiptUrl))}
                        className="flex items-center gap-2 text-[10px] font-bold text-[#d4a017] uppercase tracking-widest hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Proof
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {payment.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleStatusChange(payment.id, 'paid')}
                              className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all shadow-sm"
                              title="Approve"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(payment.id, 'failed')}
                              className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-300 uppercase italic tracking-widest">No Actions</span>
                        )}
                      </div>
                    </td>
                   </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-gray-400 text-sm font-medium italic">All caught up! No pending payments.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fullscreen Receipt Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingReceipt(null)} />
           <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
              <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                 <h3 className="text-lg font-bold text-[#0F172A] uppercase tracking-widest">Payment Proof</h3>
                 <button onClick={() => setViewingReceipt(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                    <XCircle className="w-6 h-6" />
                 </button>
              </div>
              <div className="flex-grow overflow-auto p-4 md:p-8 bg-gray-50 flex items-center justify-center">
                 <img src={viewingReceipt} className="max-w-full h-auto rounded-xl shadow-xl border border-gray-200" alt="Receipt Proof" />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
