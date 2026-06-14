'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { AIDescriptionResult } from '@storebuilder/types';

interface Props {
  productName: string;
  category: string;
  keyFeatures: string[];
  onResult: (result: AIDescriptionResult) => void;
}

export function AIDescriptionButton({ productName, category, keyFeatures, onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!productName) {
      toast.error('Enter a product name first');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<{ success: boolean; data: AIDescriptionResult }>(
        '/api/ai/generate-description',
        { productName, category: category || 'عام', keyFeatures: keyFeatures.filter(Boolean) }
      );
      onResult(res.data);
      toast.success('تم توليد الوصف بنجاح ✨');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'AI generation failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={loading}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
      {loading ? 'جارٍ التوليد…' : 'توليد بالذكاء الاصطناعي ✨'}
    </button>
  );
}
