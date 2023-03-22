import React, { useEffect, useState } from "react";
import Network from "../../utils/network";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { FiCheckCircle } from "react-icons/fi";

export default function LoginDialog({
    token,
    updateAndSaveToken,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Do not allow logged in users to access this page
        if (!isEmpty(token)) {
            window.location.href = "/";
        }
    }, [token]);

    function closeModal() {
        navigate("/");
    }

    function login() {
        setLoginError("");

        let errors = false;

        if (isEmpty(password)) {
            setPasswordError(true);
            errors = true;
        } else {
            setPasswordError(false);
        }

        const validEmailRegex =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (isEmpty(email) || !validEmailRegex.test(email)) {
            setEmailError(true);
            errors = true;
        } else {
            setEmailError(false);
        }

        if (errors) {
            return;
        }

        Network.login(email, password)
            .then((token) => {
                updateAndSaveToken(token);
                notifications.show({
                    title: "Login Successful",
                    message: "You have successfully logged in as an instructor.",
                    color: "teal",
                    icon: <FiCheckCircle />,
                });
                closeModal();
            })
            .catch((e) => {
                setLoginError(e.message);
            });
    }

    const loginOnEnterPress = (event) => {
        if (event.key === "Enter") {
            login();
        }
    };

    return (
        <Modal
            title={<Text size="lg" fw={500}>Instructor Login</Text>}
            opened={true}
            onClose={closeModal}
            centered
        >
            <Text size="sm" className="mb-3">
                Login as an instructor to create and manage office hours. If you are a student, please use the
                room code provided by your instructor to participate in office hours.
            </Text>

            <TextInput
                data-autofocus
                id="emailInput"
                label="Email Address"
                placeholder="Your email address"
                onKeyDown={loginOnEnterPress}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? "Please provide a valid email address" : ""}
            />

            <TextInput
                id="passwordInput"
                label="Password"
                placeholder="Your password"
                type="password"
                onKeyDown={loginOnEnterPress}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? "Please provide a password" : ""}
            />


            {!isEmpty(loginError) && (
                <Text color="red" size="sm" ta="center" fw={500} className="mt-3">
                    {loginError}
                </Text>
            )
            }

            <Group position="right" className="mt-3">
                <Button onClick={closeModal} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
                    Cancel
                </Button>
                <Button onClick={login} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    Login
                </Button>
            </Group>
        </Modal>
    );
}
