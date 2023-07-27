import { Box, Card, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import TopNavigationBar from '../../components/top-bar';
import theme from '../../theme';
import { Order } from '../../types/payment';
import SideBar from '../edit-profile/components/side-bar';
import { InvoiceRow } from './InvoiceRow';
import { getRelatedOrders } from './api/getOrders';
import { useIsBanned } from '../banned-page/BannedPage';

function Invoices() {
    const query = useQuery({
        queryKey: ['invoices'],
        queryFn: () => getRelatedOrders(),
    });

    const invoicesWithUUID = query.data
        ?.sort((a, b) => -a.date_issued.localeCompare(b.date_issued))
        .map((order: Order) => {
            return { ...order, key: uuidv4() };
        });
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    return (
        <Grid
            container
            columns={14}
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
                minHeight: '100vh',
            }}
        >
            <Grid
                item
                xs={14}
                sx={{
                    width: '100%',
                }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid
                item
                xs={13}
                container
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
                        width: '100%',
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
                        }}
                    >
                        <SideBar />
                    </Container>
                    <Card
                        elevation={0}
                        sx={{
                            gridColumnStart: 5,
                            gridColumnEnd: 14,
                            maxWidth: '100%',
                            minHeight: '70vh',
                            py: theme.spacing(5),
                            px: theme.spacing(6),
                            borderRadius: theme.spacing(2),
                            display: 'grid',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                // gap: 2,
                            }}
                        >
                            {invoicesWithUUID
                                ?.sort((a, b) => {
                                    if (!a.payment?.status || !b.payment?.status)
                                        return 0;
                                    if (a.payment.status === 'p') return 1;
                                    if (b.payment.status === 'p') return 1;
                                    if (a.payment.status < b.payment.status) return -1;
                                    if (a.payment.status === b.payment.status) return 0;
                                    return 1;
                                })
                                .map((order: Order & { key: string }, index: number) => {
                                    return (
                                        <React.Fragment key={order.key}>
                                            <InvoiceRow order={order} />
                                            {index < invoicesWithUUID?.length - 1 && (
                                                <Divider />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                        </Box>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Invoices;
