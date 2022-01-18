import React from "react";
import Profile from "../components/account/Profile";
import {InterestsContainer} from "../helpers/interests-container";
import {RolesContainer} from "../helpers/roles-container";

export default function Home() {

        InterestsContainer.clear();
        RolesContainer.clear();
        return <>
            <Profile/>
        </>
}