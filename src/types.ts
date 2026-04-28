export interface Feed {
  id: string;
  name: string;
  broadcaster: string;
  hash: string;
  status: string;
  latency?: string;
  health?: number;
  errorCode?: string;
}

export interface DetectionLog {
  id: string;
  timestamp: string;
  sourceUrl: string;
  matchedFeed: string;
  broadcaster: string;
  confidence: string;
  status: 'Detected' | 'Claimed' | 'Ignored';
  platform: 'YouTube' | 'Twitch' | 'Kick' | 'TikTok';
  enforcedAt?: string;
}

export interface Stats {
  totalScanned: number;
  totalMatches: number;
  avgConfidence: string;
  revenueRecovered: string;
}
