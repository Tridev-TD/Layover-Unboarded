async function request(path, body) {
  const response = await fetch(path, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(body) });
  const data = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(data.error || 'The service could not complete this request.');
  return data;
}

export function requestLiveQuests(settings, availableMinutes, history) {
  const payload = {
    lat: settings.originCoords?.lat,
    lon: settings.originCoords?.lon,
    returnLat: settings.returnCoords?.lat,
    returnLon: settings.returnCoords?.lon,
    location: settings.location,
    station: settings.station,
    availableMinutes,
    energy: settings.energy,
    primaryMood: settings.primaryMood,
    secondaryMood: settings.secondaryMood,
    budget: settings.budget,
    maxWalk: settings.maxWalk,
    buffer: settings.buffer,
    interests: settings.interests,
    transport: settings.transport,
    indoor: settings.indoor,
    history,
  };
  return request('/api/quests', payload).catch(error=>publicNearbyFallback(payload, error));
}

export function geocodeLocation(query) { return request('/api/geocode', { query }); }

const categoryFor = tags => tags.amenity==='cafe'||tags.amenity==='restaurant'||tags.amenity==='fast_food'?'food':tags.natural==='beach'||tags.leisure==='park'||tags.leisure==='garden'?'nature':tags.tourism==='museum'||tags.tourism==='attraction'||tags.historic?'culture':tags.shop?'shopping':'other';
const pointDistance = (a,b) => { const r=Math.PI/180; const x=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2; return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)); };
const activity = category => ({food:18,nature:20,culture:24,shopping:16,other:15}[category]||15);

async function publicNearbyFallback(payload, originalError) {
  let origin;
  if(Number.isFinite(payload.lat)&&Number.isFinite(payload.lon)) origin={lat:payload.lat,lon:payload.lon,name:'Current location'};
  else {
    if(!payload.location) throw new Error('Enter a starting location or allow location access. The local data service could not be reached.');
    const geo=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(payload.location)}`);
    if(!geo.ok) throw new Error(`Nearby search is unavailable (${originalError.message}).`);
    const rows=await geo.json(); if(!rows[0]) throw new Error('That starting location could not be found. Try “Kozhikode, Kerala”.');
    origin={lat:Number(rows[0].lat),lon:Number(rows[0].lon),name:rows[0].display_name};
  }
  const radius=Math.min(3500,Math.max(600,Math.round(Math.min((payload.maxWalk||1.5)*1000,(payload.availableMinutes-payload.buffer)*40))));
  const query=`[out:json][timeout:20];(nwr(around:${radius},${origin.lat},${origin.lon})[amenity~"^(cafe|restaurant|fast_food)$"];nwr(around:${radius},${origin.lat},${origin.lon})[tourism~"^(museum|attraction)$"];nwr(around:${radius},${origin.lat},${origin.lon})[leisure~"^(park|garden)$"];nwr(around:${radius},${origin.lat},${origin.lon})[natural=beach];nwr(around:${radius},${origin.lat},${origin.lon})[historic];);out center tags 45;`;
  const response=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:`data=${encodeURIComponent(query)}`});
  if(!response.ok) throw new Error(`Nearby place search is unavailable (${response.status}). Start the local server for the reliable routed version.`);
  const data=await response.json(); const seen=new Set();
  const places=(data.elements||[]).map(el=>{const tags=el.tags||{},p=el.center||el,category=categoryFor(tags),km=pointDistance(origin,{lat:p.lat,lon:p.lon});const travel=Math.max(2,Math.ceil(km*1.35/4.2*60));return {id:`osm-${el.type}-${el.id}`,name:tags.name,address:[tags['addr:housenumber'],tags['addr:street'],tags['addr:city']].filter(Boolean).join(' ')||'Address not supplied by OpenStreetMap',category,cats:[category],out:travel,back:travel,duration:activity(category),queue:0,walk:Number((km*2.7).toFixed(1)),cost:0,image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',fact:tags.opening_hours?`Opening hours supplied by OpenStreetMap: ${tags.opening_hours}`:'Opening hours were not supplied by the source; check before leaving.',openingHours:tags.opening_hours||'Not supplied',challenge:`Notice one detail that makes ${tags.name} feel specific to this place.`,source:'OpenStreetMap direct fallback · distance estimate'};}).filter(p=>p.name&&!seen.has(p.id)&&(seen.add(p.id),true)).filter(p=>p.out+p.back+p.duration+payload.buffer<=payload.availableMinutes&&p.walk<=(payload.maxWalk||1.5)*2.2);
  const mood={hungry:'food',relaxed:'nature',cultural:'culture',curious:'culture',adventurous:'nature',tired:'food'}[payload.primaryMood]; places.sort((a,b)=>(b.category===mood)-(a.category===mood)||a.out-b.out);
  const chosen=[];const cats=new Set();for(const p of places){if(chosen.length===3)break;if(!cats.has(p.category)||chosen.length<2){chosen.push(p);cats.add(p.category);}}
  return {origin,destination:origin,candidates:places.length,fallback:chosen.length===0,source:'direct-osm-fallback',message:chosen.length?'The local server was unavailable, so these are direct OpenStreetMap results with conservative distance estimates.':'No nearby OpenStreetMap places fit your current time and distance.',quests:chosen.map((p,i)=>({id:`direct-${p.id}`,template:i===0?'quick':i===1?'local':'deep',label:i===0?'Quick Escape':i===1?'Local Explorer':'Deep Dive',title:p.name,tagline:'A real nearby place with a conservative return estimate.',places:[p],travel:p.out+p.back,activity:p.duration,total:p.out+p.back+p.duration+payload.buffer,walking:p.walk,cost:0,xp:i===0?45:i===1?75:115,latestLeave:Math.max(0,payload.availableMinutes-(p.back+payload.buffer)),reason:`This real nearby ${p.category} place suits your ${payload.primaryMood} mood. The route time is a conservative distance estimate because the local routing service is unavailable.`,confidence:'Estimated distance; verify directions before leaving.'}))};
}
