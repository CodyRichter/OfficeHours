import React, { useState } from "react";
import { Button, Center, Container, Divider, Grid, Group, Paper, Text } from "@mantine/core";
import { BsFillCircleFill } from "react-icons/bs";

export default function InstructorHomePage({ token, userProfile }) {

    const [officeHourSessions, setOfficeHourSessions] = useState([
        {
            id: 1,
            name: "Office Hour Session 1",
            description: "This is the first office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: true,
        },
        {
            id: 2,
            name: "Office Hour Session 2",
            description: "This is the second office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: true,
        },
        {
            id: 3,
            name: "Office Hour Session 3",
            description: "This is the third office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
        },
        {
            id: 4,
            name: "Office Hour Session 4",
            description: "This is the fourth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
        },
        {
            id: 5,
            name: "Office Hour Session 5",
            description: "This is the fifth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
        },
        {
            id: 6,
            name: "Office Hour Session 6",
            description: "This is the sixth office hour session",
            start_time: "2021-04-01T12:00:00.000Z",
            end_time: "2021-04-01T13:00:00.000Z",
            active: false,
        }
    ]);

    const [activeSessions, setActiveSessions] = useState(2);
    const [inactiveSessions, setInactiveSessions] = useState(4);

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
                                                    <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
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
                            Inactive Sessions
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
                                        </Container>
                                    </Paper>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </>
                    }
                </Container>
            </Center>
        </>
    );
}