import { useGetUsers } from "@/pages/users/hooks";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Group,
  Image,
  Menu,
  Modal,
  Pagination,
  rem,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import NoDataImage from "../../../assets/images/nodata.svg";

const ChatSettings = () => {
  const { userData, totalPages, setCurrentPage, currentPage, isLoading } =
    useGetUsers();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: null,
      step: 1,
      globalStep: 1,
      isGlobalStepEnabled: true,
    },

    validate: {
      user: (value) => (value ? null : "User cannot be empty"),
    },
  });
  const rows = [].map((user: any) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.number}</Table.Td>
      <Table.Td>{user.gender}</Table.Td>
      <Table.Td>{user.age}</Table.Td>
      <Table.Td>{user.address}</Table.Td>
      <Table.Td>{user.createdAt}</Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDots className="cursor-pointer" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEye style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => navigate(`/users/${user.id}/conversations`)}
            >
              View Conversations
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
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
      <ScrollArea>
        <div className="flex flex-col items-end text-text h-[calc(100vh-170px)]">
          <Button onClick={open}>Add Steps</Button>
          <Table verticalSpacing="lg" className="relative">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>S.N</Table.Th>
                <Table.Th>User Name</Table.Th>
                <Table.Th>User Email</Table.Th>
                <Table.Th>Step</Table.Th>
                <Table.Th>CreatedAt</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="bg-green-400">
              {isLoading ? (
                rowsSkeletonLoader
              ) : userData && userData.length > 0 ? (
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
        </div>
      </ScrollArea>
      <Modal opened={opened} onClose={close} title="Configure Steps">
        <form
          className="flex flex-col space-y-5"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <Select
            label="Select User"
            placeholder="Select User"
            data={["React", "Angular", "Vue", "Svelte"]}
            withAsterisk
            key={form.key("user")}
            {...form.getInputProps("user")}
          />

          <Select
            label="Select Step"
            placeholder="Select Step"
            data={["1", "2", "3", "4"]}
            withAsterisk
            key={form.key("step")}
            {...form.getInputProps("step")}
          />

          <Select
            label="Select Global Step"
            placeholder="Select Global Step"
            data={["1", "2", "3", "4"]}
            withAsterisk
            key={form.key("globalStep")}
            {...form.getInputProps("globalStep")}
          />

          <Checkbox
            mt="md"
            label="Enable global step"
            key={form.key("isGlobalStepEnabled")}
            {...form.getInputProps("isGlobalStepEnabled", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default ChatSettings;
