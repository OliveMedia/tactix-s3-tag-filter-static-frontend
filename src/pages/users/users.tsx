import {
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Input,
  List,
  Menu,
  Pagination,
  rem,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useGetUsers } from "./hooks";
import { IconDots, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Search } from "@/components";
import NoDataImage from "../../assets/images/nodata.svg";

const Users = () => {
  const {
    userData,
    totalPages,
    setCurrentPage,
    currentPage,
    searchValue,
    isLoading,
    setSearchValue,
  } = useGetUsers();

  const navigate = useNavigate();
  const rows = userData?.rows?.map((user: any) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.url}</Table.Td>
      <Table.Td>{user.content_type}</Table.Td>
      <Table.Td>{user.size}</Table.Td>
      <Table.Td>{user.metadata}</Table.Td>
      <Table.Td>{user.tags}</Table.Td>
      <Table.Td>{user.last_modified}</Table.Td>
    </Table.Tr>
  ));

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
    <Table
      verticalSpacing="lg"
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
          <Table.Th>Metadata</Table.Th>
          <Table.Th>Tags</Table.Th>
          <Table.Th>Last Modified</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody mih="60vh" h="60vh">
        {isLoading ? (
          rowsSkeletonLoader
        ) : userData && userData?.rows?.length > 0 ? (
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
  );
};

export default Users;
