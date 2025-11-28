import React, { useMemo } from 'react';

const ContributionGraph: React.FC = () => {
  // 52 weeks, 7 days
  const weeks = 20; // Reduced for visual balance on mobile
  const days = 7;
  
  // 使用 useMemo 缓存数据，只在组件首次挂载时生成一次
  // 这样当父组件重渲染（例如点击生成箴言）时，图表不会闪烁变化
  const gridData = useMemo(() => {
    const getIntensity = () => {
      const r = Math.random();
      if (r > 0.8) return 'bg-rose-500';
      if (r > 0.6) return 'bg-rose-400';
      if (r > 0.4) return 'bg-rose-300';
      if (r > 0.2) return 'bg-rose-200';
      return 'bg-rose-100';
    };

    return Array.from({ length: weeks }).map((_, wIndex) => ({
      id: wIndex,
      days: Array.from({ length: days }).map((_, dIndex) => ({
        id: `${wIndex}-${dIndex}`,
        colorClass: getIntensity()
      }))
    }));
  }, []); // 空依赖数组，确保只执行一次

  return (
    <div className="flex flex-col gap-2 overflow-hidden opacity-70 scale-90 md:scale-100 origin-left">
      <div className="text-xs text-slate-400 font-mono mb-1">人生足迹</div>
      <div className="flex gap-1">
        {gridData.map((week) => (
          <div key={week.id} className="flex flex-col gap-1">
            {week.days.map((day) => (
              <div 
                key={day.id}
                className={`w-3 h-3 rounded-sm ${day.colorClass} hover:scale-125 transition-transform duration-200 cursor-default`}
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