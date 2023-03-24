import { Container, SimpleGrid, Divider } from "@mantine/core";
import React from "react";
import OHDropzone from "../components/OHDropzone";
import CodeEditor from "../components/CodeEditor";
import InstructorNotes from "../components/InstructorNotes";


export default function OfficeHourStudentContent({ token, userProfile }) {

    return (
        <>
            <SimpleGrid cols={2}>
                <Container>
                    <CodeEditor />
                </Container>

                <Container>
                    <InstructorNotes allowEditing={false} />

                    <Divider className='mt-5 mb-3' />

                    <OHDropzone isStudent={true} />

                </Container>
            </SimpleGrid>
        </>
    );
}