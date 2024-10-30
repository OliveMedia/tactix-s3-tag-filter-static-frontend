import { useActionOnData } from "@/hooks";
import { useGlobalStore } from "@/store";
import { client } from "@/utils/api-client";
import {
  Button,
  Card,
  Checkbox,
  Group,
  Loader,
  Select,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserStepConfiguration = ({
  selectedItemForEdit,
  setSelectedItemForEdit,
  close,
}: any) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Track if data has been fetched already

  const { token } = useGlobalStore();
  const [hasStepsFetched, setHasStepsFetched] = useState(false);
  const [isStepsLoading, setIsStepsLoading] = useState(false);
  const [steps, setSteps] = useState([]);

  // Function to fetch options from API
  const fetchOptions = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        "https://vepa-api.dev.olive.media/superadmin/users",
        {
          headers: {
            token,
          },
        }
      );
      // Assuming API returns data in format: [{ value: '1', label: 'Option 1' }]
      setOptions(
        response.data.data.users.map((user: any) => ({
          value: user.id,
          label: user.name,
        }))
      );
      setHasFetched(true); // Set hasFetched to true after fetching data
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSteps = async () => {
    setIsStepsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        "https://vepa-api.dev.olive.media/superadmin/conversation-steps",
        {
          headers: {
            token,
          },
        }
      );
      setSteps(response.data.data.tasks.map((step: any) => step));
      setHasStepsFetched(true); // Set hasFetched to true after fetching data
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsStepsLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: selectedItemForEdit
        ? {
            label: selectedItemForEdit.user_step.name,
            value: selectedItemForEdit.user_step.id,
          }
        : null,
      step: null,
      isActive: true,
    },

    validate: {
      user: (value) => (value ? null : "User cannot be empty"),
      step: (value) => (value ? null : "Step cannot be empty"),
    },
  });

  // useEffect(() => {
  //   if (selectedItemForEdit) {
  //     form.setValues({
  //       step: selectedItemForEdit.start_step,
  //       user: {
  //         label:selectedItemForEdit.user_step.name,
  //         value:selectedItemForEdit.user_step.id
  //       },
  //     });
  //   }
  // }, [form, selectedItemForEdit]);

  console.log("selectedItemForEdit", form.getValues());

  const configureStep = (data: any) => {
    const apiBody = {
      start_step: data["step"],
      status: data["isActive"],
      user: data["user"],
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
    queryToBeInvalidated: "steps",
  });

  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={form.onSubmit((values: any) =>
        mutateAsync(values).then(() => close())
      )}
    >
      <Select
        label="Select User"
        placeholder="Select User"
        data={options}
        onDropdownOpen={() => {
          if (!hasFetched) {
            fetchOptions();
          }
        }}
        value={form.getValues().user}
        clearable
        nothingFoundMessage={loading ? "Loading..." : "No options found"}
        rightSection={loading && <Loader size="xs" />}
        key={form.key("user")}
        {...form.getInputProps("user")}
      />

      <Select
        label="Select Step"
        placeholder="Select Step"
        data={steps}
        onDropdownOpen={() => {
          if (!hasStepsFetched) {
            fetchSteps();
          }
        }}
        clearable
        withAsterisk
        key={form.key("step")}
        nothingFoundMessage={isStepsLoading ? "Loading..." : "No options found"}
        rightSection={isStepsLoading && <Loader size="xs" />}
        {...form.getInputProps("step")}
      />

      <Checkbox
        label="Enable Step"
        {...form.getInputProps("isActive")}
        key={form.key("isActive")}
        checked={form.getValues().isActive}
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
