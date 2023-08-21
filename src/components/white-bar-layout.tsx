import AuthenticationTopBar from './ui/AuthenticationTopBar';
import UserLayout from './user-layout';

function WhiteNavbarLayout() {
    return <UserLayout navBar={<AuthenticationTopBar />} />;
}
export { WhiteNavbarLayout };
