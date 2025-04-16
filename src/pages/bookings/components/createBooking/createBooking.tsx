import { ValidatedAsyncSelect } from "@/components";
import { useActionOnData } from "@/hooks";
import { useGlobalStore } from "@/store";
import { client } from "@/utils/api-client";
import { Button, Checkbox, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

interface IFormValue {
  user: any;
  location: string;
  // type: string;
}

const CreateBooking = ({ close }: any) => {
  const { token } = useGlobalStore();

  // Function to fetch options from API
  const fetchOptions = async (searchQuery?: string) => {
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

  const form = useForm<IFormValue>({
    mode: "uncontrolled",
    initialValues: {
      user: null,
      location: "",
      // type: "",
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
    validate: {
      user: (value) => (value ? null : "User cannot be empty"),
      location: (value) => (value ? null : "Location cannot be empty"),
      // type: (value) => (value ? null : "Type cannot be empty"),
    },
  });

  const createBooking = (data: any) => {
    const apiBody = {
      visit_location: data["location"],
      user_id: data["user"].value,
      // type: data["type"],
    };

    return client({
      method: "post",
      endpoint: "superadmin/mock-booking",
      optional: {
        data: apiBody,
        token,
      },
    });
  };

  const { isPending, mutateAsync } = useActionOnData({
    actionFunction: createBooking,
    queryToBeInvalidated: ["bookings"],
  });

  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={form.onSubmit((values: any) =>
        mutateAsync(values).then(() => close())
      )}
    >
      <ValidatedAsyncSelect
        label="Select User"
        placeholder="Select User"
        fetchOptions={fetchOptions}
        clearable
        form={form}
        searchable={true}
        name="user"
      />

      <TextInput
        label="Enter location"
        placeholder="Enter location"
        key={form.key("location")}
        {...form.getInputProps("location")}
      />
      {/* <Select
        label="Select Type"
        placeholder="Select Type"
        data={["alone", "group"]}
        clearable
        withAsterisk
        key={form.key("step")}
        {...form.getInputProps("step")}
      /> */}
      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          disabled={!(form.isValid() && form.isDirty) || isPending}
          loading={isPending}
          loaderProps={{
            type: "oval",
          }}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default CreateBooking;
