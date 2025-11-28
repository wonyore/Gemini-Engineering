import React, { useState } from 'react';
import { generateBirthdayMotto } from '../services/geminiService';
import { UserProfile } from '../types';

interface MottoGeneratorProps {
  profile: UserProfile;
  currentMotto: string;
  onMottoUpdate: (motto: string) => void;
}

const MottoGenerator: React.FC<MottoGeneratorProps> = ({ profile, currentMotto, onMottoUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newMotto = await generateBirthdayMotto(profile.name, profile.role, profile.zodiacSign);
      onMottoUpdate(newMotto);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-rose-50 to-white rounded-2xl p-6 shadow-sm border border-rose-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-rose-800 font-bold flex items-center gap-2">
          <span>✨</span> 生日箴言 (AI生成)
        </h3>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="text-xs bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
        >
          {loading ? '生成中...' : '生成新的箴言'}
        </button>
      </div>
      
      <div className="relative p-6 bg-white rounded-xl border-dashed border-2 border-rose-200 text-center">
        {currentMotto ? (
          <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed italic font-serif">
            "{currentMotto}"
          </p>
        ) : (
          <p className="text-slate-400 text-sm">点击按钮，获取属于你的年度生日智慧。</p>
        )}
        <div className="absolute -top-3 -left-3 text-rose-300 text-4xl">❝</div>
        <div className="absolute -bottom-3 -right-3 text-rose-300 text-4xl">❞</div>
      </div>
    </div>
  );
};

export default MottoGenerator;