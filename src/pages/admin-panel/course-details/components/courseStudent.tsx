import {RelatedStudent} from "../api/relatedStudent";
import {Avatar, Box, Checkbox, colors, Theme, Typography} from "@mui/material";
import React from "react";

interface Props {
    student: RelatedStudent;
    theme: Theme;
}

export function CourseStudent(props: Props) {
    return <>
        <Box
            sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                cursor: "pointer"

            }}>
            <Checkbox color={"secondary"}/>
            <Avatar
                src={"http://localhost:8000" + props.student.user.profile_image}
                sx={{
                    width: props.theme.spacing(8),
                    height: props.theme.spacing(8),
                    borderRadius: props.theme.spacing(1),
                }}
            />
            <Typography variant="body1">
                {props.student.user.first_name + " " + props.student.user.last_name}
            </Typography>

            <Typography>
                {new Date(props.student.user.date_joined).toDateString()}
            </Typography>
            <Typography>
                {props.student.user.pk}
            </Typography>
            <a href={"/admin/users/" + props.student.user.pk}
               style={{
                   color: colors.yellow[700]
               }}
            >
                عرض
            </a>

        </Box>

    </>;
}