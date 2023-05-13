import { User } from "./user";

export type Hashtag = {
	name: string;
};
export type Level = {
	name: string;
};
export type Category = {
	name: string;
};

export type Video = {
	id: number;
	title: string;
	description: string;
	video: string;
	duration: string;
};
export type Chapter = {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	videos: Video[];
};
export type Course = {
	id: number;
	title: string;
	videos_count: number;
	description: string;
	thumbnail: string;
	price: number;
	hastags: string;
	trending: boolean;
	presentation_file: string;
	duration: string;
	used_programs: string;
	language: string;

	course_level: Level;
	category: Category;
	hashtags: Hashtag[];

	status: string;
	chapters: Chapter[];
	owner: User;
};

export type Progression = {
	pk: number;
	last_video_index: number;
	last_chapter_index: number;
	user: number;
	course: number;
};
