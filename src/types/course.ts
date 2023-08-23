import { CourseQuizz } from './quizz';
import { User } from './user';

export type Hashtag = {
    id: number;
    name: string;
    courses: number;
};
export type Level = {
    id: number;
    name: string;
    courses: number;
};
export type Category = {
    id: number;
    name: string;
    image: string;
    description: string;
    courses: number;
};
export type Rating = {
    id: number;
    rating: number;
    student: number;
    video?: any;
};

export type Video = {
    id: number;
    title: string;
    description: string;
    video: string;
    presentation_file: string;
    thumbnail: string;
    duration: string;
    ratings: Rating[];
    average_rating: number;
};
export type Chapter = {
    id: number;
    title: string;
    description: string;
    average_rating: number;
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
    quizz: CourseQuizz;
    students_count: number;

    course_level: Level;
    category: Category;
    hashtags: Hashtag[];

    status: 'pend' | 'app' | 'rej' | 'edi';
    state: 'paused' | 'blocked' | 'running';
    chapters: Chapter[];
    average_rating: number;

    owner: User;
};

export type Progression = {
    pk: number;
    last_video_index: number;
    last_chapter_index: number;
    user: number;
    course: number;
    finished: boolean;
    percentage: number;
};

export type Certificate = {
    pk: number;
    user: User;
    course: Course;
    certificate_image: string;
};

// export type OptionalsVideo =
export type CreationChapter = Partial<Chapter> & {
    title: string;
    description: string;
    uuid?: string;
};

export type CreationVideo = Partial<Video> & {
    title: string;
    description: string;
    uuid?: string;
};
