import {
  Badge,
  Box,
  Flex,
  Image,
  Pagination,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import NoDataImage from "../../assets/images/nodata.svg";
import dayjs from "dayjs";
import { useGetVideos } from "./hooks";

const Users = () => {
  const { videoData, totalPages, setCurrentPage, currentPage, isLoading } =
    useGetVideos();

  const rows = videoData?.rows?.map((user: any) => {
    const megabytes = user.size / (1024 * 1024);
    const tags = Object.values(user.tags).filter((value) => value !== "");
    return (
      <Table.Tr key={user._id}>
        <Table.Td>
          {
            <video width="200" controls>
              <source src={user.url} type={user.content_type} />
              Your browser does not support the video tag.
            </video>
          }
        </Table.Td>
        <Table.Td>{user.content_type}</Table.Td>
        <Table.Td>{megabytes.toFixed(2)} MB</Table.Td>
        <Table.Td>
          {tags.length > 0
            ? tags.map((value: any, index) => (
                <Badge key={index}>{value}</Badge>
              ))
            : "N/A"}
        </Table.Td>
        <Table.Td>
          {dayjs(user.last_modified).format("MMMM D, YYYY h:mm A")}
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
    <Flex direction="column" align="end" gap="lg">
      <Table
        verticalSpacing="md"
        striped
        highlightOnHover
        withTableBorder
        className=" relative"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Video</Table.Th>
            <Table.Th>Content Type</Table.Th>
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
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
      />
    </Flex>
  );
};

export default Users;
