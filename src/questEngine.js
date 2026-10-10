export const DEMO_MODE = !import.meta.env?.VITE_PLACES_API_URL;

export const MOODS = [
  { id: 'curious', icon: '✦', label: 'Curious', note: 'facts & surprises' },
  { id: 'hungry', icon: '☕', label: 'Hungry', note: 'local bites' },
  { id: 'relaxed', icon: '☁', label: 'Relaxed', note: 'slow & peaceful' },
  { id: 'adventurous', icon: '↗', label: 'Adventurous', note: 'a fresh detour' },
  { id: 'cultural', icon: '◈', label: 'Culture', note: 'stories & heritage' },
  { id: 'creative', icon: '◌', label: 'Creative', note: 'notice & make' },
  { id: 'social', icon: '⌁', label: 'Social', note: 'lively local life' },
  { id: 'tired', icon: '◒', label: 'Tired', note: 'minimal effort' },
  { id: 'surprise', icon: '✺', label: 'Surprise me', note: 'we’ll decide' },
];

export const ENERGY = {
  low: { label: 'Low energy', note: 'Keep it close, calm and easy.', maxIntensity: 1 },
  medium: { label: 'Medium energy', note: 'A comfortable wander with one or two stops.', maxIntensity: 2 },
  high: { label: 'High energy', note: 'Ready for a fuller little adventure.', maxIntensity: 3 },
};

