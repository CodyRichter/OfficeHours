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
import WebsiteHeader from "./components/WebsiteHeader";
import OfficeHourStudentPage from "./pages/OfficeHourStudentPage";

const empty_profile = {
    first_name: "Expired Account.",
    last_name: " | Please Log In Again",
    email: "",
    instructor: false,
};

const instructor_profile = {
    first_name: "Expired Account.",
    last_name: " | Please Log In Again",
    email: "",
    instructor: true,
    room: ""
};

const student_profile = {
    first_name: "Student Name",
    instructor: false,
    room: "1234",
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
                <>
                    <WebsiteHeader token={token} updateAndSaveToken={updateAndSaveToken} userProfile={userProfile} />
                    <Routes>
                        <Route path="/session" element={<>
                            <InstructorHomePage token={token} userProfile={userProfile} />
                        </>} />
                        <Route path="/" element={
                            <>
                                {!isEmpty(token) && userProfile?.instructor &&
                                    <InstructorHomePage token={token} userProfile={userProfile} />
                                }
                                {!isEmpty(token) && !userProfile?.instructor &&
                                    <OfficeHourStudentPage token={token} userProfile={userProfile} />
                                }
                                {isEmpty(token) && <LandingPage updateAndSaveToken={updateAndSaveToken} />}
                            </>
                        } />
                    </Routes>
                </>,
            errorElement: <ErrorPage />,
        },
    ]);


    return <RouterProvider router={router} />
}

export default App;
