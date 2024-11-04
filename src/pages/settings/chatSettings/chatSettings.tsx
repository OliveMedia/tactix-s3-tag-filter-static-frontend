import { useGetUsers } from "@/pages/users/hooks";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Menu,
  Modal,
  Pagination,
  rem,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconDots, IconEdit, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import NoDataImage from "../../../assets/images/nodata.svg";
import GlobalStepConfiguration from "./globalStepConfiguration";
import { useGetUserSteps } from "../hooks";
import UserStepConfiguration from "./userStepConfiguration";
import { useEffect, useState } from "react";

const ChatSettings = () => {
  const { userData, totalPages, setCurrentPage, currentPage, isLoading } =
    useGetUsers();

  const { isFetching, userSteps } = useGetUserSteps();

  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const [opened, { open, close }] = useDisclosure(false);
  const [
    globalStepConfigurationFormOpended,
    {
      open: openGlobalStepConfigurationForm,
      close: closeGlobalStepConfigurationForm,
    },
  ] = useDisclosure(false);

  console.log({ userSteps });

  const rows = userSteps?.user_steps?.map((user: any, index: number) => (
    <Table.Tr key={user.user_step?.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{user.user.name}</Table.Td>
      <Table.Td>{user.user.genders}</Table.Td>
      <Table.Td>{user.start_step}</Table.Td>
      <Table.Td>
        {user.status ? (
          <Badge color="teal" variant="filled">
            Active
          </Badge>
        ) : (
          <Badge color="gray" variant="outline">
            Inactive
          </Badge>
        )}
      </Table.Td>

      {/* <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDots className="cursor-pointer" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEdit style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => {
                setSelectedItemForEdit(user);
                open();
              }}
            >
              Edit Step
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td> */}
    </Table.Tr>
  ));

  const rowsSkeletonLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    (item) => (
      <Table.Tr key={item}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Table.Td key={item}>
            <Skeleton h={20} />
          </Table.Td>
        ))}
      </Table.Tr>
    )
  );

  return (
    <>
      <Flex direction="column" align="end" gap="lg" h="calc(100vh - 170px)">
        <Group justify="space-between" w="100%">
          <Text>
            Global Step:
            <Badge
              ml={10}
              size="lg"
              color={userSteps?.global_steps?.status ? "teal" : "gray"}
              variant={userSteps?.global_steps?.status ? "filled" : "outline"}
            >
              {userSteps?.global_steps?.start_step}
            </Badge>
          </Text>
          <Group>
            <Button onClick={open}>Add Steps</Button>
            <Button onClick={openGlobalStepConfigurationForm}>
              Configure Global Step
            </Button>
          </Group>
        </Group>

        <Table
          verticalSpacing="lg"
          className="relative"
          withTableBorder
          striped
          highlightOnHover
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>S.N</Table.Th>
              <Table.Th>User Name</Table.Th>
              <Table.Th>Gender</Table.Th>
              <Table.Th>Step</Table.Th>
              <Table.Th>Step Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              rowsSkeletonLoader
            ) : userSteps && userSteps?.user_steps?.length > 0 ? (
              rows
            ) : (
              <Box
                w="100%"
                h="60vh"
                className=" flex justify-center items-center absolute"
              >
                <Flex justify="center" align="center" direction="column">
                  <Image src={NoDataImage} className="h-36 w-36" />
                  <Text>No Data Found</Text>
                </Flex>
              </Box>
            )}
          </Table.Tbody>
        </Table>
        {userData && userData.length > 0 && (
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </Flex>
      <Modal
        opened={globalStepConfigurationFormOpended}
        onClose={closeGlobalStepConfigurationForm}
        title="Configure Global Step"
      >
        <GlobalStepConfiguration close={closeGlobalStepConfigurationForm} />
      </Modal>
      <Modal opened={opened} onClose={close} title="Configure Steps">
        <UserStepConfiguration
          selectedItemForEdit={selectedItemForEdit}
          setSelectedItemForEdit={setSelectedItemForEdit}
          close={close}
        />
      </Modal>
    </>
  );
};

export default ChatSettings;
