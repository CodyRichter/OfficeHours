import { Button, Center, Navbar, Paper, Text, Title } from "@mantine/core";
import { isEmpty } from "lodash";
import React from "react";


export default function StudentSidebar({ token, userProfile }) {


    return (
        <Navbar width={{ base: '15vw' }} height='100vh' p="xs">
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
                            {userProfile?.room}
                        </Title>
                    </Center>
                </Paper>
            </Navbar.Section>

            <Navbar.Section>
                <Paper className="mb-3 mt-1" withBorder>
                    <Center>
                        <Text
                            size="xl"
                            weight={400}
                            className="mt-3"
                        >
                            Participating As
                        </Text>
                    </Center>
                    <Center>
                        <Title order={2} className='mt-1 mb-2'>
                            {userProfile?.first_name}
                        </Title>
                    </Center>
                </Paper>
            </Navbar.Section>
        </Navbar >
    );


}