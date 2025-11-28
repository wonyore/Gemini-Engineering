import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface CountdownProps {
  profile: UserProfile;
  onBirthdayReached: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ profile, onBirthdayReached }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      
      // Javascript months are 0-indexed
      const monthIndex = profile.birthdayMonth - 1;
      
      let nextBirthday = new Date(targetYear, monthIndex, profile.birthdayDay, 0, 0, 0);

      if (now > nextBirthday) {
        // If birthday passed this year, aim for next year
        nextBirthday = new Date(targetYear + 1, monthIndex, profile.birthdayDay, 0, 0, 0);
      }

      const difference = nextBirthday.getTime() - now.getTime();

      if (difference <= 0) {
        // It is birthday!
        onBirthdayReached();
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    // If it's null initially, it might be the birthday right now
    if (!initialTime) return;

    const timer = setInterval(() => {
      const t = calculateTimeLeft();
      setTimeLeft(t);
      if (!t) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [profile, onBirthdayReached]);

  if (!timeLeft) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 flex flex-col items-center justify-center">
      <h3 className="text-slate-500 text-sm font-bold tracking-wider mb-4">✨ 距离下一次生日还有 ✨</h3>
      <div className="flex gap-4 md:gap-8 text-center">
        {[
          { label: '天', value: timeLeft.days },
          { label: '小时', value: timeLeft.hours },
          { label: '分', value: timeLeft.minutes },
          { label: '秒', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-mono font-bold text-rose-500 bg-rose-50 rounded-lg p-2 min-w-[60px] md:min-w-[80px]">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 mt-2 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;