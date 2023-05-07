import axiosInstance from "../../../../globals/axiosInstance";
import {User} from "../../../../types/user";

export type RelatedStudent = {
    user: User,
    last_video_index: number,
    last_chapter_index: number,
}

export async function getRelatedStudents(pk: number) {
    const {data} = await axiosInstance('/courses/' + pk + '/students');
    return data as RelatedStudent[]
}