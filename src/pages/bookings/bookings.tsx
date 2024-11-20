import { Badge, Box, Flex, Image, Skeleton, Table, Text } from "@mantine/core";

import NoDataImage from "../../assets/images/nodata.svg";
import { useEffect, useState } from "react";

const bookingData = {
  rows: [
    {
      id: 1,
      userName: "John Doe",
      bookingDate: "2024-11-20",
      bookingTime: "10:00 AM",
      bookingLocation: "Community Health Center A",
      vaccinationDetails: {
        vaccineName: "Pfizer-BioNTech",
        dose: 1,
        batchNumber: "B12345",
      },
      status: "Confirmed",
    },
    {
      id: 2,
      userName: "Jane Smith",
      bookingDate: "2024-11-21",
      bookingTime: "2:30 PM",
      bookingLocation: "Community Health Center B",
      vaccinationDetails: {
        vaccineName: "Moderna",
        dose: 1,
        batchNumber: "M54321",
      },
      status: "Pending",
    },
    {
      id: 3,
      userName: "Emily Davis",
      bookingDate: "2024-11-22",
      bookingTime: "11:00 AM",
      bookingLocation: "Downtown Clinic",
      vaccinationDetails: {
        vaccineName: "Johnson & Johnson",
        dose: 1,
        batchNumber: "J98765",
      },
      status: "Completed",
    },
    {
      id: 4,
      userName: "Michael Brown",
      bookingDate: "2024-11-23",
      bookingTime: "9:15 AM",
      bookingLocation: "Community Health Center C",
      vaccinationDetails: {
        vaccineName: "AstraZeneca",
        dose: 1,
        batchNumber: "A11223",
      },
      status: "Cancelled",
    },
    {
      id: 5,
      userName: "Olivia Johnson",
      bookingDate: "2024-11-24",
      bookingTime: "4:45 PM",
      bookingLocation: "East Side Medical Center",
      vaccinationDetails: {
        vaccineName: "Pfizer-BioNTech",
        dose: 2,
        batchNumber: "B67890",
      },
      status: "Confirmed",
    },
    {
      id: 6,
      userName: "Liam Martinez",
      bookingDate: "2024-11-25",
      bookingTime: "12:30 PM",
      bookingLocation: "West Side Clinic",
      vaccinationDetails: {
        vaccineName: "Moderna",
        dose: 2,
        batchNumber: "M09876",
      },
      status: "Pending",
    },
    {
      id: 7,
      userName: "Sophia Wilson",
      bookingDate: "2024-11-26",
      bookingTime: "3:00 PM",
      bookingLocation: "North Point Medical Center",
      vaccinationDetails: {
        vaccineName: "Pfizer-BioNTech",
        dose: 3,
        batchNumber: "B11234",
      },
      status: "Completed",
    },
    {
      id: 8,
      userName: "Ethan Garcia",
      bookingDate: "2024-11-27",
      bookingTime: "8:00 AM",
      bookingLocation: "South Valley Health Center",
      vaccinationDetails: {
        vaccineName: "AstraZeneca",
        dose: 2,
        batchNumber: "A44567",
      },
      status: "Confirmed",
    },
    {
      id: 9,
      userName: "Mia Lee",
      bookingDate: "2024-11-28",
      bookingTime: "1:45 PM",
      bookingLocation: "Central City Hospital",
      vaccinationDetails: {
        vaccineName: "Johnson & Johnson",
        dose: 1,
        batchNumber: "J77890",
      },
      status: "Cancelled",
    },
    {
      id: 10,
      userName: "Noah Walker",
      bookingDate: "2024-11-29",
      bookingTime: "10:15 AM",
      bookingLocation: "East Side Medical Center",
      vaccinationDetails: {
        vaccineName: "Pfizer-BioNTech",
        dose: 2,
        batchNumber: "B55443",
      },
      status: "Confirmed",
    },
  ],
};

const Bookings = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  function getStatusBadge(status: string) {
    const statusColors: any = {
      Confirmed: "green",
      Pending: "yellow",
      Completed: "blue",
      Cancelled: "red",
    };

    return <Badge color={statusColors[status]}>{status}</Badge>;
  }

  const rows = bookingData?.rows?.map((booking: any) => {
    return (
      <Table.Tr key={booking.id}>
        <Table.Td>{booking.id}</Table.Td>
        <Table.Td>{booking.userName}</Table.Td>
        <Table.Td>{booking.bookingDate}</Table.Td>
        <Table.Td>{booking.bookingTime}</Table.Td>
        <Table.Td>{booking.bookingLocation}</Table.Td>
        <Table.Td>
          {booking.vaccinationDetails.vaccineName} (Dose{" "}
          {booking.vaccinationDetails.dose})
        </Table.Td>
        <Table.Td>{getStatusBadge(booking.status)}</Table.Td>
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
            <Table.Th>Booking Date</Table.Th>
            <Table.Th>Booking Time</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Vaccination Details</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody mih="60vh" h="60vh">
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
      {/* <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
        /> */}
    </Flex>
  );
};

export default Bookings;
