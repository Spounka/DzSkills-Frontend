import { IconButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AttachementImage } from '../../assets/svg/attachement.svg';

interface addFileProps {
    appendFile: (f: { file: File; uuid?: string }) => void;
    enabled?: boolean;
}
export function MessageAddFile({ enabled, appendFile }: addFileProps) {
    return (
        <IconButton
            component={'label'}
            disabled={!enabled}
        >
            <input
                style={{
                    width: 1,
                    height: 1,
                }}
                type="file"
                multiple
                accept=".pdf,image/*,.xlsl,xls,doc,.docx"
                onChange={e => {
                    let fs = e.currentTarget.files;
                    if (fs) {
                        for (const element of fs) {
                            appendFile({ file: element, uuid: uuidv4() });
                            e.currentTarget.files = null;
                        }
                    }
                }}
            />
            <AttachementImage stroke={'black'} />
        </IconButton>
    );
}
