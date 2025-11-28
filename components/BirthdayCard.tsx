import React from 'react';
import { UserProfile } from '../types';
import MottoGenerator from './MottoGenerator';

interface BirthdayCardProps {
  profile: UserProfile;
  motto: string;
  onMottoUpdate: (motto: string) => void;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ profile, motto, onMottoUpdate }) => {
  return (
    <div className="fixed inset-0 z-50 bg-rose-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">🎂</div>
          <div className="absolute bottom-20 right-10 text-6xl animate-pulse opacity-20">🎁</div>
          <div className="absolute top-1/2 left-5 text-4xl animate-float opacity-20">🎈</div>
          <div className="absolute top-20 right-20 text-5xl animate-spin opacity-10" style={{animationDuration: '10s'}}>❄️</div>
        </div>

        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-rose-200 text-center relative z-10 animate-[float_4s_ease-in-out_infinite]">
          
          <div className="inline-block bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
             ✨ 生日模式已解锁 ✨
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-rose-500 mb-4 tracking-tight">
            生日快乐！<br/>
            <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-slate-600 mb-8 font-light">
            新的一年，愿你继续热爱生活，奔赴山海，保持闪耀。
          </div>

          <div className="mb-8">
             <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-200 to-rose-200 rounded-full flex items-center justify-center text-5xl shadow-inner mb-4">
              🐒
            </div>
            <p className="text-rose-400 font-medium text-lg">解锁新一岁! {new Date().getFullYear()} 升级成功</p>
          </div>

          <div className="text-left bg-white rounded-xl shadow-inner p-1 mb-8">
             <MottoGenerator 
                profile={profile} 
                currentMotto={motto} 
                onMottoUpdate={onMottoUpdate} 
             />
          </div>

          <div className="text-sm text-slate-400 font-mono">
            已归档美好时光 - {new Date().getFullYear()}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;