import NoDataImage from "../../assets/images/nodata.svg";

import {
  Box,
  Button,
  Drawer,
  Flex,
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
import { useGetBookings } from "./hooks";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { useGlobalStore } from "@/store";
import { AsyncSelect } from "@/components";
import dayjs from "dayjs";
import {
  IconCalendar,
  IconDots,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useActionOnData } from "@/hooks";
import { client } from "@/utils/api-client";
import { CreateBooking } from "./components";

const baseURL = import.meta.env.VITE_API_URL;

const removeBookingHistory = (data: any) => {
  const { id, token } = data;

  return client({
    method: "delete",
    endpoint: `superadmin/booking-history/${id}`,
    optional: {
      token,
    },
  });
};

const Rows = ({ booking }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { token } = useGlobalStore();
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const { isPending, mutateAsync } = useActionOnData({
    actionFunction: removeBookingHistory,
    queryToBeInvalidated: ["bookings"],
  });

  const handleDelete = () => {
    mutateAsync({
      id: booking.conv_id,
      token,
    }).then(() => setOpenDeleteBox(false));
  };
  return (
    <Table.Tr key={booking.id}>
      <Table.Td className="capitalize">{`${booking.user_type} booking`}</Table.Td>
      <Table.Td className="capitalize">{booking.user.name}</Table.Td>
      <Table.Td className="capitalize">{booking.user.phone}</Table.Td>

      <Table.Td>{dayjs(booking.date).format("MMMM D, YYYY")}</Table.Td>
      <Table.Td>
        {booking.user_type === "group" ? (
          <>
            <Drawer
              opened={opened}
              onClose={close}
              title={
                <Group gap="xs">
                  <IconCalendar size={16} />
                  <Text>Bookings</Text>
                </Group>
              }
              position="right"
            >
              <ul className="mt-4 space-y-2">
                {booking.members.map((member: any, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Text>{index + 1}.</Text>
                    <Box>
                      <Text fw="normal" className="capitalize">
                        {member.details.name}{" "}
                        <span className="text-sm lowercase">
                          ({member.details.email})
                        </span>
                      </Text>
                      <Group>
                        <Text size="sm">
                          {dayjs(booking.date).format("MMMM D, YYYY")}
                        </Text>
                        |<Text size="sm">{member.time}</Text>
                      </Group>
                    </Box>
                  </li>
                ))}
              </ul>
            </Drawer>

            <Button
              variant="transparent"
              className="text-sky-400 underline underline-offset-4"
              onClick={open}
            >
              View all appointments
            </Button>
          </>
        ) : (
          booking.time
        )}
      </Table.Td>
      <Table.Td>{booking.location}</Table.Td>
      <Table.Td>{booking.visit_location}</Table.Td>
      <Table.Td>{dayjs(booking.created_at).format("MMMM D, YYYY")}</Table.Td>
      <Table.Td>
        {booking.conv_id && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <IconDots className="cursor-pointer" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => setOpenDeleteBox(true)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
            <Modal
              opened={openDeleteBox}
              onClose={() => setOpenDeleteBox(false)}
              withCloseButton={false}
            >
              <Text mb="md">Delete Booking</Text>
              <Text size="sm" mb="md">
                Are you sure you want to delete the booking? This action cannot
                be undone.
              </Text>
              <Group justify="flex-end">
                <Button
                  variant="outline"
                  color="white"
                  disabled={isPending}
                  onClick={() => setOpenDeleteBox(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  onClick={handleDelete}
                  disabled={isPending}
                  loading={isPending}
                  loaderProps={{ type: "oval" }}
                >
                  Delete
                </Button>
              </Group>
            </Modal>
          </Menu>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

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
  const [opened, { open, close }] = useDisclosure(false);

  const rows = bookingData?.rows?.map((booking: any, index: number) => (
    <Rows booking={booking} key={index} />
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
    <>
      <Flex direction="column" align="end" gap="lg">
        <Flex justify="space-between" w="100%">
          <Button
            leftSection={<IconPlus size={14} type="button" />}
            onClick={open}
          >
            Create
          </Button>
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
        </Flex>
        <Table
          verticalSpacing="lg"
          striped
          highlightOnHover
          withTableBorder
          className="relative"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Type</Table.Th>
              <Table.Th>User Name</Table.Th>
              <Table.Th>User Phone</Table.Th>
              <Table.Th>Appointment Date</Table.Th>
              <Table.Th>Appointment Time</Table.Th>
              <Table.Th>Destination Countries</Table.Th>
              <Table.Th>Vaccination Location</Table.Th>
              <Table.Th>Booked On</Table.Th>
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
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        title="Create Booking"
      >
        <CreateBooking close={close} />
      </Modal>
    </>
  );
};

export default Bookings;
