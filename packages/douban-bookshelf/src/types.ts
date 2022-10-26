export interface Book {
  id: string;
  title: string;
  ISBN: string;
  doubanUrl: string;
  coverUrl: string;
  subTitle: string;
  originName: string;
  authors: string[];
  translators: string[];
  page: number;
  publishingHouse: string;
  publishingTime: string;
  seriesName: string;
  score: number;
  scorePeopleCount: number;
  contentBrief: string;
}

export type BookField = keyof Book;
