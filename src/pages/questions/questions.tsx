import NoDataImage from "../../assets/images/nodata.svg";

import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  Pagination,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconPlus } from "@tabler/icons-react";

import { useGlobalStore } from "@/store";
import { useGetQuestions } from "./hooks";
import { UploadQuestions } from "./components";

const baseURL = import.meta.env.VITE_API_URL;

const SortableRow = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <Table.Tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Table.Tr>
  );
};

const Questions = () => {
  const { questionData, totalPages, setCurrentPage, currentPage, isLoading } =
    useGetQuestions();

  const { token } = useGlobalStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [items, setItems] = useState<any[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (questionData?.rows) {
      setItems(questionData.rows);
    }
  }, [questionData]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.question.id === active.id);
    const newIndex = items.findIndex((item) => item.question.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    const reordered = newItems.map((item, index) => ({
      id: item.question.id,
      order: index + 1,
    }));

    // axios
    //   .post(`${baseURL}/superadmin/questions/reorder`, reordered, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .catch((err) => {
    //     console.error("Failed to update order", err);
    //   });
  };

  const rows = items.map((question: any) => (
    <SortableRow key={question.question.id} id={question.question.id}>
      <Table.Td>{question.question.id}</Table.Td>
      <Table.Td className="capitalize">{question.question.name}</Table.Td>
      <Table.Td>{question.question.text}</Table.Td>
    </SortableRow>
  ));

  const rowsSkeletonLoader = Array.from({ length: 10 }).map((_, i) => (
    <Table.Tr key={i}>
      {[1, 2, 3].map((_, j) => (
        <Table.Td key={j}>
          <Skeleton h={20} />
        </Table.Td>
      ))}
    </Table.Tr>
  ));

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
              <Table.Th>S.N</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Question</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.question.id)}
              strategy={verticalListSortingStrategy}
            >
              <Table.Tbody mih="60vh" h={items.length > 0 ? "auto" : "60vh"}>
                {isLoading ? (
                  rowsSkeletonLoader
                ) : items.length > 0 ? (
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
            </SortableContext>
          </DndContext>
        </Table>
        {questionData && questionData.rows.length > 0 && (
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </Flex>
      <Modal opened={opened} onClose={close} title="Upload Question" size="lg">
        <UploadQuestions close={close} />
      </Modal>
    </>
  );
};

export default Questions;
