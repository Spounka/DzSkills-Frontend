import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Level } from "../../../types/course";
import { DisplayTableDataGrid } from "../payment-management/DisplayTableDataGrid";
import { AddButton } from "./AddButton";
import { getLevels } from "./api/queries";

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: "الاسم",

        width: 60,
        headerClassName: 'super-app-theme--header',

        flex: 2,
    },
    {
        field: 'members',
        headerName: 'الأعضاء',
        width: 60,
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'click',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        flex: 1,
        width: 130,
        align: 'left',
        // width: 160,
    },
];
export function Levels() {
    const theme = useTheme();
    const levels = useQuery({
        queryKey: ['levels'],
        queryFn: () => getLevels()
    });
    if (levels.isFetching)
        return <>Fetching levels...</>;
    if (levels.isError)
        return <>Error in levels</>;


    const rows = levels.data?.map((level: Level) => {
        return {
            id: level.id,
            name: level.name,
            members: 12,
        };
    });
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                
                width: '100%',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Typography>
                    المستويات
                </Typography>
                <AddButton title={'اضف مستوى جديد'} />
            </Box>
            <Box sx={{ bgcolor: 'white' }}>
                <DisplayTableDataGrid checkbox rows={rows} columns={columns} />
            </Box>


        </Box>
    );
}
