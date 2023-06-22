import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Choice } from './api/getReportReason';

export function SupportRadioGroup({ choices }: { choices: Choice[] }) {
    return (
        <RadioGroup
            defaultValue={'issue'}
            name={'type'}
            sx={{
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                },
                gap: 1,
                alignItems: {
                    xs: 'flex-start',
                    lg: 'center',
                },
                justifyContent: {
                    xs: 'center',
                    lg: 'flex-start',
                },
            }}
        >
            {choices.map(choice => {
                return (
                    <FormControlLabel
                        key={choice.value}
                        sx={{
                            px: 0,
                            mx: 0,
                            gap: 1,
                        }}
                        value={choice.value}
                        control={
                            <Radio
                                size="small"
                                color="purple"
                                sx={{
                                    p: 0,
                                }}
                            />
                        }
                        label={choice.display_name}
                    />
                );
            })}
        </RadioGroup>
    );
}
