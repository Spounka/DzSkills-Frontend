import {
    Autocomplete,
    CircularProgress,
    FormLabel,
    TextField,
    useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useLogin from '../../authenticate/hooks/useLogin';
import { getUsernames } from './api/getUsernames';

export function SupportAutocomplete({}: {}) {
    const theme = useTheme();
    const [enabled, setEnabled] = useState<boolean>(false);
    const [reported, setReported] = useState<string | number>(2);
    const [user] = useLogin();

    const usernamesQuery = useQuery({
        queryKey: ['usernames'],
        queryFn: () => getUsernames(),
    });

    useEffect(() => {
        setEnabled(false);
        setTimeout(() => setEnabled(true), 3000);
    }, [usernamesQuery.isFetching]);

    if (!usernamesQuery.data) return <>No data...</>;

    return (
        <>
            <FormLabel>اسم المستخدم</FormLabel>
            <Autocomplete
                color={'purple.main'}
                fullWidth={true}
                sx={{
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.purple.main,
                    },
                }}
                loading={enabled}
                renderInput={params => (
                    <TextField
                        onChange={e => setReported(e.target.value)}
                        color={'info'}
                        {...params}
                        label="المستخدم"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {!enabled ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                options={
                    enabled
                        ? usernamesQuery.data?.filter(
                              u =>
                                  user.data?.username !== u.username &&
                                  !u.groups.some(g => g.name === 'AdminGroup')
                          )
                        : []
                }
                getOptionLabel={o => o.username}
                onChange={(event, user) => {
                    //@ts-expect-error
                    // reportedRef.current.value = user.pk;
                    setReported(user.id);
                }}
            />{' '}
            <input
                name="reported"
                type={'hidden'}
                value={reported}
            />
        </>
    );
}
