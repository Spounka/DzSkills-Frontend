//TODO: remove the non-used fields and add proper models to destinguish between models

export type User = {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    date_joined: string;
    description: string;
    speciality: string;
    nationality: string;
};
