import { ValidatedAsyncSelect } from "@/components";
import { useActionOnData } from "@/hooks";
import { useGlobalStore } from "@/store";
import { client } from "@/utils/api-client";
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect } from "react";

const baseURL = import.meta.env.VITE_API_URL;

interface IFormValue {
  user: any;
  step: any;
  isActive: boolean;
}

const UserStepConfiguration = ({
  selectedItemForEdit,
  setSelectedItemForEdit,
  close,
}: any) => {
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

  const fetchSteps = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        `${baseURL}/superadmin/conversation-steps`,
        {
          headers: {
            token,
          },
        }
      );
      return response.data.data.tasks.map((step: any) => ({
        value: step.name,
        label: step.name,
        disabled: !step.can_select,
      }));
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const form = useForm<IFormValue>({
    mode: "uncontrolled",
    initialValues: {
      user: null,
      step: null,
      isActive: true,
    },

    validate: {
      user: (value) => (value ? null : "User cannot be empty"),
      step: (value) => (value ? null : "Step cannot be empty"),
    },
  });

  useEffect(() => {
    if (selectedItemForEdit) {
      form.setValues({
        step: {
          children: selectedItemForEdit?.start_step,
          disabled: false,
          value: selectedItemForEdit?.start_step,
        },
        user: {
          children: selectedItemForEdit?.user?.name,
          value: selectedItemForEdit?.user?.id,
        },
        isActive: selectedItemForEdit?.status,
      });
    }
  }, [selectedItemForEdit]);

  const configureStep = (data: any) => {
    const apiBody = {
      start_step: data["step"].value,
      status: data["isActive"],
      user: data["user"].value,
    };

    return client({
      method: "post",
      endpoint: "superadmin/step-settings",
      optional: {
        data: apiBody,
        token,
      },
    });
  };

  const { isPending, mutateAsync } = useActionOnData({
    actionFunction: configureStep,
    queryToBeInvalidated: ["steps"],
  });

  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={form.onSubmit((values: any) =>
        mutateAsync(values)
          .then(() => close())
          .then(() => setSelectedItemForEdit(null))
      )}
    >
      <ValidatedAsyncSelect
        label="Select User"
        placeholder="Select User"
        fetchOptions={fetchOptions}
        disabled={selectedItemForEdit}
        clearable
        form={form}
        searchable={true}
        name="user"
      />
      <ValidatedAsyncSelect
        label="Select Step"
        placeholder="Select Step"
        withAsterisk={true}
        searchable={false}
        form={form}
        fetchOptions={fetchSteps}
        clearable
        name="step"
      />

      <Checkbox
        label="Enable Step"
        defaultChecked={
          selectedItemForEdit
            ? selectedItemForEdit?.status
            : form.values.isActive
        }
        {...form.getInputProps("isActive")}
      />

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

export default UserStepConfiguration;
