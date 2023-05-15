import { Button, Center, Navbar, Paper, Text, Title } from "@mantine/core";
import {
  TbHandMiddleFinger,
  TbHandOff,
  TbHandStop,
  TbQuestionMark,
} from "react-icons/tb";

import CommonQuestionViewOnlyDialog from "../dialogs/CommonQuestionViewOnlyDialog";
import React from "react";
import { isEmpty } from "lodash";

export default function StudentSidebar({ token, userProfile }) {
  const [requestingHelp, setRequestingHelp] = React.useState(false);

  const [questionDialogOpen, setQuestionDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (requestingHelp) {
      console.log("Requesting Help");
    }
  }, [requestingHelp]);

  return (
    <>
      <Navbar width={{ base: "15vw" }} height="100vh" p="xs">
        <Navbar.Section>
          <Paper className="mb-3 mt-1" withBorder>
            <Center>
              <Text size="xl" weight={400} className="mt-3">
                Room Code
              </Text>
            </Center>
            <Center>
              <Title order={2} className="mt-1 mb-2">
                {userProfile?.room}
              </Title>
            </Center>
          </Paper>
        </Navbar.Section>

        <Navbar.Section>
          <Paper className="mb-3 mt-1" withBorder>
            <Center>
              <Text size="xl" weight={400} className="mt-3">
                Participating As
              </Text>
            </Center>
            <Center>
              <Title order={2} className="mt-1 mb-2">
                {userProfile?.first_name}
              </Title>
            </Center>
          </Paper>
        </Navbar.Section>

        <Navbar.Section>
          {requestingHelp ? (
            <Button
              fullWidth
              variant="gradient"
              gradient={{ from: "red", to: "darkred" }}
              onClick={() => setRequestingHelp(false)}
              leftIcon={<TbHandOff />}
            >
              Stop Requesting Help
            </Button>
          ) : (
            <Button
              fullWidth
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              onClick={() => setRequestingHelp(true)}
              leftIcon={<TbHandStop />}
              // leftIcon={<TbHandMiddleFinger />}
            >
              Request Help
            </Button>
          )}
        </Navbar.Section>

        <Navbar.Section>
          <Button
            className="mb-3 mt-1"
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={() => setQuestionDialogOpen(true)}
            leftIcon={<TbQuestionMark />}
          >
            F.A.Q.
          </Button>
        </Navbar.Section>
      </Navbar>

      <CommonQuestionViewOnlyDialog
        dialogOpen={questionDialogOpen}
        closeDialog={() => setQuestionDialogOpen(false)}
      />
    </>
  );
}
