import NoDataImage from "../../assets/images/nodata.svg";

import {
  Box,
  Flex,
  Group,
  Image,
  Pagination,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { useGetBookings } from "./hooks";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { useGlobalStore } from "@/store";
import { AsyncSelect } from "@/components";

const baseURL = import.meta.env.VITE_API_URL;

const Bookings = () => {
  const {
    bookingData,
    totalPages,
    setCurrentPage,
    currentPage,
    isLoading,
    setDate,
    date,
    user,
    setUser,
    location,
    setLocation,
  } = useGetBookings();

  const { token } = useGlobalStore();

  const rows = bookingData?.rows?.map((booking: any, index: number) => (
    <Table.Tr key={booking.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{booking.user.name}</Table.Td>
      <Table.Td>{booking.user.phone}</Table.Td>
      <Table.Td>{booking.date}</Table.Td>
      <Table.Td>{booking.time}</Table.Td>
      <Table.Td>{booking.visit_location}</Table.Td>
      <Table.Td>{booking.location}</Table.Td>

      {/* <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDots className="cursor-pointer" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEye style={{ width: rem(14), height: rem(14) }} />
              }
            >
              View Details
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td> */}
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

  // Function to fetch options from API
  const fetchUsers = async (searchQuery?: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${baseURL}/superadmin/users`, {
        headers: {
          token,
        },
        params: {
          search_key: searchQuery,
          limit: 10,
        },
      });
      // Assuming API returns data in format: [{ value: '1', label: 'Option 1' }]
      return response.data.data.users.map((user: any) => ({
        value: user.id,
        label: user?.name || "N/A",
      }));
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  // Function to fetch options from API
  const fetchLocations = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        `${baseURL}/superadmin/booking-locations`,
        {
          headers: {
            token,
          },
        }
      );
      return response.data.data.map((item: any) => ({
        value: item.id,
        label: item.visit_location,
      }));
      // return response.data.data.users.map((user: any) => ({
      //   value: user.id,
      //   label: user?.name || "N/A",
      // }));
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  return (
    <Flex direction="column" align="end" gap="lg">
      <Group>
        <DateInput
          value={date}
          onChange={setDate}
          placeholder="Enter Date"
          clearable
        />
        <AsyncSelect
          placeholder="Select User"
          fetchOptions={fetchUsers}
          clearable
          searchable={true}
          name="user"
          value={user}
          setValue={setUser}
        />
        <AsyncSelect
          placeholder="Select Location"
          fetchOptions={fetchLocations}
          clearable
          searchable={true}
          name="location"
          value={location}
          setValue={setLocation}
        />
      </Group>
      <Table
        verticalSpacing="lg"
        striped
        highlightOnHover
        withTableBorder
        className="relative"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.N</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Booking Date</Table.Th>
            <Table.Th>Booking Time</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Country</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody
          mih="60vh"
          h={bookingData?.rows?.length > 0 ? "auto" : "60vh"}
        >
          {isLoading ? (
            rowsSkeletonLoader
          ) : bookingData && bookingData?.rows?.length > 0 ? (
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
      {bookingData && bookingData.rows.length > 0 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </Flex>
  );
};

export default Bookings;
