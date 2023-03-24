import { Button, Navbar } from "@mantine/core";
import { isEmpty } from "lodash";
import React from "react";
import { FiClock, FiPlus } from "react-icons/fi";


export default function InstructorHomeSidebar({ token, userProfile }) {


    return (
        <Navbar width={{ base: '15vw' }} height='100vh' p="xs" >
            <Navbar.Section className="mb-3">
                <Button
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    leftIcon={<FiPlus />}
                >
                    Start New Session
                </Button>
            </Navbar.Section>

            <Navbar.Section>
                <Button
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    leftIcon={<FiClock />}
                >
                    Schedule Session
                </Button>
            </Navbar.Section>
        </Navbar>
    );


}