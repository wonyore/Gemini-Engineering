import React from 'react';

const ContributionGraph: React.FC = () => {
  // Generate a fake contribution graph for visual flair
  // 52 weeks, 7 days
  const weeks = 20; // Reduced for visual balance on mobile
  const days = 7;
  
  const getIntensity = () => {
    const r = Math.random();
    if (r > 0.8) return 'bg-rose-500';
    if (r > 0.6) return 'bg-rose-400';
    if (r > 0.4) return 'bg-rose-300';
    if (r > 0.2) return 'bg-rose-200';
    return 'bg-rose-100';
  };

  return (
    <div className="flex flex-col gap-2 overflow-hidden opacity-70 scale-90 md:scale-100 origin-left">
      <div className="text-xs text-slate-400 font-mono mb-1">人生足迹</div>
      <div className="flex gap-1">
        {Array.from({ length: weeks }).map((_, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, dIndex) => (
              <div 
                key={`${wIndex}-${dIndex}`}
                className={`w-3 h-3 rounded-sm ${getIntensity()} hover:scale-125 transition-transform duration-200 cursor-default`}
                title={`生活记录: 第 ${wIndex + 1} 周, 第 ${dIndex + 1} 天`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
        <span>平淡</span>
        <div className="w-2 h-2 bg-rose-100 rounded-sm"></div>
        <div className="w-2 h-2 bg-rose-300 rounded-sm"></div>
        <div className="w-2 h-2 bg-rose-500 rounded-sm"></div>
        <span>精彩</span>
      </div>
    </div>
  );
};

export default ContributionGraph;