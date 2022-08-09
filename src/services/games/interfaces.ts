export interface GameQuery {
  background_image: string;
  community_rating: number;
  dominant_color: string;
  id: number;
  name: string;
  platforms: Array<GamePlatform>;
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: Array<any>;
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  short_screenshots: Array<ShortScreenshot>;
  slug: string;
  suggestions_count: number;
  updated: string;
}

interface GamePlatform {
  id: number;
  name: string;
  slug: string;
}

interface ShortScreenshot {
  id: number;
  image: string;
}
