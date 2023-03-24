import React from "react";
import { useRouteError } from "react-router-dom";
import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export default function ErrorPage() {
    const { classes } = useStyles();

    const error = useRouteError();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>Error</div>
            <Title className={classes.title}>You might have just discovered a secret place, or simply typed in the address wrong.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                For whatever reason, we can't seem to find the page that you're looking for. We apologize for the inconvenience
                and hope that you can find what you're looking for soon!
            </Text>
            <Group position="center">
                <Button
                    variant="subtle"
                    size="lg"
                    onClick={() => window.history.back()
                    }>
                    Take Me Back!
                </Button>
            </Group>
        </Container>
    );
}