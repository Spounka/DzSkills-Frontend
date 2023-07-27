export type Group = {
    name: string;
};
export type User = {
    pk: number;
    username: string;
    email: string;
    email_valid: boolean;
    first_name: string;
    last_name: string;
    profile_image: string;
    date_joined: string;
    description: string;
    speciality: string;
    nationality: string;
    is_favorite: boolean;
    facebook_link: string;
    instagram_link: string;
    twitter_link: string;
    linkedin_link: string;
    is_banned: boolean;
    last_ban: Date;
    groups: Group[];
    average_rating: number;
};
