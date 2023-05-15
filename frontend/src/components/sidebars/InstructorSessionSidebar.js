import {
  Button,
  Center,
  Navbar,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { RiQuestionMark, RiShutDownLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import CommonQuestionEditDialog from "../dialogs/CommonQuestionEditDialog";
import { IoExit } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbHandStop } from "react-icons/tb";
import { isEmpty } from "lodash";
import { notifications } from "@mantine/notifications";

export default function InstructorSessionSidebar({ token, userProfile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [roomCode, setRoomCode] = React.useState("");

  const [faqOpen, setFaqOpen] = React.useState(false);

  useEffect(() => {
    setRoomCode(location.pathname.split("/")[2]);
  }, [location]);

  function leaveSession() {
    notifications.show({
      title: "Left Session",
      message: `You have left session ${roomCode}`,
      color: "orange",
      icon: <IoExit />,
    });
    navigate(`/`);
  }

  function endSession() {
    notifications.show({
      title: "Office Hours Ended",
      message: `You have ended session ${roomCode}. Any students currently in the session will be disconnected.`,
      color: "red",
      icon: <RiShutDownLine />,
    });
    navigate(`/`);
  }

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
                {isEmpty(roomCode) ? "..." : roomCode}
              </Title>
            </Center>
          </Paper>
        </Navbar.Section>
        <Navbar.Section>
          <Text size="xl" weight={400}>
            Students in Session
          </Text>

          <Paper className="mt-2" withBorder>
            <Table>
              <th></th>
              <th></th>
              <th></th>
              <tbody>
                <tr>
                  <td>
                    <TbHandStop size={20} />
                  </td>
                  <td>John Doe</td>
                  <td>
                    <Button variant="subtle" color="blue">
                      Visit
                    </Button>
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#4DABF7" }}>
                  <td></td>
                  <td>Jane Doe</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Timmy Smith</td>
                  <td>
                    <Button variant="subtle" color="blue">
                      Visit
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TbHandStop size={20} />
                  </td>
                  <td>Jimmy McHill</td>
                  <td>
                    <Button variant="subtle" color="blue">
                      Visit
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Navbar.Section>

        <Navbar.Section>
          <Button
            className="mb-3 mt-1"
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={() => setFaqOpen(true)}
            leftIcon={<RiQuestionMark />}
          >
            Edit F.A.Q.
          </Button>
        </Navbar.Section>

        <Navbar.Section>
          <Button
            fullWidth
            variant="outline"
            color="orange"
            leftIcon={<IoExit size={20} />}
            onClick={leaveSession}
            className="mb-3 mt-5"
          >
            Leave Session
          </Button>
          <Button
            fullWidth
            variant="outline"
            color="red"
            leftIcon={<RxCross2 size={20} />}
            onClick={endSession}
          >
            End Session
          </Button>
        </Navbar.Section>
      </Navbar>

      <CommonQuestionEditDialog
        dialogOpen={faqOpen}
        closeDialog={() => setFaqOpen(false)}
      />
    </>
  );
}
