const KEY = 'wander-onward-profile-v2';
export const initialProfile = { xp:0, stamps:[], history:[], completedQuests:0, active:null, preferences:null };
export function loadProfile(){ try { return {...initialProfile,...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch { return initialProfile; } }
export function saveProfile(profile){ localStorage.setItem(KEY,JSON.stringify(profile)); }
