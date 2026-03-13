// YouTube Data API v3 integration
// To use: set YOUTUBE_API_KEY in .env

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnails: { default: { url: string } };
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
}

export async function getYouTubeChannel(
  channelId: string,
  apiKey: string
): Promise<YouTubeChannel | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      subscriberCount: parseInt(item.statistics.subscriberCount) || 0,
      videoCount: parseInt(item.statistics.videoCount) || 0,
      viewCount: parseInt(item.statistics.viewCount) || 0,
    };
  } catch {
    return null;
  }
}

export async function searchYouTubeChannels(
  query: string,
  apiKey: string,
  maxResults = 10
): Promise<{ channelId: string; title: string; description: string }[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map(
      (item: { id: { channelId: string }; snippet: { title: string; description: string } }) => ({
        channelId: item.id.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
      })
    );
  } catch {
    return [];
  }
}

export async function getYouTubeVideos(
  channelId: string,
  apiKey: string,
  maxResults = 10
): Promise<YouTubeVideo[]> {
  try {
    // Get video IDs
    const searchRes = await fetch(
      `${BASE_URL}/search?part=id&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`
    );
    if (!searchRes.ok) return [];
    const searchData = await searchRes.json();
    const videoIds = (searchData.items || [])
      .map((item: { id: { videoId: string } }) => item.id.videoId)
      .join(",");

    if (!videoIds) return [];

    // Get video statistics
    const statsRes = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`
    );
    if (!statsRes.ok) return [];
    const statsData = await statsRes.json();

    return (statsData.items || []).map(
      (item: {
        id: string;
        snippet: { title: string; publishedAt: string };
        statistics: { viewCount: string; likeCount: string; commentCount: string };
      }) => ({
        id: item.id,
        title: item.snippet.title,
        viewCount: parseInt(item.statistics.viewCount) || 0,
        likeCount: parseInt(item.statistics.likeCount) || 0,
        commentCount: parseInt(item.statistics.commentCount) || 0,
        publishedAt: item.snippet.publishedAt,
      })
    );
  } catch {
    return [];
  }
}

export function calculateEngagementRate(
  videos: YouTubeVideo[]
): number {
  if (videos.length === 0) return 0;
  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
  if (totalViews === 0) return 0;
  const totalEngagement = videos.reduce(
    (sum, v) => sum + v.likeCount + v.commentCount,
    0
  );
  return (totalEngagement / totalViews) * 100;
}
