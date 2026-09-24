import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLocale } from '../../context/LocaleContext';
import {
  Shield,
  CheckCircle,
  XCircle,
  Sparkles,
  Trash2,
  AlertTriangle,
  BarChart3,
  Users,
  Package,
  TrendingUp,
  Search,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    listings,
    adminStats,
    reports,
    approveListing,
    rejectListing,
    featureListing,
    removeListing,
    resolveReport,
    setSelectedListing,
  } = useMarketplace();
  const { formatPrice } = useLocale();

  const [activeTab, setActiveTab] = useState<'listings' | 'reports'>('listings');
  const [filterSearch, setFilterSearch] = useState('');

  const filteredListings = listings.filter(l =>
    l.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
    l.breed.toLowerCase().includes(filterSearch.toLowerCase()) ||
    l.city.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white p-6 rounded-xl border border-stone-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Marketplace Moderation & Compliance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">Apna Maweshi Admin Console</h1>
          <p className="text-xs text-stone-400 mt-1">
            Review live mandi listings, audit fraud reports, verify dealer studs, and manage commercial safety.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-semibold">
            Status: Mandi Online
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold">Active Mandi Ads</span>
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
            {listings.length.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">+142 added today</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold">Pending Approvals</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
            {adminStats.pendingApprovals}
          </div>
          <span className="text-[11px] text-stone-400">Queue within SLA</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold">Fraud Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-700 font-mono tabular-nums">
            {reports.filter(r => r.status === 'pending').length}
          </div>
          <span className="text-[11px] text-rose-600 font-medium">Requires audit</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold">Est. Mandi Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
            {formatPrice(adminStats.estimatedMandiVolumePkr)}
          </div>
          <span className="text-[11px] text-stone-400">Past 30 days</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-3 px-4 border-b-2 transition-colors ${
            activeTab === 'listings'
              ? 'border-emerald-800 text-emerald-800 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          Listing Moderation ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3 px-4 border-b-2 transition-colors ${
            activeTab === 'reports'
              ? 'border-emerald-800 text-emerald-800 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          Fraud & Dispute Reports ({reports.length})
        </button>
      </div>

      {/* Panel 1: Listings Moderation Table */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 text-xs max-w-xs w-full">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search listing by title, breed, city..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
            <span className="text-xs text-stone-500 font-mono tabular-nums">
              Showing {filteredListings.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Animal</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Seller</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredListings.map(item => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded object-cover border border-stone-200 shrink-0"
                        />
                        <div>
                          <span
                            onClick={() => setSelectedListing(item)}
                            className="font-bold text-stone-900 hover:text-emerald-800 cursor-pointer block line-clamp-1"
                          >
                            {item.title}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            {item.breed} · {item.teeth} Daant
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                      {formatPrice(item.price)}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-stone-800 block">{item.seller.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{item.seller.phone}</span>
                    </td>

                    <td className="py-3 px-3 text-stone-600 whitespace-nowrap">
                      {item.city}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : item.status === 'featured'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => approveListing(item.id)}
                          className="p-1.5 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                          title="Approve Listing"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => featureListing(item.id)}
                          className={`p-1.5 rounded transition-colors ${
                            item.isFeatured
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-800'
                          }`}
                          title="Feature Ad on Homepage"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => rejectListing(item.id)}
                          className="p-1.5 rounded bg-amber-50 text-amber-800 hover:bg-amber-100"
                          title="Reject Listing"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeListing(item.id)}
                          className="p-1.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Panel 2: Fraud & Report Management */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden divide-y divide-stone-200">
          {reports.map(rep => (
            <div key={rep.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">
                    {rep.reason.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-stone-400">{rep.timestamp}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                  Target Listing: {rep.listingTitle}
                </h4>
                <p className="text-xs text-stone-600">{rep.details}</p>
                <span className="text-[11px] text-stone-500 font-mono">
                  Reporter Phone: {rep.reporterPhone}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {rep.status === 'pending' ? (
                  <button
                    onClick={() => resolveReport(rep.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs"
                  >
                    Mark Resolved & Warn Seller
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Resolved</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
