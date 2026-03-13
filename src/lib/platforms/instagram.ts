// Instagram Graph API integration
// To use: set INSTAGRAM_ACCESS_TOKEN in .env

const BASE_URL = "https://graph.instagram.com";

export interface InstagramProfile {
  id: string;
  username: string;
  name: string;
  biography: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string;
}

export interface InstagramMedia {
  id: string;
  caption: string;
  media_type: string;
  like_count: number;
  comments_count: number;
  timestamp: string;
}

export async function getInstagramProfile(
  userId: string,
  accessToken: string
): Promise<InstagramProfile | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/${userId}?fields=id,username,name,biography,followers_count,follows_count,media_count,profile_picture_url&access_token=${accessToken}`
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getInstagramMedia(
  userId: string,
  accessToken: string,
  limit = 25
): Promise<InstagramMedia[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/${userId}/media?fields=id,caption,media_type,like_count,comments_count,timestamp&limit=${limit}&access_token=${accessToken}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export function calculateEngagementRate(
  media: InstagramMedia[],
  followerCount: number
): number {
  if (media.length === 0 || followerCount === 0) return 0;
  const totalEngagement = media.reduce(
    (sum, m) => sum + (m.like_count || 0) + (m.comments_count || 0),
    0
  );
  return (totalEngagement / media.length / followerCount) * 100;
}
