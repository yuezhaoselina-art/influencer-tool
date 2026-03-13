// TikTok API integration
// To use: set TIKTOK_ACCESS_TOKEN in .env

const BASE_URL = "https://open.tiktokapis.com/v2";

export interface TikTokProfile {
  open_id: string;
  display_name: string;
  avatar_url: string;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
  bio_description: string;
}

export interface TikTokVideo {
  id: string;
  title: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
  create_time: number;
}

export async function getTikTokProfile(
  accessToken: string
): Promise<TikTokProfile | null> {
  try {
    const res = await fetch(`${BASE_URL}/user/info/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: [
          "open_id",
          "display_name",
          "avatar_url",
          "follower_count",
          "following_count",
          "likes_count",
          "video_count",
          "bio_description",
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.user || null;
  } catch {
    return null;
  }
}

export async function getTikTokVideos(
  accessToken: string,
  maxCount = 20
): Promise<TikTokVideo[]> {
  try {
    const res = await fetch(`${BASE_URL}/video/list/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_count: maxCount,
        fields: [
          "id",
          "title",
          "like_count",
          "comment_count",
          "share_count",
          "view_count",
          "create_time",
        ],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.videos || [];
  } catch {
    return [];
  }
}

export function calculateEngagementRate(
  videos: TikTokVideo[],
  followerCount: number
): number {
  if (videos.length === 0 || followerCount === 0) return 0;
  const totalEngagement = videos.reduce(
    (sum, v) =>
      sum + (v.like_count || 0) + (v.comment_count || 0) + (v.share_count || 0),
    0
  );
  return (totalEngagement / videos.length / followerCount) * 100;
}
