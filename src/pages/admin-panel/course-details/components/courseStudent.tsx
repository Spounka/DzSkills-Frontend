import { RelatedStudent } from '../api/relatedStudent';
import {
    Avatar,
    Box,
    Checkbox,
    colors,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';

interface Props {
    student: RelatedStudent;
    checked?: boolean;
    handleChecked: (id: number) => void;
}

export function CourseStudent(props: Props) {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Checkbox
                    checked={props.checked}
                    color={'secondary'}
                    onChange={() => props.handleChecked(props.student.user.pk)}
                />
                <Avatar
                    src={props.student.user.profile_image}
                    sx={{
                        width: theme.spacing(8),
                        height: theme.spacing(8),
                        borderRadius: theme.spacing(1),
                    }}
                />
                <Typography variant="body1">
                    {props.student.user.first_name + ' ' + props.student.user.last_name}
                </Typography>

                <Typography>
                    {new Date(props.student.user.date_joined).toDateString()}
                </Typography>
                <Typography>{props.student.user.pk}</Typography>
                <a
                    href={'/admin/users/' + props.student.user.pk}
                    style={{
                        color: colors.yellow[700],
                    }}
                >
                    عرض
                </a>
            </Box>
        </>
    );
}
