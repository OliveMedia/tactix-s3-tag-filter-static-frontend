import { Menu, Pagination, rem, Skeleton, Table } from "@mantine/core";
import { useGetUsers } from "./hooks";
import { IconDots, IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { userData, totalPages, setCurrentPage, currentPage, isLoading } =
    useGetUsers();
  const navigate = useNavigate();
  const rows = userData?.rows?.map((user: any) => (
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
    <div className="flex flex-col items-end text-text pl-[98px] lg:pl-80 mt-[74px] overflow-hidden">
      <Table verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Number</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>CreatedAt</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{isLoading ? rowsSkeletonLoader : rows}</Table.Tbody>
      </Table>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
