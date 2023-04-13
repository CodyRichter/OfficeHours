import { Button, Navbar } from "@mantine/core";
import { isEmpty } from "lodash";
import React from "react";
import { FiClock, FiPlus } from "react-icons/fi";
import StartSessionDialog from "../dialogs/StartSessionDialog";
import ScheduleSessionDialog from "../dialogs/ScheduleSessionDialog";


export default function InstructorHomeSidebar({ token, userProfile }) {

    const [startSessionDialogOpen, setStartSessionDialogOpen] = React.useState(false);
    const [scheduleSessionDialogOpen, setScheduleSessionDialogOpen] = React.useState(false);

    return (
        <>
            <Navbar width={{ base: '15vw' }} height='100vh' p="xs">
                <Navbar.Section className="mb-3">
                    <Button
                        fullWidth
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        leftIcon={<FiPlus />}
                        onClick={() => setStartSessionDialogOpen(true)}
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
                        onClick={() => setScheduleSessionDialogOpen(true)}
                    >
                        Schedule Session
                    </Button>
                </Navbar.Section>
            </Navbar>

            <StartSessionDialog dialogOpen={startSessionDialogOpen} closeDialog={() => setStartSessionDialogOpen(false)} />
            <ScheduleSessionDialog dialogOpen={scheduleSessionDialogOpen} closeDialog={() => setScheduleSessionDialogOpen(false)} />
        </>
    );


}