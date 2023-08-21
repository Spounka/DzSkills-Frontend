export type AdminRating = {
    id: number;
    full_name: string;
    description: string;
    rating: number;
    image: string;
};
export type TitleText = {
    content: string;
    color: string;
};
export type CertificateTemplate = {
    template: string;
};
export type LandingPageImage = {
    id: number;
    image: string;
};
export type AdminConfig = {
    main_title_text: TitleText;
    secondary_title_text: TitleText;
    certificate_template: CertificateTemplate;
    images: LandingPageImage[];
    receipt_usage_count: number;
};
export type Receipt = {
    id: number;
    image: string;
    count: number;
    is_current: Boolean;
};
