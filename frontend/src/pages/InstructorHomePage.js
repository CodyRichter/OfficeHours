import React, { useState } from "react";
import { Button, Center, Container, Divider, Grid, Group, Paper, Text } from "@mantine/core";
import { BsFillCircleFill } from "react-icons/bs";
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import StartSessionDialog from "../components/dialogs/StartSessionDialog";
import ShareSessionDialog from "../components/dialogs/ShareSessionDialog";
import SessionSummaryDialog from "../components/dialogs/SessionSummaryDialog";


export default function InstructorHomePage({ token, userProfile }) {

    const navigate = useNavigate();

    const [officeHourSessions, setOfficeHourSessions] = useState([
        {
            id: 1,
            name: "Office Hour Session 1",
            description: "This is the first office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: true,
            room_code: "ABC123",
        },
        {
            id: 2,
            name: "Office Hour Session 2",
            description: "This is the second office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: true,
            room_code: "ABC123",
        },
        {
            id: 3,
            name: "Office Hour Session 3",
            description: "This is the third office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
            room_code: "ABC123",
        },
        {
            id: 4,
            name: "Office Hour Session 4",
            description: "This is the fourth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
            room_code: "ABC123",
        },
        {
            id: 5,
            name: "Office Hour Session 5",
            description: "This is the fifth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
            room_code: "ABC123",
        },
        {
            id: 6,
            name: "Office Hour Session 6",
            description: "This is the sixth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
            room_code: "ABC123",
        }
    ]);

    const [activeSessions, setActiveSessions] = useState(2);
    const [inactiveSessions, setInactiveSessions] = useState(4);

    const [shareSessionDialogProps, setShareSessionDialogProps] = useState({
        open: false,
        sessionId: null,
    });

    const [sessionSummaryDialogProps, setSessionSummaryDialogProps] = useState({
        open: false,
        sessionId: null,
    });

    function joinSession(roomCode) {
        notifications.show({
            title: 'Joined Office Hour Session',
            message: `Successfully joined ${roomCode} as an instructor.`,
            color: 'green',
            icon: <FiCheckCircle color="green" />,
        });
        navigate(`/instruct/${roomCode}`);
    };

    return (
        <>
            <Center>
                <Container style={{ width: "89%" }} className='mt-4'>

                    {activeSessions > 0 &&
                        <>
                            <Text size="xl" weight={600} className='mb-4' align='left'>
                                Active Sessions
                            </Text>
                            <Grid gutter="lg">
                                {officeHourSessions.filter(session => session.active).map((session) => (

                                    <Grid.Col span={4} key={`${session.id}-card`}>
                                        <Paper
                                            shadow="md"
                                            radius="md"
                                            withBorder
                                            className="pl-4 pr-4 pt-2 pb-2"
                                        >
                                            <Container>
                                                <Group position="right">
                                                    <Center>
                                                        <Text size="sm" weight={700} className='mb-2' align='right'>
                                                            <BsFillCircleFill color="green" /> Active
                                                        </Text>
                                                    </Center>
                                                </Group>


                                                <Text size="xl" weight={700} className='mb-1' align='left'>
                                                    {session.name}
                                                </Text>

                                                <Divider className='mb-2' />

                                                <Text size="sm" className='mb-2' align='left'>
                                                    {session.description}
                                                </Text>

                                                <Divider className='mb-2' />

                                                <Group position="right">
                                                    <Button
                                                        variant="gradient"
                                                        gradient={{ from: 'indigo', to: 'cyan' }}
                                                        onClick={() => setShareSessionDialogProps({
                                                            open: true,
                                                            sessionId: session.id,
                                                        })}
                                                    >
                                                        Share
                                                    </Button>

                                                    <Button
                                                        variant="gradient"
                                                        gradient={{ from: 'indigo', to: 'cyan' }}
                                                        onClick={() => joinSession(session.room_code)}
                                                    >
                                                        Join Session
                                                    </Button>
                                                </Group>

                                            </Container>
                                        </Paper>
                                    </Grid.Col>

                                ))}
                            </Grid>
                        </>
                    }

                    {activeSessions > 0 && inactiveSessions > 0 && <Divider className='mt-4 mb-4' />}

                    {inactiveSessions > 0 && <>
                        <Text size="xl" weight={600} className='mb-4' align='left'>
                            Finished Sessions
                        </Text>

                        {/* Inactive Sessions */}
                        <Grid gutter="lg">
                            {officeHourSessions.filter(session => !session.active).map((session) => (
                                <Grid.Col span={4} key={`${session.id}-card`}>
                                    <Paper
                                        shadow="md"
                                        radius="md"
                                        withBorder
                                        className="pl-4 pr-4 pt-2 pb-2"
                                    >
                                        <Container>
                                            <Text size="xl" weight={700} className='mb-1' align='left'>
                                                {session.name}
                                            </Text>

                                            <Divider className='mb-2' />

                                            <Text size="sm" className='mb-2' align='left' c="diminished">
                                                {session.description}
                                            </Text>

                                            <Divider className='mb-2' />

                                            <Text size="xs" className='mb-2' align='left' c="diminished">
                                                Finished {session.end_time}
                                            </Text>

                                            <Divider className='mb-2' />

                                            <Group position="right">
                                                <Button
                                                    variant="gradient"
                                                    gradient={{ from: 'indigo', to: 'cyan' }}
                                                    onClick={() => setSessionSummaryDialogProps({
                                                        open: true,
                                                        sessionId: session.id,
                                                    })}
                                                >
                                                    View Summary
                                                </Button>
                                            </Group>
                                        </Container>
                                    </Paper>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </>
                    }
                </Container>
            </Center>

            <ShareSessionDialog sessionId={shareSessionDialogProps.sessionId} dialogOpen={shareSessionDialogProps.open} closeDialog={() => setShareSessionDialogProps({ open: false, sessionId: null })} />

            <SessionSummaryDialog sessionId={sessionSummaryDialogProps.sessionId} dialogOpen={sessionSummaryDialogProps.open} closeDialog={() => setSessionSummaryDialogProps({ open: false, sessionId: null })} />

        </>
    );
}