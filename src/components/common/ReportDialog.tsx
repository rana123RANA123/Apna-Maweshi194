import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLocale } from '../../context/LocaleContext';
import { X, Flag, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ReportDialog: React.FC = () => {
  const { isReportModalOpen, reportingListing, closeReportModal, showToast } = useMarketplace();
  const { t } = useLocale();

  const [reason, setReason] = useState<
    'advance_scam' | 'fake_teeth' | 'sick_animal' | 'incorrect_weight' | 'abusive_seller'
  >('advance_scam');
  const [details, setDetails] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');

  if (!isReportModalOpen || !reportingListing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Report submitted for moderator review. Thank you for protecting the mandi.', 'success');
    closeReportModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl relative">
        <button
          onClick={closeReportModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
          <Flag className="w-5 h-5" />
          <span>Report Listing or Fraud</span>
        </div>

        <p className="text-xs text-stone-500">
          Listing: <strong>{reportingListing.title}</strong> by {reportingListing.seller.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Select Violation Reason
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs"
            >
              <option value="advance_scam">Demanding Advance Deposit (JazzCash/Easypaisa token scam)</option>
              <option value="fake_teeth">False Age / Milk Teeth misrepresented as 2-Daant</option>
              <option value="sick_animal">Sick animal / Signs of FMD or fever concealed</option>
              <option value="incorrect_weight">Grossly exaggerated live weight</option>
              <option value="abusive_seller">Misleading photos or fake location</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Details of Violation
            </label>
            <textarea
              rows={3}
              required
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Explain what the seller said or where the discrepancy was found..."
              className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Your Contact Phone Number (Confidential)
            </label>
            <input
              type="tel"
              required
              value={reporterPhone}
              onChange={e => setReporterPhone(e.target.value)}
              placeholder="0300-1234567"
              className="w-full px-3 py-2 border rounded-lg bg-stone-50 text-xs font-mono"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-lg text-amber-900 text-[11px] leading-snug border border-amber-200">
            Our moderation team reviews fraud complaints within 2 hours. If found fraudulent, the ad and seller phone will be blacklisted across Pakistan.
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm"
          >
            Submit Fraud Report
          </button>
        </form>
      </div>
    </div>
  );
};
