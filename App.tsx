import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE, AppState } from './types';
import Countdown from './components/Countdown';
import EditableSection from './components/EditableSection';
import MottoGenerator from './components/MottoGenerator';
import BirthdayCard from './components/BirthdayCard';
import ContributionGraph from './components/ContributionGraph';

const App: React.FC = () => {
  const [isBirthday, setIsBirthday] = useState(false);
  
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('yaoLifeGithub');
    return saved ? JSON.parse(saved) : {
      pastYearSummary: '',
      futurePlans: [],
      motto: '',
      lastMottoDate: null
    };
  });

  // Check if today is the birthday
  const checkBirthday = () => {
    const now = new Date();
    // Month is 0-indexed in JS, so December is 11. 
    // However, in our profile config, we used 12.
    const isToday = (now.getMonth() + 1 === INITIAL_PROFILE.birthdayMonth) && 
                    (now.getDate() === INITIAL_PROFILE.birthdayDay);
    setIsBirthday(isToday);
  };

  useEffect(() => {
    checkBirthday();
    // Check every minute just in case the date changes while the tab is open
    const interval = setInterval(checkBirthday, 60000);
    return () => clearInterval(interval);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem('yaoLifeGithub', JSON.stringify(appState));
  }, [appState]);

  const updateSummary = (content: string) => {
    setAppState(prev => ({ ...prev, pastYearSummary: content }));
  };

  const updateFuturePlans = (content: string) => {
    // For simplicity using a single string for plans, but visually it works
    // In a real app we might parse this into list items
    setAppState(prev => ({ ...prev, futurePlans: [{ id: '1', content, isCompleted: false }] }));
  };

  const updateMotto = (motto: string) => {
    setAppState(prev => ({ 
      ...prev, 
      motto, 
      lastMottoDate: new Date().toISOString() 
    }));
  };

  // Helper to get plan string from object
  const getPlanString = () => {
    if (appState.futurePlans.length > 0) {
      return appState.futurePlans[0].content;
    }
    return '';
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Birthday Overlay */}
      {isBirthday && (
        <BirthdayCard 
          profile={INITIAL_PROFILE} 
          motto={appState.motto} 
          onMottoUpdate={updateMotto} 
        />
      )}

      {/* Main App Header */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white font-mono font-bold">
              Y
            </div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              {INITIAL_PROFILE.name}的人生 <span className="text-rose-500">GitHub</span>
              <span className="ml-2 text-xs font-normal text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full">
                {new Date().getFullYear()} 年度版
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-xs text-slate-500 text-right">
              <div className="font-bold">{INITIAL_PROFILE.name}</div>
              <div>{INITIAL_PROFILE.role} • 🐒</div>
            </div>
            <img 
              src="https://picsum.photos/100/100" 
              alt="Avatar" 
              className="w-8 h-8 rounded-full ring-2 ring-rose-100"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Section: Countdown & Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Countdown 
              profile={INITIAL_PROFILE} 
              onBirthdayReached={() => setIsBirthday(true)} 
            />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 flex flex-col justify-center">
            <ContributionGraph />
          </div>
        </section>

        {/* Motto Section */}
        <section>
          <MottoGenerator 
            profile={INITIAL_PROFILE}
            currentMotto={appState.motto}
            onMottoUpdate={updateMotto}
          />
        </section>

        {/* Workspace: Past & Future */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-full">
            <EditableSection
              title="过去一年的总结"
              icon={<span className="text-xl">📅</span>}
              initialContent={appState.pastYearSummary}
              onSave={updateSummary}
              placeholder={`在这里写下你过去一年的“人生记录”...\n\n- 学会了什么？\n- 完成了什么小目标？\n- 有什么难忘的瞬间？`}
            />
          </div>
          
          <div className="h-full">
            <EditableSection
              title="未来一年的计划"
              icon={<span className="text-xl">🚀</span>}
              initialContent={getPlanString()}
              onSave={updateFuturePlans}
              placeholder={`写给新的一岁的愿望清单：\n\n1. 学习一项新技能\n2. 去一个想去的地方\n3. 更加爱自己...`}
            />
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {INITIAL_PROFILE.name}. 愿你这一生，既有软肋，更有盔甲。</p>
      </footer>
    </div>
  );
};

export default App;