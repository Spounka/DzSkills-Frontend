import React, { useState } from "react";
import { useGetUser } from "../globals/hooks";
import { LandingPageNavbar } from "../pages/landing-page/LandingPageNavbar";
import TopNavigationBar from "./top-bar";
import UserLayout from "./user-layout";

function BlackNavbarLayout() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    useGetUser({ onSuccess: () => setLoggedIn(true) })

    return (
        <React.Fragment>
            <UserLayout navBar={loggedIn ? <TopNavigationBar /> : <LandingPageNavbar />} />
        </React.Fragment>
    )
}
export { BlackNavbarLayout };
