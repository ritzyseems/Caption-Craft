export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface Caption {
  id: string;
  user_id: string;
  image_url: string;
  mood: string;
  captions: string[];
  is_favorite: boolean;
  created_at: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
}