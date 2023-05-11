import React, { useEffect, useState } from "react";
import Network from "../../utils/network";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { Button, CopyButton, Divider, Group, Modal, Table, Text, TextInput, Textarea } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { FiCheckCircle, FiCopy } from "react-icons/fi";

export default function SessionSummaryDialog({ sessionId, dialogOpen, closeDialog }) {

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

    const [sessionStatistics, setSessionStatistics] = useState({
        total_students: 3,
        total_questions: 2,
        average_wait_time: 125000,
        common_questions: ["What is a linked list?", "How do I hash a string?"]
    });


    return (
        <Modal
            title={<Text size="xl" fw={500}>Session Summary</Text>}
            opened={dialogOpen}
            onClose={closeDialog}
            centered
            size="lg"
        >
            <Divider />


            {sessionDetails && sessionDetails.instructors &&
                <Table className="mt-3">
                    <tbody>
                        <tr key='total-students'>
                            <td>Total Students</td>
                            <td>{sessionStatistics.total_students} Students</td>
                        </tr>
                        <tr key='total-questions'>
                            <td>Total Questions</td>
                            <td>{sessionStatistics.total_questions} Questions</td>
                        </tr>
                        <tr key='average-wait-time'>
                            <td>Average Wait Time</td>
                            <td>{Math.round(sessionStatistics.average_wait_time / 60000)} Minutes</td>
                        </tr>
                        <tr key='session-duration'>
                            <td>Session Duration</td>
                            <td>{Math.round((Date.parse(sessionDetails.end_time) - Date.parse(sessionDetails.start_time)) / 60000)} Minutes</td>
                        </tr>
                    </tbody>
                </Table>
            }


            <Divider className="mt-5" />

            <Text size="xl" fw={500} className="mt-3">Instructors</Text>
            {sessionDetails && sessionDetails.instructors &&
                <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionDetails.instructors.map((instructor) => (
                            <tr key={instructor.id}>
                                <td>{instructor.first_name} {instructor.last_name}</td>
                                <td>{instructor.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }

            <Divider className="mt-5" />

            <Text size="xl" fw={500} className="mt-3">Common Questions</Text>
            {sessionStatistics && sessionStatistics.common_questions &&

                <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionStatistics.common_questions.map((question) => (
                            <tr key={question}>
                                <td>{question}</td>
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