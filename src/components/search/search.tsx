import { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface ISearch {
  setSearch: any;
  search: any;
}

const Search = ({ setSearch, search }: ISearch) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    let delayDebounceFn: any;

    if (search || search === "") {
      delayDebounceFn = setTimeout(() => {
        setSearch(search);
      }, 500);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [search, setSearch]);

  function handleChange(event: any) {
    const newValue = event.target.value;
    if (newValue.startsWith(" ")) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setSearch(newValue);
    }
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search"
        value={search}
        onChange={handleChange}
        leftSection={<IconSearch size={16} />}
      />

      {!isValid && (
        <p className="mt-2 text-xs text-red-500">
          {`Search shouldn't start with a whitespace`}
        </p>
      )}
    </div>
  );
};

export default Search;
