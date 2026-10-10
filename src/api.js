async function request(path, body) {
  const response = await fetch(path, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(body) });
  const data = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(data.error || 'The service could not complete this request.');
  return data;
}

export function requestLiveQuests(settings, availableMinutes, history) {
  return request('/api/quests', {
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
  });
}

export function geocodeLocation(query) { return request('/api/geocode', { query }); }
