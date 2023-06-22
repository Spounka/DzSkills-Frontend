import axiosInstance from '../../../../globals/axiosInstance';

export type Choice = {
    value: string;
    display_name: string;
};

export async function getReportTypes() {
    const { data } = await axiosInstance.options('/support/tickets/', {
        headers: { 'Accept-Language': 'ar' },
    });
    console.log(data);
    return data.actions.POST.report_reason.choices as Choice[];
    // return data as Choice[];
}
