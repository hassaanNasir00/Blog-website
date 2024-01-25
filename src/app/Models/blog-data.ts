export interface BlogData {
  total_blogs: number;
  offset: number;
  limit: number;
  success: boolean;
  message: string;
  blogs: [{ id: number; title: string; photo_url: string; updated_at: string }];
}
