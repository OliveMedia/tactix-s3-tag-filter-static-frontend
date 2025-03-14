import {
  Box,
  Button,
  Card,
  Drawer,
  Flex,
  Group,
  Image,
  Loader,
  Pagination,
  rem,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";

import NoDataImage from "../../assets/images/nodata.svg";
import { useGlobalStore } from "@/store";
import axios from "axios";
import { useState } from "react";
import { useGetUserLogs } from "./hooks";
import { IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const baseURL = import.meta.env.VITE_API_URL;

const Row = ({ logData }: any) => {
  const [opened, { open, close }] = useDisclosure(false);

  const rows = logData?.rows?.map((log: any) => {
    return (
      <Table.Tr key={log.id}>
        <Table.Td>{log.ACTION || "N/A"}</Table.Td>
        <Table.Td>{log.USER_DETAILS.email || "N/A"}</Table.Td>
        <Table.Td>{log.USER_DETAILS.phone || "N/A"}</Table.Td>
        <Table.Td>{log.METHOD}</Table.Td>
        <Table.Td>{log.RESPONSE_STATUS_CODE}</Table.Td>
        <Table.Td>{log.RESPONSE_TIME.toFixed(4)} s</Table.Td>
        <Table.Td>{new Date(log.created_at).toDateString()}</Table.Td>
        <Table.Td>
          <Drawer
            size="50%"
            opened={opened}
            position="right"
            onClose={close}
            title="Log Detail"
            overlayProps={{ backgroundOpacity: 0.1, blur: 0.5 }}
          >
            <Card shadow="sm" px="sm" py="sm" w="100%" radius="md" withBorder>
              <Stack>
                <Box>
                  <Text>Action</Text>

                  <Text size="sm" c="dimmed">
                    {log.ACTION || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Auth Token</Text>

                  <Text
                    size="sm"
                    c="dimmed"
                    className="whitespace-break-spaces"
                  >
                    {log.AUTH_TOKEN || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Interceptor ID</Text>

                  <Text size="sm" c="dimmed">
                    {log.INTERCEPTOR_ID || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Method</Text>

                  <Text size="sm" c="dimmed">
                    {log.METHOD || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Response</Text>

                  <Text size="sm" c="dimmed">
                    {log.RESPONSE_BODY || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Status Code</Text>

                  <Text size="sm" c="dimmed">
                    {log.RESPONSE_STATUS_CODE || "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Device Info</Text>

                  <Text size="sm" c="dimmed">
                    {log.DEVICE_INFO || "N/A"}
                  </Text>
                </Box>

                <Box>
                  <Text>Request Body</Text>

                  <Text size="sm" c="dimmed">
                    {log.REQ_BODY ? log.REQ_BODY : "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Text>Url</Text>

                  <Text size="sm" c="dimmed">
                    {log.URL || "N/A"}
                  </Text>
                </Box>
              </Stack>
            </Card>
          </Drawer>

          <Button
            leftSection={
              <IconEye style={{ width: rem(14), height: rem(14) }} />
            }
            variant="transparent"
            onClick={open}
          >
            View Details
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return rows;
};

const UserLogs = () => {
  const {
    logData,
    totalPages,
    setAction,
    setCurrentPage,
    currentPage,
    isLoading,
  } = useGetUserLogs();

  const [hasFetched, setHasFetched] = useState(false);
  const [actions, setActions] = useState([]);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { token } = useGlobalStore();

  const fetchOptions = async () => {
    try {
      setIsActionLoading(true);
      const response = await axios.get(`${baseURL}/superadmin/logs-actions`, {
        headers: {
          token,
        },
      });
      setActions(response.data.data);
      setHasFetched(true);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const rowsSkeletonLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
    <Table.Tr key={item}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Table.Td key={item}>
          <Skeleton h={20} />
        </Table.Td>
      ))}
    </Table.Tr>
  ));
  return (
    <Flex direction="column" align="end" gap="lg">
      <Select
        data={actions}
        onDropdownOpen={() => {
          if (!hasFetched) {
            fetchOptions();
          }
        }}
        onChange={(value) => setAction(value)}
        placeholder="Select Action"
        searchable
        nothingFoundMessage={isActionLoading ? "Loading..." : "Nothing found"}
        clearable
        rightSection={isActionLoading && <Loader size="xs" />}
      />
      <Table
        verticalSpacing="lg"
        striped
        highlightOnHover
        withTableBorder
        className="relative"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Action</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Method</Table.Th>
            <Table.Th>Status Code</Table.Th>
            <Table.Th>Response Time</Table.Th>
            <Table.Th>CreatedAt</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody mih="60vh" h="60vh">
          {isLoading ? (
            rowsSkeletonLoader
          ) : logData && logData?.rows?.length > 0 ? (
            <Row logData={logData} />
          ) : (
            <Box
              w="100%"
              h="60vh"
              className="flex justify-center items-center absolute"
            >
              <Flex justify="center" align="center" direction="column">
                <Image src={NoDataImage} className="h-36 w-36" />
                <Text>No Data Found</Text>
              </Flex>
            </Box>
          )}
        </Table.Tbody>
      </Table>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
      />
    </Flex>
  );
};

export default UserLogs;
