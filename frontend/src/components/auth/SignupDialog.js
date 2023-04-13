import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import React from "react";
import Network from "../../utils/network";
import { useNavigate } from "react-router-dom";
import { Modal, TextInput, Group, Text, Alert, Button, Loader, SimpleGrid } from "@mantine/core";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { notifications } from '@mantine/notifications';

const specialCharacterArray = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  '"',
  "'",
  "<",
  ">",
  ",",
  ".",
  "?",
  "/",
  "\\",
];
const validEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export function SignupDialog({ token }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Do not allow logged in users to access this page
    if (!isEmpty(token)) {
      window.location.href = "/";
    }
  }, [token]);

  function closeModal() {
    navigate("/");
  }

  const handleClose = () => {
    closeModal();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSignupError('');
    setLoading(false);
  };

  function validateForm() {
    let errorCount = 0;
    if (isEmpty(firstName)) {
      setFirstNameError("First name is required");
      errorCount++;
    } else {
      setFirstNameError('');
    }


    if (isEmpty(lastName)) {
      setLastNameError("Last name is required");
      errorCount++;
    } else {
      setLastNameError('');
    }

    if (isEmpty(email)) {
      setEmailError("Email address is required");
      errorCount++;
    } else if (!validEmailRegex.test(email)) {
      setEmailError("You must provide a valid email address");
      errorCount++;
    } else {
      setEmailError('');
    }

    if (isEmpty(password)) {
      setPasswordError("Password is required");
      errorCount++;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      errorCount++;
    } else if (!specialCharacterArray.some((e) => password.includes(e))) {
      setPasswordError("Password must contain at least one special character");
      errorCount++;
    } else {
      setPasswordError('');
    }

    if (isEmpty(confirmPassword)) {
      setConfirmPasswordError("Password confirmation is required");
      errorCount++;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      errorCount++;
    } else {
      setConfirmPasswordError('');
    }

    return errorCount === 0;
  }

  function triggerSignup() {
    // Validate the form before submitting.
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    Network.register(firstName, lastName, email, password)
      .then(() => {
        setLoading(false);
        notifications.show({
          title: 'Account Created Successfully',
          message: 'Your account has been created successfully. Please check your email for a verification link.',
          color: "teal",
          icon: <FiCheckCircle />,
          autoClose: 5000,
        });
        handleClose();
      })
      .catch((error) => {
        setSignupError(error.message);
        setLoading(false);
      });
  }

  return (
    <>
      <Modal
        title={<Text size="lg" fw={500}>Instructor Sign Up</Text>}
        opened={true}
        onClose={closeModal}
        centered
        size="lg"
      >
        <Text size="sm" className="mb-3">
          Enter your information below to create an instructor account.
          Once verified, you will be able to create and manage office hour sessions.
          <br />
          <br />
          If you are a student, you can directly participate in office hour sessions
          without creating an account by using the code provided by your instructor.
        </Text>
        <SimpleGrid cols={2} className='mb-3'>
          <TextInput
            data-autofocus
            id="firstNameInput"
            label="First Name"
            placeholder="Your first name"
            onChange={(e) => setFirstName(e.target.value)}
            error={!isEmpty(firstNameError) ? firstNameError : ""}
          />

          <TextInput
            id="lastNameInput"
            label="Last Name"
            placeholder="Your last name"
            onChange={(e) => setLastName(e.target.value)}
            error={!isEmpty(lastNameError) ? lastNameError : ""}
          />

        </SimpleGrid>

        <TextInput
          id="emailInput"
          label="Email"
          placeholder="Your email address"
          onChange={(e) => setEmail(e.target.value)}
          error={!isEmpty(emailError) ? emailError : ""}
        />
        <Text size="sm" className="mb-3" c="dimmed">
          Use your school email address to verify your instructor status.
        </Text>

        <SimpleGrid cols={2}>
          <TextInput
            id="passwordInput"
            label="Password"
            placeholder="Create a password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            error={!isEmpty(passwordError) ? passwordError : ""}
          />

          <TextInput
            id="confirmPasswordInput"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!isEmpty(confirmPasswordError) ? confirmPasswordError : ""}
          />
        </SimpleGrid>
        <Text size="sm" className="mb-3" c="dimmed">
          Password must be at least 8 characters and contain at least one special character.
        </Text>


        {!isEmpty(signupError) && (
          <Alert color="red" className="mt-4" data-testid="signupError" icon={<FiAlertCircle />} >
            <Text size="sm">
              {signupError}
            </Text>
          </Alert>
        )}

        <Group position="right" className="mt-3">
          <Button onClick={closeModal} variant="outline" color="orange">
            Cancel
          </Button>
          <Button onClick={triggerSignup} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
            {loading ? <Loader /> : "Create Account"}
          </Button>
        </Group>
      </Modal>
    </>
  );
}
