import {
  Button,
  CopyButton,
  Divider,
  Group,
  Modal,
  Table,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FiCheckCircle, FiCopy } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import Network from "../../utils/network";
import { isEmpty } from "lodash";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function CommonQuestionViewOnlyDialog({
  dialogOpen,
  closeDialog,
}) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is a linked list?",
      answer:
        "A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers",
    },
  ]);

  return (
    <Modal
      title={
        <Text size="xl" fw={500}>
          Common Questions
        </Text>
      }
      opened={dialogOpen}
      onClose={closeDialog}
      centered
      size="lg"
    >
      <Divider />
      <Table className="mt-3">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={`question-${question.id}`}>
              <td>{question.question}</td>
              <td>{question.answer}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Group position="right" className="mt-5">
        <Button onClick={closeDialog} variant="outline" color="orange">
          Close
        </Button>
      </Group>
    </Modal>
  );
}
