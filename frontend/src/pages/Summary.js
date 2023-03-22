import { has, isEmpty } from "lodash";
import React, { useEffect } from "react";


export default function Summary({ token, userProfile }) {

    useEffect(() => {
        // Only allow admins to access this page
        if (isEmpty(token) || isEmpty(userProfile) || !has(userProfile, "admin") || !userProfile["admin"]) {
            window.location.href = "/";
        }
    }, [token, userProfile]);


    return (
        <>

        </>
    );
}