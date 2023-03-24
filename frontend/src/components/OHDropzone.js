import React from "react";
import { Group, Text, useMantineTheme, rem, ScrollArea, Divider, Center } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export default function OHDropzone({ isStudent }) {
    const theme = useMantineTheme();

    const [files, setFiles] = React.useState([]);
    const [rejectedFiles, setRejectedFiles] = React.useState([]);

    return (
        <>
            <Text fz="xl" className='mt-4'>
                Share Files
            </Text>
            <Text fz="sm" color="dimmed">
                {isStudent ? 'These files will be visible to the instructor.' : 'Individual files from the student will appear here.'}
            </Text>

            <Dropzone
                onDrop={(files) => setFiles(files)}
                onReject={(files) => setRejectedFiles(files)}
                // accept={IMAGE_MIME_TYPE}
                style={{ width: '35vw' }}
            >
                <Group position="center" spacing="xl" style={{ minHeight: rem(200), pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag files here or click to open file browser
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>


            <ScrollArea h='10vh'>
                {files.length > 0 ? (
                    <div>
                        {files.map((file) => (
                            <div key={file.name}>
                                {file.name} - {file.size} bytes
                            </div>
                        ))}
                    </div>
                ) :
                    <div className="mt-5">
                        <Center>
                            <Text size="xl" inline color="dimmed">
                                No files uploaded
                            </Text>
                        </Center>
                    </div>
                }


            </ScrollArea>

        </>
    )
}