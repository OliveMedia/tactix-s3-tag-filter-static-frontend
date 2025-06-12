import {
  ActionIcon,
  Badge,
  Box,
  CopyButton,
  Flex,
  Group,
  Image,
  Pagination,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import NoDataImage from "../../assets/images/nodata.svg";
import dayjs from "dayjs";
import { useGetVideos } from "./hooks";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const Users = () => {
  const {
    videoData,
    totalPages,
    setCurrentPage,
    setPageLimit,
    currentPage,
    isLoading,
    pageLimit,
  } = useGetVideos();

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
        <Table.Td>
          <a
            href={video.url}
            target="_blank"
            className="whitespace-nowrap underline underline-offset-4 text-blue-400"
          >
            S3 Link
          </a>
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
    <Flex direction="column" align="end" gap="lg" h="calc(100vh - 100px)">
      <Group justify="space-between" w="100%">
        <Group justify="flex-start">
          <Text>Total Videos:</Text>
          <Text>{videoData?.totalCount}</Text>
        </Group>
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
  );
};

export default Users;
