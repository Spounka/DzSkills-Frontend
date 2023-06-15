import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../types/course';
import { getCategories } from '../admin-panel/categories-hashtags/api/queries';
import { LandingPageSection } from './LandingPageSection';

interface LandingPageSectionsProps {}

export function LandingPageSections({}: LandingPageSectionsProps) {
    const theme = useTheme();

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    });

    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                mt={theme.spacing(25)}
                mb={theme.spacing(25)}
                gap={8}
                px={16}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    gap={2}
                >
                    <Typography
                        variant={'h4'}
                        fontWeight={600}
                    >
                        الأقسام
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color={'gray.main'}
                    >
                        يختلف تقسيم الموقع الى أقسام بحسب نوع المحتوى المتاح
                    </Typography>
                </Box>
                <Box
                    display="grid"
                    // gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
                    gap={8}
                    gridAutoFlow={'column'}
                    width={'100%'}
                >
                    {categories.data
                        ? categories.data?.slice(0, 4).map((category: Category) => {
                              return (
                                  <LandingPageSection
                                      key={uuidv4()}
                                      isLoading={categories.isFetching}
                                      image={category.image}
                                      title={category.name}
                                      description={category.description}
                                  />
                              );
                          })
                        : [0, 1, 2, 3].map(_ => {
                              return (
                                  <LandingPageSection
                                      key={uuidv4()}
                                      isLoading={true}
                                      image={''}
                                      title={''}
                                      description={
                                          'تصميم وإنتاج الرسومات والصور والنصوص والرموز التي تستخدم في الإعلانات والتسويق والاتصال البصري'
                                      }
                                  />
                              );
                          })}
                </Box>
            </Box>
        </>
    );
}
