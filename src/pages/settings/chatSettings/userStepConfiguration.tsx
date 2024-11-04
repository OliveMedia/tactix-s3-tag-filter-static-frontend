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
import React, { useCallback, useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;

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
  const fetchOptions = useCallback(async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${baseURL}/superadmin/users`, {
        headers: {
          token,
        },
      });
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
  }, [token]);

  const fetchSteps = useCallback(async () => {
    setIsStepsLoading(true);
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
      setSteps(
        response.data.data.tasks.map((step: any) => ({
          value: step.name,
          label: step.name,
          disabled: !step.can_select,
        }))
      );
      setHasStepsFetched(true); // Set hasFetched to true after fetching data
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsStepsLoading(false);
    }
  }, [token]);

  const form = useForm({
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
    // Fetch options if not yet fetched
    if (!hasFetched) fetchOptions();
    if (!hasStepsFetched) fetchSteps();
  }, [fetchOptions, fetchSteps, hasFetched, hasStepsFetched]);

  useEffect(() => {
    if (selectedItemForEdit && hasStepsFetched && hasFetched) {
      form.setValues({
        step: selectedItemForEdit.start_step,
        user: selectedItemForEdit?.user.id,
        isActive: selectedItemForEdit.status,
      });
    }
  }, [hasFetched, hasStepsFetched, selectedItemForEdit]);

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
        disabled={selectedItemForEdit}
        nothingFoundMessage={loading ? "Loading..." : "No options found"}
        rightSection={loading && <Loader size="xs" />}
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
        value={form.getValues().step}
        clearable
        withAsterisk
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
