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
