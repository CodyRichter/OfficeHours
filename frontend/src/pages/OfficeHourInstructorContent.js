import { Container, SimpleGrid, Divider } from "@mantine/core";
import React from "react";
import OHDropzone from "../components/OHDropzone";
import CodeEditor from "../components/CodeEditor";
import InstructorNotes from "../components/InstructorNotes";
import { useParams } from "react-router-dom";


export default function OfficeHourInstructorContent({ token, userProfile }) {

    let { roomCode } = useParams();

    return (
        <>
            <SimpleGrid cols={2}>
                <Container>
                    <CodeEditor />
                </Container>

                <Container>
                    <InstructorNotes allowEditing={true} />

                    <Divider className='mt-5 mb-3' />

                    <OHDropzone isStudent={false} />

                </Container>
            </SimpleGrid>
        </>
    );
}