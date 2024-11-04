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
import React, { useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;

const GlobalStepConfiguration = ({ close }: any) => {
  const { token } = useGlobalStore();
  const [hasStepsFetched, setHasStepsFetched] = useState(false);
  const [isStepsLoading, setIsStepsLoading] = useState(false);
  const [steps, setSteps] = useState([]);

  const fetchSteps = async () => {
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
  };

  const configureStep = (data: any) => {
    const apiBody = {
      start_step: data["step"],
      status: data["isActive"],
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

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      step: null,
      isActive: true,
    },

    validate: {
      step: (value) => (value ? null : "Step cannot be empty"),
    },
  });
  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={form.onSubmit((values: any) => {
        mutateAsync(values).then(() => close());
      })}
    >
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

export default GlobalStepConfiguration;