// Demonstration-only inventory. A provider adapter can replace this through VITE_PLACES_API_URL.
const PLACES = [
  { id:'station-lounge', name:'Station window seat', address:'Inside your departure station', cats:['quiet','station'], moods:['relaxed','tired','curious'], intensity:1, walk:0.1, out:1, back:1, duration:10, queue:0, cost:0, indoor:true, fact:'Stations are miniature cities: pause long enough and their daily choreography appears.', challenge:'Notice three journeys beginning around you.', image:'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&w=1000&q=85' },
  { id:'corner-cafe', name:'The corner coffee pause', address:'Demo listing · 2 minutes from Central Station', cats:['food','quiet'], moods:['hungry','relaxed','tired','social'], intensity:1, walk:0.35, out:3, back:3, duration:14, queue:5, cost:5, indoor:true, fact:'A warm drink creates a deliberate pause—the simplest kind of local ritual.', challenge:'Ask for the house favourite, then save one aroma in your recap.', image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85' },
  { id:'arcade', name:'Old arcade passage', address:'Demo listing · Market Lane', cats:['culture','photography','shopping'], moods:['curious','creative','cultural','adventurous'], intensity:1, walk:0.55, out:5, back:5, duration:15, queue:0, cost:0, indoor:false, fact:'Arcades were built as sheltered streets—half city, half living room.', challenge:'Frame one doorway or reflected detail without rushing.', image:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85' },
  { id:'garden', name:'Pocket garden', address:'Demo listing · Willow Square', cats:['nature','quiet'], moods:['relaxed','curious','tired','creative'], intensity:1, walk:0.7, out:7, back:7, duration:16, queue:0, cost:0, indoor:false, fact:'Small public gardens often preserve the outline of the neighbourhood before the streets around them changed.', challenge:'Sit for two minutes and name the farthest natural sound you can hear.', image:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85' },
  { id:'gallery', name:'Neighbourhood gallery', address:'Demo listing · 14 Bridge Street', cats:['culture','indoor'], moods:['cultural','curious','creative','relaxed'], intensity:2, walk:0.9, out:9, back:9, duration:25, queue:4, cost:7, indoor:true, fact:'Small galleries make room for art that changes as quickly as a neighbourhood does.', challenge:'Choose one work and describe it using a colour, a weather word and a memory.', image:'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1000&q=85' },
  { id:'food-market', name:'Market hall tasting', address:'Demo listing · East Market Hall', cats:['food','social','shopping'], moods:['hungry','social','adventurous','curious'], intensity:2, walk:1.1, out:11, back:11, duration:22, queue:8, cost:12, indoor:true, fact:'Food halls are a fast way to meet a city’s everyday flavour without committing to a long meal.', challenge:'Try one small local flavour and ask what makes it a regular’s choice.', image:'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=85' },
  { id:'riverside', name:'Riverside walking loop', address:'Demo listing · Canal Path', cats:['nature','photography'], moods:['adventurous','creative','curious','relaxed'], intensity:3, walk:1.7, out:15, back:15, duration:30, queue:0, cost:0, indoor:false, fact:'Waterways often reveal the older working life of a city better than its main streets do.', challenge:'Collect a picture of a repeating pattern: ripples, rails, windows or leaves.', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85' },
];

// These are terminal-safe task templates, not claims about a specific airport's current amenities.
// A configured airport/places provider replaces this inventory with terminal-verified POIs.
const AIRPORT_TASKS = [
  { id:'gate-reset', name:'Gate-side reset', address:'Stay within your current gate zone', cats:['quiet','station'], moods:['relaxed','tired','curious'], intensity:1, walk:0, out:0, back:0, duration:6, queue:0, cost:0, indoor:true, phases:['airside'], fact:'A deliberate pause is useful travel time too.', challenge:'Put your phone down for three minutes. Notice one sound, one colour and one sign of motion.', image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=85', source:'Terminal-safe prompt · no venue data required' },
  { id:'window-watch', name:'Window watch', address:'Nearest public airside window or seating area', cats:['quiet','photography'], moods:['curious','creative','relaxed','tired'], intensity:1, walk:0.15, out:2, back:2, duration:8, queue:0, cost:0, indoor:true, phases:['airside'], fact:'An aircraft turnaround is a small coordinated city working against the clock.', challenge:'Watch one turnaround sequence and spot three roles that make departure possible.', image:'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1000&q=85', source:'Terminal-safe prompt · confirm location on airport map' },
  { id:'terminal-atlas', name:'Terminal atlas', address:'Your current terminal concourse', cats:['culture','photography'], moods:['curious','cultural','creative','adventurous'], intensity:1, walk:0.25, out:3, back:3, duration:10, queue:0, cost:0, indoor:true, phases:['airside','landside'], fact:'Airports quietly encode a city’s identity through wayfinding, art and material choices.', challenge:'Find one local or regional design detail and write a one-line caption for it.', image:'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=85', source:'Terminal-safe prompt · confirm terminal access' },
  { id:'airport-art', name:'Airport art pause', address:'Official art or display area, if listed by the airport', cats:['culture','quiet'], moods:['cultural','creative','relaxed','curious'], intensity:1, walk:0.35, out:5, back:5, duration:12, queue:0, cost:0, indoor:true, phases:['airside','landside'], fact:'Many airports commission art to make large transit spaces more human.', challenge:'Choose one detail from an official display and describe it without using its colour.', image:'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=85', source:'Requires official airport map/art listing when live data is connected' },
  { id:'one-local-bite', name:'One local bite', address:'Open terminal food venue near your gate', cats:['food','social'], moods:['hungry','social','adventurous'], intensity:1, walk:0.2, out:3, back:3, duration:12, queue:6, cost:8, indoor:true, phases:['airside','landside'], fact:'A small local flavour can anchor a place more vividly than a long itinerary.', challenge:'Choose one local-inspired item; ask what makes it a regular’s pick.', image:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=85', source:'Requires verified open food venue when live data is connected' },
  { id:'comfort-loop', name:'Comfort loop', address:'Water, restroom, charging and a calm seat near your gate', cats:['quiet','station'], moods:['tired','relaxed'], intensity:1, walk:0.1, out:2, back:2, duration:9, queue:0, cost:0, indoor:true, phases:['airside','landside'], fact:'Comfort routines reduce the cognitive load of waiting in a busy terminal.', challenge:'Refill water, check your charger, then settle somewhere you can see the departure board.', image:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=85', source:'Terminal-safe prompt · no venue data required' },
  { id:'public-concourse', name:'Landside people-and-place pause', address:'Public terminal concourse', cats:['culture','social'], moods:['social','curious','relaxed'], intensity:1, walk:0.15, out:2, back:2, duration:8, queue:0, cost:0, indoor:true, phases:['landside'], fact:'Public airport halls act as a city’s threshold: arrivals, goodbyes and reunions share one space.', challenge:'Find a public information display and note one destination that surprises you.', image:'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1000&q=85', source:'Terminal-safe prompt · landside only' },
];

const TEMPLATES = [
  { id:'quick', label:'Quick Escape', minWindow:0, maxStops:1, baseXP:75, tagline:'One good moment, then back with room to spare.' },
  { id:'local', label:'Local Explorer', minWindow:40, maxStops:1, baseXP:140, tagline:'A soft loop through something close and memorable.' },
  { id:'deep', label:'Deep Dive', minWindow:100, maxStops:2, baseXP:225, tagline:'A careful, meaningful detour with breathing room built in.' },
];

const capForBudget = budget => ({low:7, moderate:18, flexible:999}[budget] ?? 18);
const getModes = settings => [settings.primaryMood, settings.secondaryMood].filter(Boolean);

function scorePlace(place, settings) {
  const moods = getModes(settings);
  let score = 0;
  if (moods.includes('surprise')) score += 12;
  moods.forEach((m, index) => { if (place.moods.includes(m)) score += index === 0 ? 32 : 14; });
  (settings.interests || []).forEach(i => { if (place.cats.includes(i)) score += 11; });
  if (settings.energy === 'low') score += place.intensity === 1 ? 20 : -8 * place.intensity;
  if (settings.energy === 'medium') score += place.intensity === 2 ? 15 : place.intensity === 1 ? 9 : 1;
  if (settings.energy === 'high') score += place.intensity * 7;
  if (settings.indoor === 'indoor' && place.indoor) score += 9;
  if (settings.indoor === 'outdoor' && !place.indoor) score += 9;
  if (settings.transport === 'walk') score += Math.max(0, 11 - place.walk * 5);
  if (place.cost <= capForBudget(settings.budget)) score += 6;
  return score;
}

function feasible(place, settings, availableMinutes) {
  const walkingCap = Number(settings.maxWalk || 1.5);
  const trip = place.out + place.back + place.duration + place.queue;
  const protection = Number(settings.buffer || 18) + (settings.travelMode === 'flight' ? Number(settings.gateWalk || 0) : 0);
  if (trip + protection > availableMinutes) return false;
  if (settings.transport === 'walk' && place.walk > walkingCap) return false;
  if (settings.energy === 'low' && (place.intensity > 1 || place.walk > Math.min(walkingCap, .8))) return false;
  if (place.cost > capForBudget(settings.budget)) return false;
  if (settings.travelMode === 'flight' && !place.phases?.includes(settings.airportPhase)) return false;
  return true;
}

function labelFor(settings) {
  const mood = MOODS.find(m=>m.id===settings.primaryMood)?.label?.toLowerCase() || 'curious';
  return `${ENERGY[settings.energy]?.label.toLowerCase() || 'easy'} and feeling ${mood}`;
}

function makeQuest(template, candidates, settings, availableMinutes, offset) {
  if (availableMinutes < template.minWindow) return null;
  // Low energy never turns extra available time into extra walking: one gentle stop only.
  const stopCount = settings.energy === 'low' ? 1 : template.maxStops;
  const selected = candidates.slice(offset, offset + stopCount);
  if (!selected.length) return null;
  const travel = selected.reduce((n,p)=>n+p.out+p.back,0);
  const activity = selected.reduce((n,p)=>n+p.duration+p.queue,0);
  const protection = Number(settings.buffer || 18) + (settings.travelMode === 'flight' ? Number(settings.gateWalk || 0) : 0);
  const total = travel + activity + protection;
  if (total > availableMinutes) return null;
  const first = selected[0];
  return {
    id:`${template.id}-${first.id}-${settings.primaryMood}-${settings.energy}`,
    template:template.id, label:template.label, title: template.id==='quick' ? `A pause at ${first.name}` : template.id==='local' ? `${first.name}, at your pace` : `A slower story through ${first.name}`,
    tagline:template.tagline, places:selected, total, travel, activity, walking:Number(selected.reduce((n,p)=>n+p.walk*2,0).toFixed(1)), cost:selected.reduce((n,p)=>n+p.cost,0), xp:template.baseXP,
    reason:`You said you’re ${labelFor(settings)}. This keeps the walking and pace within your preferences, with a ${protection}-minute protected ${settings.travelMode === 'flight' ? 'gate-arrival' : 'return'} buffer.`,
    latestLeave: Math.max(0, availableMinutes - (selected[selected.length-1].back + protection)),
  };
}

export function buildRecommendations(settings, availableMinutes) {
  const inventory = settings.travelMode === 'flight' ? AIRPORT_TASKS : PLACES;
  const candidates = inventory.filter(p=>feasible(p,settings,availableMinutes)).sort((a,b)=>scorePlace(b,settings)-scorePlace(a,settings));
  const templates = settings.travelMode === 'flight'
    ? [{ id:'micro', label:'Gate-side micro quest', minWindow:0, maxStops:1, baseXP:45, tagline:'A small, interruptible moment inside your permitted terminal area.' }, { id:'mini', label:'Terminal mini quest', minWindow:25, maxStops:1, baseXP:70, tagline:'One useful little detour, planned around getting back to your gate.' }, { id:'flow', label:'Airport flow quest', minWindow:50, maxStops:2, baseXP:115, tagline:'A gentle sequence of terminal moments with a gate-return check built in.' }]
    : TEMPLATES;
  const distinct = templates.map((t,index)=>makeQuest(t,candidates,settings,availableMinutes,index)).filter(Boolean);
  if (!distinct.length) {
    const beforeAirport = settings.travelMode === 'flight' && settings.airportPhase === 'before-airport';
    const fallback = settings.travelMode === 'flight' ? AIRPORT_TASKS.find(p=>p.id=== (beforeAirport ? 'comfort-loop' : 'gate-reset')) : PLACES.find(p=>p.id==='station-lounge');
    const airport = settings.travelMode === 'flight';
    return { quests:[{ id:airport?'airport-safe':'station-safe', template:airport?'airport':'station', label:airport?(beforeAirport?'Airport-ready reset':'Gate reset'):'Station pause', title:airport?(beforeAirport?'Get airport-ready, unhurried':'Stay at your gate, stay unhurried'):'Stay close, stay unhurried', tagline:airport?(beforeAirport?'A calm preparation task is safest before you are in the terminal.':'Your safest little quest is right where you are.'):'The safest little quest is already where you are.', places:[fallback], travel:0, activity:6, walking:0, cost:0, total:Math.min(availableMinutes,6), xp:20, latestLeave:0, reason:airport?(beforeAirport?'There is not enough protected time for another stop before airport arrival. Use this six-minute reset, then continue your airport plan.':'There is not enough protected time to walk away from your gate. This task is intentionally stationary and can end instantly.'):'There is not enough verified time for an outing with your return buffer. This station-based pause keeps you safely close.' }], candidates:0, fallback:true };
  }
  return { quests:distinct, candidates:candidates.length, fallback:false };
}

export function earnedStamp(place) {
  if (place.cats.includes('food')) return 'food';
  if (place.cats.includes('culture')) return 'culture';
  if (place.cats.includes('quiet') || place.cats.includes('nature')) return 'quiet';
  if (place.cats.includes('photography')) return 'photo';
  return 'observer';
}

export function timeLabel(minutes) { const m=Math.max(0,Math.round(minutes)); return m >= 60 ? `${Math.floor(m/60)}h ${m%60}m` : `${m} min`; }
