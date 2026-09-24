import React, { useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { mockCommercialProducts } from '../../data/mockData';
import { CommercialProduct } from '../../types';
import { Wheat, Cog, CheckCircle2, Phone, ShoppingCart } from 'lucide-react';

export const FeedEquipmentView: React.FC = () => {
  const { formatPrice } = useLocale();
  const { showToast } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'all' | 'feed' | 'equipment'>('all');

  const filteredProducts = mockCommercialProducts.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    return true;
  });

  const handleOrder = (product: CommercialProduct) => {
    showToast(`Order inquiry registered for ${product.title}. Supplier will call you.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Wheat className="w-4 h-4" />
            <span>Farm Inputs & Machinery</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            Feed, Fodder & Dairy Equipment Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Certified dairy wanda, corn silage, Rhodes grass, Toka chaff cutters, and milking machines across Pakistan.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'feed'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Feed & Wanda
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'equipment'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Machinery & Toka
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="aspect-4/3 bg-stone-100 overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold uppercase">
                  {product.brand}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="text-xs text-stone-600 flex items-center justify-between pt-1">
                  <span>Unit: <strong>{product.unit}</strong></span>
                  <span className="text-emerald-700 font-semibold">★ {product.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between mb-3">
                <span className="text-base font-extrabold text-stone-900 font-mono tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] text-stone-500">{product.supplierName}</span>
              </div>

              <button
                onClick={() => handleOrder(product)}
                className="w-full py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Order Inquiry</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
