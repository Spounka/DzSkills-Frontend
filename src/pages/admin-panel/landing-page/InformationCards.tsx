import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import teaching from '../../../assets/svg/teaching-blue.svg';
import timeBlue from '../../../assets/svg/time-transparent.svg';
import { InformationCard } from '../../../components/InformationCard';
import { getAllPayments } from '../payment-management/api/payments';
import { getAllUsers } from '../user-management/api/getUsers';

export function InformationCards({}: any) {
    const theme = useTheme();

    const users = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    const paymentsQuery = useQuery({
        queryKey: ['payments'],
        queryFn: () => getAllPayments(),
    });

    if (users.isError) return <>users error...</>;
    if (users.isLoading) return <>users loading...</>;

    if (paymentsQuery.isError) return <>paymentsQuery error...</>;
    if (paymentsQuery.isLoading) return <>paymentsQuery loading...</>;

    return (
        <>
            <InformationCard
                title={'طلبات معلقة'}
                subtitle={
                    paymentsQuery.data
                        ?.filter(m => m.status === 'p')
                        .length.toString() || '0'
                }
                icon={timeBlue}
                link={'/admin/payments'}
                sx={{
                    flexBasis: '20%',
                    flexShrink: '1',
                }}
            />
            <InformationCard
                title={'عدد الطلبة'}
                subtitle={
                    users.data
                        ?.filter(user =>
                            user.groups.some(
                                group => !(group.name in ['AdminGroup', 'TeacherGroup'])
                            )
                        )
                        .length.toString() || '12'
                }
                icon={students}
                link={'/admin/users/'}
                sx={{
                    flexBasis: '25%',
                    flexGrow: '1',
                }}
            />

            <InformationCard
                title={'عدد المدربين'}
                subtitle={
                    users.data
                        ?.filter(user =>
                            user.groups.some(group => group.name === 'TeacherGroup')
                        )
                        .length.toString() || '0'
                }
                icon={teaching}
                link={'/admin/users/'}
                sx={{
                    flexBasis: '25%',
                    flexGrow: '1',
                }}
            />

            <InformationCard
                title={'إجمالي الأرباح'}
                subtitle={
                    paymentsQuery.data
                        ?.filter(m => m.status === 'a')
                        .reduce((acc, a) => acc + a.order.course.price, 0)
                        .toFixed(0) + 'DA' || '0'
                }
                icon={money}
                sx={{
                    flexBasis: '20%',
                    flexShrink: '1',
                    bgcolor: theme.palette.secondary.main,
                    color: 'white',
                }}
            />
        </>
    );
}
