import React, { useEffect, useState } from "react";
import Network from "../../utils/network";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { Button, Group, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { FiCheckCircle } from "react-icons/fi";
import { DateInput, DateTimePicker } from '@mantine/dates';

export default function ScheduleSessionDialog({ dialogOpen, closeDialog }) {
    const [sessionName, setSessionName] = useState("");
    const [sessionDescription, setSessionDescription] = useState("");
    const [sessionStart, setSessionStart] = useState("");
    const [sessionNameError, setSessionNameError] = useState(false);
    const [sessionDescriptionError, setSessionDescriptionError] = useState(false);
    const [sessionStartError, setSessionStartError] = useState(false);

    const [error, setError] = useState("");

    function startSession() {
        setError("");

        let errors = false;

        if (isEmpty(sessionDescription)) {
            setSessionDescriptionError(true);
            errors = true;
        } else {
            setSessionDescriptionError(false);
        }

        if (isEmpty(sessionName)) {
            setSessionNameError(true);
            errors = true;
        } else {
            setSessionNameError(false);
        }

        if (isEmpty(sessionStart)) {
            setSessionStartError(true);
            errors = true;
        } else {
            setSessionStartError(false);
        }

        if (errors) {
            return;
        }

        // Network.login(email, password)
        //     .then((token) => {
        //         updateAndSaveToken(token);
        //         notifications.show({
        //             title: "Login Successful",
        //             message: "You have successfully logged in as an instructor.",
        //             color: "teal",
        //             icon: <FiCheckCircle />,
        //         });
        //         closeDialog();
        //     })
        //     .catch((e) => {
        //         setLoginError(e.message);
        //     });

        notifications.show({
            title: "Session Created",
            message: "You have successfully created a new office hours session and may now join.",
            color: "teal",
            icon: <FiCheckCircle />,
        });
        closeDialog();
    }

    return (
        <Modal
            title={<Text size="lg" fw={500}>Schedule Future Office Hour Session</Text>}
            opened={dialogOpen}
            onClose={closeDialog}
            centered
            size="md"
        >

            <Text size="sm" className="mb-3">
                Schedule the start of a future office hour session. You will be able to join the session
                after the scheduled start time.
            </Text>

            <TextInput
                className='mt-5'
                data-autofocus
                id="sessionNameInput"
                label="Session Title"
                placeholder="Enter office hour session title"
                onChange={(e) => setSessionName(e.target.value)}
                error={sessionNameError ? "Please provide a valid title" : ""}
            />

            <Textarea
                className='mt-3'
                id="sessionDescriptionInput"
                label="Session Description"
                placeholder="Enter office hour session description"
                onChange={(e) => setSessionDescription(e.target.value)}
                error={sessionDescriptionError ? "Please provide a valid description" : ""}
            />

            <DateTimePicker
                className='mt-3'
                id="sessionStartInput"
                label="Session Start Time"
                valueFormat="MM/DD/YYYY hh:mm A"
                placeholder="Enter office hour session start time"
                mx="auto"
                onChange={(e) => setSessionStart(e.target.value)}
                error={sessionNameError ? "Please provide a valid title" : ""}
                popoverProps={{ zIndex: 10000 }}
            />


            {!isEmpty(error) && (
                <Text color="red" size="sm" ta="center" fw={500} className="mt-3">
                    {error}
                </Text>
            )
            }

            <Group position="right" className="mt-3">
                <Button onClick={closeDialog} variant="outline" color="orange">
                    Cancel
                </Button>
                <Button onClick={startSession} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    Create New Session
                </Button>
            </Group>
        </Modal>
    );
}