import React from "react";
import { Button, Group, Text, Box, Stack, FileInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconFile, IconPhoto } from "@tabler/icons-react";

// Yup schema for validation
const schema = Yup.object().shape({
  file: Yup.mixed()
    .required("Please upload a file")
    .test("fileType", "Only JSON files are allowed", (value: any) => {
      console.log("value", value);
      return value && value.type === "application/json";
    }),
});

const UploadQuestions = ({ close }: any) => {
  const isPending = false;

  const form = useForm({
    initialValues: {
      file: null as File | null,
    },
    validateInputOnChange: true,
    validate: yupResolver(schema),
    mode: "controlled",
  });

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue("file", acceptedFiles[0]);
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log("Uploaded JSON file:", values.file);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        console.log("Parsed JSON:", json);
      } catch (e) {
        console.error("Invalid JSON");
      }
    };
    reader.readAsText(values.file as File);
  };
  console.log("error", form.errors);
  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* <Dropzone
            onDrop={handleDrop}
            onReject={(files) => form.setFieldValue("file", null)}
            maxSize={5 * 1024 ** 2} // 5 MB limit
            accept={{ "application/json": [".json"] }}
            multiple={false}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={52}
                  color="var(--mantine-color-blue-6)"
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconPhoto
                  size={52}
                  color="var(--mantine-color-red-6)"
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  size={52}
                  color="var(--mantine-color-dimmed)"
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag file here or click to select file
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach a JSON file, file should not exceed 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>

          {form.errors.file && (
            <Text color="red" size="sm">
              {form.errors.file}
            </Text>
          )}

          {form.values.file && (
            <Box>
              <Text size="sm" fw={500} mb="xs">
                Selected file:
              </Text>
              <Text size="sm">{form.values.file.name}</Text>
            </Box>
          )} */}
          <FileInput
            leftSection={<IconFile />}
            label="Attach file"
            placeholder="Upload file"
            leftSectionPointerEvents="none"
            clearable
            key={form.key("file")}
            {...form.getInputProps("file")}
          />
          <Group mt="md" justify="flex-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => form.setFieldValue("file", null)}
              disabled={!form.values.file}
            >
              Clear
            </Button>
            <Button
              type="submit"
              disabled={!form.isValid() || !form.isDirty() || isPending}
              loading={isPending}
              loaderProps={{
                type: "oval",
              }}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default UploadQuestions;
