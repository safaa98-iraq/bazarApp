'use client';

import { useState } from 'react';
import { TrendingUp, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { AIPriceResult } from '@storebuilder/types';

interface Props {
  productName: string;
  category: string;
  onResult: (result: AIPriceResult) => void;
}

export function AIPriceButton({ productName, category, onResult }: Props) {
  const [loading, setLoading] = useState(false);
  const [competitorInputs, setCompetitorInputs] = useState<string[]>(['', '', '']);
  const [showForm, setShowForm] = useState(false);

  const handleSuggest = async () => {
    if (!productName) { toast.error('Enter a product name first'); return; }
    setLoading(true);
    try {
      const prices = competitorInputs
        .map((p) => parseFloat(p))
        .filter((p) => !isNaN(p) && p > 0);

      const res = await api.post<{ success: boolean; data: AIPriceResult }>(
        '/api/ai/suggest-price',
        { productName, category: category || 'عام', competitorPrices: prices }
      );
      onResult(res.data);
      setShowForm(false);
      toast.success('تم اقتراح السعر بنجاح ✨');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'AI failed');
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-amber-800">أسعار المنافسين (اختياري)</p>
          <button type="button" onClick={() => setShowForm(false)}>
            <X className="h-4 w-4 text-amber-600" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {competitorInputs.map((val, i) => (
            <input
              key={i}
              type="number"
              value={val}
              placeholder={`سعر ${i + 1}`}
              onChange={(e) => {
                const updated = [...competitorInputs];
                updated[i] = e.target.value;
                setCompetitorInputs(updated);
              }}
              className="px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleSuggest}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
          {loading ? 'جارٍ التحليل…' : 'اقترح السعر'}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowForm(true)}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
    >
      <TrendingUp className="h-3.5 w-3.5" />
      اقتراح سعر بالذكاء الاصطناعي
    </button>
  );
}
