import LandingPage from "./pages/LandingPage";
import InstructorHomePage from "./pages/InstructorHomePage";
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import Network from "./utils/network";
import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import WebsiteHeader from "./pages/WebsiteHeader";
import OfficeHourStudentContent from "./pages/OfficeHourStudentContent";
import { AppShell } from "@mantine/core";
import InstructorHomeSidebar from "./components/sidebars/InstructorHomeSidebar";
import StudentSidebar from "./components/sidebars/StudentSidebar";
import InstructorSessionSidebar from "./components/sidebars/InstructorSessionSidebar";
import OfficeHourInstructorContent from "./pages/OfficeHourInstructorContent";


const empty_profile = {
    first_name: "Expired Account.",
    last_name: " | Please Log In Again",
    email: "",
    instructor: false,
};

const instructor_profile = {
    first_name: "Johnny",
    last_name: "Teachalot",
    email: "",
    instructor: true,
    room: ""
};

const student_profile = {
    first_name: "Jane Doe",
    instructor: false,
    room: "abc123",
};

function App() {
    const [token, setToken] = React.useState(null);
    const [userProfile, setUserProfile] = React.useState(empty_profile);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isEmpty(token)) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        // Update the user profile if the token changes
        // if (!isEmpty(token)) {
        //     Network.profile(token)
        //         .then((user) => {
        //             setUserProfile(user);
        //         })
        //         .catch((e) => {
        //             setUserProfile(empty_profile);
        //             updateAndSaveToken(null);
        //         });
        // }

        if (!isEmpty(token)) {
            if (token.includes("instructor")) {
                setUserProfile(instructor_profile);
            } else {
                setUserProfile(student_profile);
            }
        }
    }, [token]);

    async function updateAndSaveToken(token) {
        if (isEmpty(token)) {
            setToken(null);
            setUserProfile(empty_profile);
            localStorage.removeItem("token");
            console.log("Logged out");
        } else {
            localStorage.setItem("token", token);
            setToken(token);
            if (token.includes("instructor")) {
                setUserProfile(instructor_profile);
            } else {
                setUserProfile(student_profile);
            }
        }
    }

    const router = createBrowserRouter([
        {
            path: "*",
            element:
                <AppShell
                    padding="md"
                    fixed
                    navbar={
                        <Routes>
                            <Route path="/" element={
                                <>
                                    {!isEmpty(token) && userProfile?.instructor &&
                                        <InstructorHomeSidebar token={token} userProfile={userProfile} />
                                    }
                                    {!isEmpty(token) && !userProfile?.instructor &&
                                        <StudentSidebar token={token} userProfile={userProfile} />
                                    }
                                </>
                            } />
                            <Route path="/instruct/:roomCode" element={
                                !isEmpty(token) && userProfile?.instructor &&
                                <InstructorSessionSidebar token={token} userProfile={userProfile} />
                            } />

                        </Routes>
                    }
                    header={<WebsiteHeader token={token} updateAndSaveToken={updateAndSaveToken} userProfile={userProfile} />}
                >
                    <Routes>
                        <Route path="/" element={
                            <>
                                {!isEmpty(token) && userProfile?.instructor &&
                                    <InstructorHomePage token={token} userProfile={userProfile} />
                                }
                                {!isEmpty(token) && !userProfile?.instructor &&
                                    <OfficeHourStudentContent token={token} userProfile={userProfile} />
                                }
                                {isEmpty(token) && <LandingPage updateAndSaveToken={updateAndSaveToken} />}
                            </>
                        } />
                        <Route path="/instruct/:roomCode" element={
                            !isEmpty(token) && userProfile?.instructor ?
                                <OfficeHourInstructorContent token={token} userProfile={userProfile} />
                                :
                                <ErrorPage />
                        } />
                    </Routes>
                </AppShell >,
            errorElement: <ErrorPage />,
        },
    ]);


    return <RouterProvider router={router} />
}

export default App;
