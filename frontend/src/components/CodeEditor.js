import React, { useState } from "react";
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css';
import { notifications } from '@mantine/notifications';
import { has, isEmpty } from "lodash";
import { Grid, Select, Group, CopyButton, Button, ScrollArea, Text } from "@mantine/core";
import { FiCopy, FiDownload } from "react-icons/fi";
import prismLanguages from "../utils/prismLanguages";



function hightlightWithLineNumbers(input, language) {
    // Selectively import languages as needed
    require(`prismjs/components/prism-${language}`);

    if (!has(Prism.languages, language)) {
        return input.split("\n")
            .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
            .join("\n");
    }

    return Prism.highlight(input, Prism.languages[language], language)
        .split("\n")
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join("\n");
}

function notifyCopy(copy) {
    copy();
    notifications.show({
        title: "Code Copied!",
        message: "",
        color: "teal",
        icon: <FiCopy />,
    });
}

export default function CodeEditor() {

    const [code, setCode] = useState(`function foo() {
    return "bar";
}`);
    const [currentLanguage, setCurrentLanguage] = React.useState('javascript');

    return (
        <>
            <Text fz="xl">
                Real-Time Code Editor
            </Text>
            <Text fz="sm" color="dimmed" className="mb-3">
                Collaborate on code one-on-one in real-time using this code editor.
                Select a language from the dropdown below and start typing!
            </Text>

            <Grid>
                <Grid.Col span={9}>
                    <Select
                        label="Select Code Language"
                        placeholder="Pick a language"
                        searchable
                        className="mb-3"
                        data={prismLanguages}
                        value={currentLanguage}
                        onChange={value => setCurrentLanguage(value)}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Group position="right" style={{ position: 'relative', bottom: '-20px' }}>
                        <CopyButton value={code}>
                            {({ copied, copy }) => (
                                <Button
                                    onClick={() => notifyCopy(copy)}
                                    variant="gradient"
                                    gradient={copied ?
                                        { from: 'green', to: 'cyan' } :
                                        { from: 'indigo', to: 'cyan' }
                                    }
                                >
                                    <FiCopy />
                                </Button>
                            )}
                        </CopyButton>
                        <Button variant="outline"> <FiDownload /> </Button>
                    </Group>

                </Grid.Col>

            </Grid>

            <ScrollArea h='70vh'>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => hightlightWithLineNumbers(code, currentLanguage)}
                    padding={10}
                    tabSize={4}
                    textareaId="codeArea"
                    className="editor"
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        width: '40vw',
                        minHeight: '70vh',
                    }}
                />
            </ScrollArea>
        </>
    );





}