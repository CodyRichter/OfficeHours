import React, { useState } from "react";
import LoginDialog from "../components/auth/LoginDialog";
import { isEmpty } from "lodash";
import { SignupDialog } from "../components/auth/SignupDialog";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Center, Group, Header, rem, Text } from "@mantine/core";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";
import { IoSchoolSharp } from "react-icons/io5";

export default function WebsiteHeader({
    token,
    updateAndSaveToken,
    userProfile,
}) {

    const navigate = useNavigate();

    return (
        <>
            <Header className='p-2' bg='navy' height={rem(55)}>
                <Group position="apart">
                    <Text
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                        size="xl"
                        weight={600}
                        color="white"
                    >
                        <IoSchoolSharp />
                        &nbsp;
                        AccOH
                    </Text>

                    {isEmpty(token) ? (
                        <Group>
                            <Button
                                onClick={() => navigate("/register")}
                                variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                                leftIcon={<FiUserPlus />}
                            >
                                Instructor Sign Up
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                                leftIcon={<FiLogIn />}
                            >
                                Instructor Sign In
                            </Button>
                        </Group>
                    ) : (
                        <Button
                            onClick={() => updateAndSaveToken(null)}
                            variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                            leftIcon={<FiLogOut />}
                        >
                            {userProfile?.instructor ? "Log Out" : "Leave Session"}
                        </Button>
                    )}
                </Group>
            </Header>


            <Routes>
                <Route
                    path="login"
                    element={<LoginDialog
                        updateAndSaveToken={updateAndSaveToken}
                        token={token}
                    />
                    }
                />
            </Routes>

            <Routes>
                <Route
                    path="register"
                    element={<SignupDialog
                        token={token}
                    />
                    }
                />
            </Routes>
        </>
    );
}
