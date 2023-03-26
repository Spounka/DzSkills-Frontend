import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import TopNavigationBar from '../../components/top-bar'
import { MainButton } from '../../components/ui/MainButton'
import theme from '../../theme'
import SideBar from '../edit-profile/components/side-bar'
import { getRelatedOrders } from './api/getOrders'

function Invoices() {
    const token = localStorage.getItem('access_token')

    const query = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getRelatedOrders(token),
        staleTime: 1000 * 60 * 60
    })

    function stateFromCode(s: string) {
        switch (s) {
            case 'p':
                return 'قيد الانتظار'
            case 'a':
                return 'مكتمل'
            case 'r':
                return 'مرفوض'
        }
    }

    return (
        <Grid container columns={14} direction='column' spacing={5} id={'main-grid-container'}
            sx={{
                backgroundColor: "white",
                maxWidth: '100%',
                minHeight: '100vh',
            }}>

            <Grid item xs={14} sx={{
                width: '100%',
            }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid item xs={13} container
                sx={{
                    backgroundColor: 'gray.secondary',
                    pt: theme.spacing(10),
                }}
                style={{
                    padding: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                        width: "100%",
                        maxWidth: '100%',
                        gap: theme.spacing(2),
                        marginBottom: '5rem',
                        paddingRight: theme.spacing(14),
                        paddingLeft: theme.spacing(14),
                        pt: theme.spacing(10),
                    }}
                >
                    <Container
                        sx={{
                            gridColumnStart: 1,
                            gridColumnEnd: 4,
                        }}
                        style={{
                            paddingLeft: '0',
                            paddingRight: '0',
                        }} >
                        <SideBar />
                    </Container>
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 14,
                            maxWidth: '100%',
                            minHeight: "70vh",
                            py: theme.spacing(5),
                            px: theme.spacing(6),
                            borderRadius: theme.spacing(2),
                            display: 'grid',
                            gap: theme.spacing(4),
                        }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,

                        }}>
                            {query.data?.data.map((order: any, index: number) => {
                                return <>
                                    <Box display={'flex'} gap={5}
                                        textAlign={'center'}
                                        key={uuidv4()}
                                    >
                                        <Typography flexGrow={0}>
                                            {order.id}
                                        </Typography>
                                        <Typography flexGrow={0} alignSelf={'left'}>
                                            {order.date_issued}
                                        </Typography>
                                        <Typography flexGrow={1}>
                                            {stateFromCode(order.payment?.status)}
                                        </Typography>
                                        <Typography flexGrow={0}>
                                            {order.course?.price} DA
                                        </Typography>
                                        <MainButton text={'عرض'} color={'primary.main'} />

                                    </Box>
                                    {index < query.data.data.length - 1 && <Divider />}
                                </>
                            })}
                        </Box>
                    </Card>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Invoices