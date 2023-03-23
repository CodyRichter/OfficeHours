import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Container, Divider, Group, Paper, PinInput, Text, TextInput } from "@mantine/core";
import { isEmpty } from "lodash";
import { notifications } from '@mantine/notifications';
import { FiCheckCircle } from "react-icons/fi";


export default function LandingPage({ updateAndSaveToken }) {

    const [roomCode, setRoomCode] = useState("");
    const [roomCodeError, setRoomCodeError] = useState('');

    const [studentName, setStudentName] = useState("");
    const [studentNameError, setStudentNameError] = useState('');

    const navigate = useNavigate();

    const joinRoom = () => {
        let errorCount = 0;

        if (isEmpty(roomCode)) {
            setRoomCodeError('Please enter a room code');
            errorCount++;
        } else if (roomCode.length !== 6) {
            setRoomCodeError('Room code must be 6 characters long');
            errorCount++;
        } else {
            setRoomCodeError('');
        }

        if (isEmpty(studentName)) {
            setStudentNameError('Please enter your name');
            errorCount++;
        } else {
            setStudentNameError('');
        }

        if (errorCount > 0) {
            return;
        }

        notifications.show({
            title: 'Joined Office Hours',
            message: `You have joined office hours room ${roomCode} as ${studentName}`,
            icon: <FiCheckCircle />,
            color: 'teal',
            autoClose: 5000,
        });

        updateAndSaveToken('student-roomcode-token');
    };


    return (
        <Center style={{ height: "80vh" }}>
            <Paper
                shadow="md"
                radius="xl"
                withBorder
                className="p-4"
            >
                <Container>
                    <Text size="xl" weight={700} className='mb-2' align='center'>
                        Join Office Hours
                    </Text>

                    <Divider className='mb-3' />

                    <TextInput
                        className="mb-3"
                        placeholder="Enter your name"
                        onChange={(event) => setStudentName(event.currentTarget.value)}
                        error={!isEmpty(studentNameError) ? studentNameError : undefined}
                    />

                    <Text size="sm" weight={700} className='mb-2' align='left'>
                        Enter Room Code
                    </Text>
                    <PinInput
                        length={6}
                        placeholder="⊡"
                        onChange={(value) => setRoomCode(value)}
                        error={!isEmpty(roomCodeError)}
                    />
                </Container>

                {roomCodeError && (
                    <Center>
                        <Text color="red" size="sm" className="mt-1">
                            {roomCodeError}
                        </Text>
                    </Center>
                )}


                <Center className="mt-4">
                    <Button
                        onClick={joinRoom}
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                    >
                        Join
                    </Button>
                </Center>
            </Paper>
        </Center >
    );
}
