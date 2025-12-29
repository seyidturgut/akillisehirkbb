import React from 'react';
import { AlertCircle, Lightbulb, Trash2, HelpCircle } from 'lucide-react';

export type ComplaintCategory = 'çukur' | 'aydınlatma' | 'çöp' | 'diğer';

interface CategorySelectorProps {
    selected: ComplaintCategory | null;
    onSelect: (category: ComplaintCategory) => void;
}

const categories = [
    { id: 'çukur', label: 'Yol Çukuru', icon: AlertCircle, color: 'bg-amber-500' },
    { id: 'aydınlatma', label: 'Aydınlatma', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'çöp', label: 'Atık / Çöp', icon: Trash2, color: 'bg-emerald-500' },
    { id: 'diğer', label: 'Diğer', icon: HelpCircle, color: 'bg-blue-500' },
] as const;

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id as ComplaintCategory)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${selected === cat.id
                            ? `border-white ${cat.color} text-white shadow-xl`
                            : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                >
                    <cat.icon className={`w-8 h-8 mb-3 ${selected === cat.id ? 'text-white' : ''}`} />
                    <span className="font-bold text-sm tracking-wide">{cat.label}</span>
                </button>
            ))}
        </div>
    );
};
