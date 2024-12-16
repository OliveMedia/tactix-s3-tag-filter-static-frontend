import { useEffect, useState } from "react";
import {
  CloseButton,
  Combobox,
  Input,
  InputBase,
  Loader,
  useCombobox,
} from "@mantine/core";

const searchDelay = 300; // Debounce delay in milliseconds

const AsyncSelect = ({
  fetchOptions,
  name,
  value,
  setValue,
  searchable,
  ...rest
}: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        fetchData();
      }
    },
  });

  // Function to fetch data based on the search query
  const fetchData = () => {
    setLoading(true);
    fetchOptions(searchQuery)
      .then((response: any) => {
        setData(response);
        setLoading(false);
        combobox.resetSelectedOption();
      })
      .catch(() => setLoading(false));
  };

  // Effect to manage the debounced API call when searchTerm changes
  useEffect(() => {
    if (combobox.dropdownOpened && searchable) {
      let timeoutId: NodeJS.Timeout | null = null; // Declare a timeout ID for debouncing

      // Clear the previous timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to call fetchOptions
      timeoutId = setTimeout(() => {
        fetchData();
      }, searchDelay);

      // Cleanup timeout on component unmount or before the next effect runs
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]); // Runs whenever searchTerm changes

  const options = data.map((item: any) => (
    <Combobox.Option
      disabled={item.disabled}
      value={item.value || item}
      key={item.value || item}
    >
      {item.label || item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val, option) => {
        setValue(option);
        combobox.closeDropdown();
        setSearchQuery("");
      }}
    >
      <Combobox.Target>
        <InputBase
          {...rest}
          component="button"
          type="button"
          pointer
          rightSection={
            loading ? (
              <Loader size={18} />
            ) : value !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setValue(null)}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          onClick={() => combobox.toggleDropdown()}
          w={200}
          rightSectionPointerEvents={value === null ? "none" : "all"}
        >
          {
            <Input.Placeholder>
              {value ? value.children : `Select ${name}`}
            </Input.Placeholder>
          }
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        {searchable && (
          <Input
            placeholder="Search..."
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            mb="xs"
            value={searchQuery}
          />
        )}
        <Combobox.Options mah={150} style={{ overflowY: "auto" }}>
          {loading ? (
            <Combobox.Empty>Loading....</Combobox.Empty>
          ) : options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default AsyncSelect;
