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

/*
 *     NOTIFICATION_CHOICES = (
 *          (REGISTER, _("New User Registered")),
 *          (COURSE_BUY, _("A User bought your course")),
 *
 *          (PAYMENT_APPROVED, _("Your payment has been approved")),
 *          (PAYMENT_REJECTED, _("Your payment has been rejected")),
 *
 *          (COURSE_APPROVED, _("Your course has been approved")),
 *          (COURSE_REJECTED, _("Your course has been rejected")),
 *    )
 */
