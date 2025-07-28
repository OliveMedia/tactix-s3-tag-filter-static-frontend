import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  ButtonGroup,
  CopyButton,
  Flex,
  Group,
  Image,
  Modal,
  Pagination,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import NoDataImage from "../../assets/images/nodata.svg";
import dayjs from "dayjs";
import { useGetVideos } from "./hooks";
import { IconCheck, IconCopy, IconFileExport } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useActionOnData } from "@/hooks";
import { useState } from "react";
import isEmailValidator from "validator/lib/isEmail";

const baseURL = import.meta.env.VITE_API_URL;

const Videos = () => {
  const {
    videoData,
    totalPages,
    setCurrentPage,
    setPageLimit,
    currentPage,
    isLoading,
    pageLimit,
    videoFilter,
  } = useGetVideos();

  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");

  const exportData = async (data: any) => {
    return await fetch(`${baseURL}/v1/getClipsTag`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  const { isPending, mutateAsync } = useActionOnData({
    actionFunction: exportData,
    queryToBeInvalidated: [],
  });

  const rows = videoData?.rows?.map((video: any) => {
    const megabytes = video.size / (1024 * 1024);
    const tags = Object.entries(video.tags);
    return (
      <Table.Tr key={video._id}>
        {/* <Table.Td>
          {
            <video width="200" controls>
              <source src={video.url} type={video.content_type} />
              Your browser does not support the video tag.
            </video>
          }
        </Table.Td> */}
        <Table.Td className="whitespace-nowrap flex items-center space-x-2">
          <Anchor href={video.url} target="_blank" underline="hover" size="xs">
            S3 Link
          </Anchor>

          <CopyButton value={video.url} timeout={1500}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
                <ActionIcon
                  onClick={copy}
                  variant="light"
                  color={copied ? "teal" : "gray"}
                >
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Table.Td>
        <Table.Td>
          <Flex align="center" gap="sm" wrap="nowrap">
            <Tooltip label={video.key} withArrow>
              <Text truncate w={200}>
                {video.key}
              </Text>
            </Tooltip>
            <CopyButton value={video.key} timeout={1500}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
                  <ActionIcon
                    onClick={copy}
                    variant="light"
                    color={copied ? "teal" : "gray"}
                  >
                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Text className="whitespace-nowrap" size="xs">
            {megabytes.toFixed(2)} MB
          </Text>
        </Table.Td>
        <Table.Td>
          <Flex gap="xs" wrap="wrap" maw={600}>
            {tags.length > 0 ? (
              tags.map((value: any, index) => (
                <Badge key={index} tt="none">
                  {value[0]}: {value[1] ? value[1] : "N/A"}
                </Badge>
              ))
            ) : (
              <Text size="sm">N/A</Text>
            )}
          </Flex>
        </Table.Td>
        <Table.Td>
          <Text className="whitespace-nowrap" size="xs">
            {dayjs(video.last_modified).format("MMMM D, YYYY h:mm A")}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

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
    <>
      <Flex direction="column" align="end" gap="lg" h="calc(100vh - 100px)">
        <Group justify="space-between" w="100%">
          <Group justify="flex-start">
            <Text>Total Videos:</Text>
            <Text>{videoData?.totalCount}</Text>
          </Group>
          {videoData && videoData?.rows?.length > 0 && (
            <Group>
              <Group justify="flex-end">
                <Select
                  data={["20", "50", "100", "500", "1000"]}
                  placeholder="Select Limit"
                  onChange={(value) => setPageLimit(parseInt(value as string))}
                  value={String(pageLimit)}
                />
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                />
              </Group>

              <Button onClick={open} leftSection={<IconFileExport size={14} />}>
                Export
              </Button>
            </Group>
          )}
        </Group>
        <ScrollArea h="calc(100vh - 100px)" w="100%">
          <Table
            verticalSpacing="md"
            striped
            highlightOnHover
            withTableBorder
            className=" relative"
          >
            <Table.Thead>
              <Table.Tr>
                {/* <Table.Th>Video</Table.Th> */}
                <Table.Th>Link</Table.Th>
                <Table.Th>Key</Table.Th>
                <Table.Th>Size</Table.Th>
                <Table.Th>Tags</Table.Th>
                <Table.Th>Last Modified</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody mih="60vh" h="60vh">
              {isLoading ? (
                rowsSkeletonLoader
              ) : videoData && videoData?.rows?.length > 0 ? (
                rows
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
        </ScrollArea>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={5}>Export Data</Title>}
      >
        <Text mb="sm">
          Enter the email address to receive the exported data.
        </Text>
        <TextInput
          placeholder="your-email@example.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        {email && !isEmailValidator(email) && (
          <Text c="red" size="xs" mt="xs">
            Please enter a valid email address.
          </Text>
        )}

        <Group justify="flex-end" mt="lg">
          <Button
            onClick={() => {
              const cleanedFilters = videoFilter
                ? Object.fromEntries(
                    Object.entries(videoFilter).filter(
                      ([_, value]) =>
                        value !== "" && value !== undefined && value !== null
                    )
                  )
                : null;
              let exportPayload: any = {
                page: currentPage,
                pageSize: pageLimit,
                export: true,
                email,
              };

              if (cleanedFilters) {
                exportPayload = {
                  ...exportPayload,
                  filter: cleanedFilters,
                };
              }
              mutateAsync(exportPayload).then(() => {
                close();
                setEmail("");
              });
            }}
            loading={isPending}
            loaderProps={{
              type: "oval",
            }}
            disabled={isPending || !email || !isEmailValidator(email)}
          >
            Export
          </Button>
          <Button variant="outline" onClick={close} disabled={isPending}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Videos;
