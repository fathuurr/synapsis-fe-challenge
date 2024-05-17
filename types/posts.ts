export interface IPosts {
  id: number;
  body: string;
  title: string;
  user_id: string;
}

export interface IComment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
