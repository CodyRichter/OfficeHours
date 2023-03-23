import React, { useState } from "react";
import LoginDialog from "./auth/LoginDialog";
import { isEmpty } from "lodash";
import { SignupDialog } from "./auth/SignupDialog";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Center, Group, Header, rem, Text } from "@mantine/core";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

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
                        weight={700}
                        color="white"
                    >
                        Office Hours
                    </Text>

                    {isEmpty(token) ? (
                        <Group>
                            <Button
                                onClick={() => navigate("/register")}
                                leftIcon={<FiUserPlus />}
                            >
                                Instructor Sign Up
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                leftIcon={<FiLogIn />}
                            >
                                Instructor Sign In
                            </Button>
                        </Group>
                    ) : (
                        <Button
                            onClick={() => updateAndSaveToken(null)}
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
