import { User } from '../types/user';
export const defaultUser: { access: string; refresh: string; user: User } = {
    access: '',
    refresh: '',
    user: {
        pk: 1,
        username: '',
        email: '',
        email_valid: false,
        first_name: '',
        last_name: '',
        profile_image: '',
        date_joined: '',
        description: '',
        speciality: '',
        nationality: '',
        average_rating: 0,
        is_favorite: false,
        facebook_link: '',
        instagram_link: '',
        twitter_link: '',
        linkedin_link: '',
        is_banned: false,
        last_ban: null,
        groups: [],
    },
};
