import React, { useEffect, useState } from "react";
import Network from "../../utils/network";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { Button, CopyButton, Divider, Group, Modal, Table, Text, TextInput, Textarea } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { FiCheckCircle, FiCopy } from "react-icons/fi";

function notifyCopyJoinLink(copy) {
    copy();
    notifications.show({
        title: "Student Join Link Copied!",
        message: "",
        color: "teal",
        icon: <FiCopy />,
    });
}

export default function ShareSessionDialog({ sessionId, dialogOpen, closeDialog }) {

    const [sessionDetails, setSessionDetails] = useState({
        id: 1,
        name: "Office Hour Session 1",
        description: "This is the first office hour session",
        start_time: "2021-04-01T12:00:00.000Z",
        end_time: "2021-04-01T13:00:00.000Z",
        active: true,
        room_code: "123456",
        instructors: [
            {
                id: 1,
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@email.com"
            },
            {
                id: 2,
                first_name: "Jane",
                last_name: "Doe",
                email: "janedoe@email.com"
            }
        ]
    });

    const [instructorEmail, setInstructorEmail] = useState("");
    const [instructorEmailError, setInstructorEmailError] = useState("");


    function shareSession() {

    }

    function removeSharedInstructor(instructorId) {

    }


    const shareOnEnterPress = (event) => {
        if (event.key === "Enter") {
            shareSession();
        }
    };

    return (
        <Modal
            title={<Text size="lg" fw={500}>Share Office Hour Session</Text>}
            opened={dialogOpen}
            onClose={closeDialog}
            centered
            size="lg"
        >


            <Divider />


            <Group position="apart" className="mt-3 mb-3">
                <Text size="lg" fw={300}>
                    Student Join Link: &nbsp;
                    <a
                        href={`http://localhost:3000/join/${sessionDetails.room_code}`}
                        target='_blank'
                    >
                        http://localhost:3000/join/{sessionDetails.room_code}
                    </a>
                </Text>
                <CopyButton value={`http://localhost:3000/join/${sessionDetails.room_code}`}>
                    {({ copied, copy }) => (
                        <Button
                            onClick={() => notifyCopyJoinLink(copy)}
                            variant="gradient"
                            gradient={copied ?
                                { from: 'green', to: 'cyan' } :
                                { from: 'indigo', to: 'cyan' }
                            }
                        >
                            {copied ?
                                <><FiCopy /> &nbsp; Copied!</> :
                                <><FiCopy /> &nbsp; Copy Link</>
                            }
                        </Button>
                    )}
                </CopyButton>
            </Group>

            <Divider />

            <Text size="lg" fw={500} className="mt-3 mb-3">
                Invite Instructors to Co-Host Session
            </Text>

            <Group position="apart">
                <TextInput
                    style={{ width: "70%" }}
                    id="emailInput"
                    type="text"
                    placeholder="Enter instructor email address"
                    onKeyDown={shareOnEnterPress}
                    onChange={(e) => setInstructorEmail(e.target.value)}
                    error={!isEmpty(instructorEmailError) ? instructorEmailError : null}
                />
                <Button onClick={shareSession} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    Send Invitation
                </Button>
            </Group>

            {sessionDetails.instructors.length > 0 &&
                <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionDetails.instructors.map((instructor, index) => (
                            <tr key={index}>
                                <td>{instructor.first_name} {instructor.last_name}</td>
                                <td>{instructor.email}</td>
                                <td>
                                    <Button
                                        onClick={() => removeSharedInstructor(instructor.id)}
                                        variant="subtle"
                                        color="red"
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }


            <Group position="right" className="mt-5">
                <Button onClick={closeDialog} variant="outline" color="orange">
                    Close
                </Button>
            </Group>
        </Modal>
    );
}