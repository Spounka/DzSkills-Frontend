import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';

export function QuizzAccordion({ expanded, setExpanded, titleContent, children }: any) {
    return (
        <Accordion
            expanded={expanded}
            onChange={(_, b) => setExpanded(b)}
            sx={{
                bgcolor: 'transparent',
                border: 'unset',
                outline: 'none',
                boxShadow: 'none',
                borderTop: 'none',
                color: 'white',
                width: '100%',
                ':before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                sx={{
                    color: 'white',
                    transition: 'all 200ms ease-in-out',
                    '.Mui-expanded': {
                        transition: 'all 200ms ease-in-out',
                        minHeight: 'auto',
                    },
                }}
                expandIcon={
                    <ExpandMore
                        sx={{
                            color: 'white',
                            width: '36px',
                            height: '36px',
                        }}
                    />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box>
                    <Typography>{titleContent}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    gap: 4,
                    flexDirection: 'column',
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
