import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Search, 
  Filter, 
  Clock, 
  FileText,
  ExternalLink,
  Loader2
} from "lucide-react";
import { getAllPurchases, updatePurchaseStatus } from "../../services/purchaseService";

const PaymentManagement = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const data = await getAllPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: 'paid' | 'failed') => {
    try {
      await updatePurchaseStatus(id, status);
      fetchPurchases(); // Refresh
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredPurchases = purchases.filter(p => {
    const matchesSearch = p.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.issue.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Payment Requests</h2>
          <p className="text-gray-500 text-sm mt-1">Review receipts and grant manual access to issues.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search user or issue..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#d4a017]/20 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-50 border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-0 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Approved</option>
              <option value="failed">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#d4a017] animate-spin" />
              <p className="text-gray-400 text-sm font-medium">Loading requests...</p>
            </div>
          ) : filteredPurchases.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No payment requests found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">User</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Magazine Issue</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Receipt</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{purchase.user.name}</span>
                        <span className="text-[11px] text-gray-500">{purchase.user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{purchase.issue.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      {purchase.receiptUrl ? (
                        <button 
                          onClick={() => setSelectedReceipt(`http://localhost:5000${purchase.receiptUrl}`)}
                          className="flex items-center gap-1.5 text-[#d4a017] hover:bg-[#d4a017]/10 px-3 py-1.5 rounded-lg transition-all text-xs font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Receipt
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No receipt</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">LKR {purchase.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {purchase.status === 'paid' && (
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center w-fit gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {purchase.status === 'failed' && (
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold flex items-center w-fit gap-1">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                      {purchase.status === 'pending' && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold flex items-center w-fit gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {purchase.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(purchase.id, 'paid')}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all shadow-sm"
                            title="Approve & Grant Access"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(purchase.id, 'failed')}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all shadow-sm"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setSelectedReceipt(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-serif font-bold text-gray-900">Payment Receipt</h3>
              <div className="flex gap-4">
                <a 
                  href={selectedReceipt} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-[#d4a017] hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> Open in New Tab
                </a>
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex-grow overflow-auto p-4 bg-gray-900 flex items-center justify-center">
              {selectedReceipt.endsWith('.pdf') ? (
                <iframe src={selectedReceipt} className="w-full h-[70vh] rounded-xl" title="Receipt PDF" />
              ) : (
                <img src={selectedReceipt} className="max-w-full max-h-full object-contain shadow-2xl rounded-lg" alt="Receipt" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
