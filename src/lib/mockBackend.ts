const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const canonicalFeeds = [
  { id: 'feed-1', name: 'EPL: Arsenal vs Chelsea - Main Cam', broadcaster: 'Sky Sports', status: 'Stable', latency: '0.12s', health: 98 },
  { id: 'feed-2', name: 'UFC 300: Main Card - PPV Stream', broadcaster: 'ESPN+', status: 'Stable', latency: '0.15s', health: 95 },
  { id: 'feed-3', name: 'F1: Monaco Grand Prix - World Feed', broadcaster: 'F1 TV', status: 'Stable', latency: '0.08s', health: 100 },
  { id: 'feed-4', name: 'NBA: Lakers vs Warriors - National', broadcaster: 'TNT', status: 'Stable', latency: '0.14s', health: 92 },
];

let detectionLogs: any[] = [];
let liveStats = { totalScanned: 145023, totalMatches: 842, revenueRecovered: 125400 };

export const getMockLogs = () => detectionLogs;
export const getMockFeeds = () => canonicalFeeds.map(f => ({ ...f, status: Math.random() > 0.9 ? 'FAIL' : 'Stable', latency: `${(Math.random() * 0.6 + 0.1).toFixed(2)}s`, health: randInt(80, 100) }));
export const getMockStats = () => ({ totalScanned: liveStats.totalScanned, totalMatches: liveStats.totalMatches, avgConfidence: '95.4%', revenueRecovered: `$${liveStats.revenueRecovered.toLocaleString()}` });

export const getMockAnalytics = () => {
  const now = Date.now();
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const h = new Date(now - (23 - i) * 3600000); const s = randInt(400, 600); const d = Math.floor(s * (Math.random() * 0.15 + 0.03));
    return { time: h.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), scans: s, detections: d, enforced: Math.floor(d * (Math.random() * 0.4 + 0.5)) };
  });
  return {
    hourlyData, platformBreakdown: [{ name: 'Twitch', value: 42, color: '#9146FF' }, { name: 'YouTube', value: 31, color: '#FF0000' }, { name: 'TikTok', value: 15, color: '#00F2EA' }, { name: 'Kick', value: 8, color: '#53FC18' }, { name: 'Other', value: 4, color: '#666' }],
    confidenceDistribution: Array.from({ length: 20 }, (_, i) => ({ range: `${50 + i * 2.5}-${52.5 + i * 2.5}%`, count: i < 8 ? randInt(0, 10) : randInt(20, i > 15 ? 120 : 60) }))
  };
};

export const getMockThreatMap = () => [
  { region: 'Eastern Europe', lat: 50.4, lng: 30.5, threats: 847, risk: 'critical' }, { region: 'Southeast Asia', lat: 13.7, lng: 100.5, threats: 623, risk: 'high' }, { region: 'South America', lat: -23.5, lng: -46.6, threats: 412, risk: 'high' }, { region: 'Middle East', lat: 25.2, lng: 55.3, threats: 289, risk: 'medium' }, { region: 'North Africa', lat: 33.9, lng: -6.9, threats: 198, risk: 'medium' }, { region: 'Central Asia', lat: 41.3, lng: 69.3, threats: 156, risk: 'medium' }, { region: 'Western Europe', lat: 48.9, lng: 2.3, threats: 87, risk: 'low' }, { region: 'North America', lat: 40.7, lng: -74.0, threats: 45, risk: 'low' }
];

export const mockEnforce = (logId: string) => {
  const log = detectionLogs.find(l => l.id === logId);
  if (log) { log.status = 'Claimed'; log.enforcedAt = new Date().toISOString(); }
  return log;
};

export const generateMockLog = () => {
  const feed = pick(canonicalFeeds);
  const log = { id: `det-${Date.now()}`, timestamp: new Date().toISOString(), sourceUrl: 'https://unknown', matchedFeed: feed.name, broadcaster: feed.broadcaster, confidence: (Math.random() * 6 + 92).toFixed(1), status: 'Detected', platform: pick(['YouTube', 'Twitch']) };
  detectionLogs.unshift(log); if (detectionLogs.length > 50) detectionLogs.pop();
  liveStats.totalScanned += randInt(5, 20); liveStats.totalMatches++;
  return log;
};
