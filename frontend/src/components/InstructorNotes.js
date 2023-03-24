import { Paper, ScrollArea, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { isNull } from "lodash";

export default function InstructorNotes({ allowEditing }) {

    const [content, setContent] = React.useState({});

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Write notes to the student here.' })
        ],
        onUpdate({ editor }) {
            setContent(editor.getJSON());
        },
    });

    useEffect(() => {
        if (!isNull(editor)) {
            editor.setEditable(allowEditing)
        }
    }, [allowEditing, editor])

    return (
        <>
            <Text fz="xl">
                {allowEditing ? 'Notes To Student' : 'Notes From Instructor'}
            </Text>
            <Text fz="sm" color="dimmed" className="mb-2">
                {allowEditing ? 'These notes will be visible to the student.' : 'Individual notes from the instructor will appear here.'}
            </Text>

            <Paper withBorder style={{ width: '35vw' }} >
                <RichTextEditor editor={editor}>
                    {allowEditing && (
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>
                    )}
                    <ScrollArea h='30vh'>
                        <RichTextEditor.Content />
                    </ScrollArea>
                </RichTextEditor>

            </Paper>
        </>
    )
}


