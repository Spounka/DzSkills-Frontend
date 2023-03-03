import upload from '../../assets/svg/upload.svg';


export default function UploadSvgIcon({ img, ...other }: any) {
    return <img src={upload} alt="" {...other} />;
}
