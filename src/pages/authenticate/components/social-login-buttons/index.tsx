import facebook from '../../../../assets/svg/icons8-facebook.svg';
import google from '../../../../assets/svg/icons8-google.svg';
import SocialMediaButton from '../social-media-button';
import SvgIcon from '../svg-icon';

function ButtonSvg({ icon, ...other }: any) {
    return (
        <SvgIcon
            icon={icon}
            style={{
                maxHeight: '24px',
                alignSelf: 'center',
                marginLeft: '0.5rem',
                justifySelf: 'center',
            }}
            {...other}
        />
    );
}

function SocialLoginButtons() {
    return (
        <>
            <SocialMediaButton
                variant="outlined"
                color="gray"
            >
                <ButtonSvg icon={facebook} />
                متابعة بفايسبوك
            </SocialMediaButton>
            <SocialMediaButton
                variant="outlined"
                color="gray"
            >
                <ButtonSvg icon={google} />
                متابعة بغوغل
            </SocialMediaButton>
        </>
    );
}
export default SocialLoginButtons;
