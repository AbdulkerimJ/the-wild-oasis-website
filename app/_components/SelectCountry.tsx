import { getCountries } from "@/app/_lib/data-service";

type SelectCountryProps = {
  defaultCountry?: string | null;
  name?: string;
  id?: string;
  className?: string;
};

// Let's imagine your colleague already built this component 😃

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries = await getCountries();
  const normalizedCountry = defaultCountry ?? "";
  const flag = normalizedCountry
    ? countries.find((country) => country.name === normalizedCountry)?.flag ??
      ""
    : "";
  const defaultValue = normalizedCountry ? `${normalizedCountry}%${flag}` : "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={defaultValue}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
