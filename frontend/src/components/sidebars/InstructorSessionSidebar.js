import { Button, Center, Navbar, Paper, Title, Text } from "@mantine/core";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import { notifications } from '@mantine/notifications';
import { RiShutDownLine } from "react-icons/ri";

export default function InstructorSessionSidebar({ token, userProfile }) {

    const navigate = useNavigate();
    const location = useLocation()

    const [roomCode, setRoomCode] = React.useState('');

    useEffect(() => {
        setRoomCode(location.pathname.split('/')[2]);
    }, [location]);

    function leaveSession() {
        notifications.show({
            title: 'Left Session',
            message: `You have left session ${roomCode}`,
            color: 'orange',
            icon: <IoExit />,
        });
        navigate(`/`);
    };

    function endSession() {
        notifications.show({
            title: 'Office Hours Ended',
            message: `You have ended session ${roomCode}. Any students currently in the session will be disconnected.`,
            color: 'red',
            icon: <RiShutDownLine />,
        });
        navigate(`/`);
    };

    return (
        <Navbar width={{ base: '15vw' }} height='100vh' p="xs" >
            <Navbar.Section>
                <Paper className="mb-3 mt-1" withBorder>
                    <Center>
                        <Text
                            size="xl"
                            weight={400}
                            className="mt-3"
                        >
                            Room Code
                        </Text>
                    </Center>
                    <Center>
                        <Title order={2} className='mt-1 mb-2'>
                            {isEmpty(roomCode) ? '...' : roomCode}
                        </Title>
                    </Center>
                </Paper>
            </Navbar.Section>

            <Navbar.Section className="mt-3">
                <Button
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'orange', to: 'red' }}
                    leftIcon={<IoExit size={20} />}
                    onClick={leaveSession}
                >
                    Leave Session
                </Button>
            </Navbar.Section>

            <Navbar.Section className="mt-3">
                <Button
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'red', to: 'darkred' }}
                    leftIcon={<IoExit size={20} />}
                    onClick={endSession}
                >
                    End Session
                </Button>
            </Navbar.Section>

        </Navbar>
    );


}