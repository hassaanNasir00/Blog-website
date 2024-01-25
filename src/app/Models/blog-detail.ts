export interface BlogDetail {
  success: boolean;
  message: string;
  blog: {
    id: number;
    title: string;
    photo_url: string;
    updated_at: string;
    content_text: string;
    description: string;
  };
}
