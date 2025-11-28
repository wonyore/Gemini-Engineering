export interface UserProfile {
  name: string;
  birthdayMonth: number; // 1-12
  birthdayDay: number; // 1-31
  gender: 'female' | 'male' | 'other';
  role: string;
  zodiacSign: string; // Chinese zodiac
}

export interface PlanItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface AppState {
  pastYearSummary: string;
  futurePlans: PlanItem[];
  motto: string;
  lastMottoDate: string | null;
}

export const INITIAL_PROFILE: UserProfile = {
  name: "王瑶",
  birthdayMonth: 12,
  birthdayDay: 31,
  gender: 'female',
  role: '生活观察家',
  zodiacSign: '猴'
};