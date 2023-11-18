interface UserProps {
  avatar: string;
  first_name: string;
  last_name: string;
  gender: string;
  domain: string;
  available: boolean;
  selected: boolean;
  onSelect: () => void;
}

function User({
  avatar,
  first_name,
  last_name,
  gender,
  domain,
  available,
  selected,
  onSelect
}: UserProps) {
  return (
    <div className="bg-blue-200 border-2 w-[15rem] lg:w-[20rem] justify-center items-center rounded-[1rem] text-left p-[1rem] m-[1rem]">
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        className="mr-2"
      />

      <img
        src={`${avatar}`}
        alt={`${avatar}`}
        className="rounded-full w-[8rem] mx-auto mb-[1rem]"
      />
      <p className="text-[1rem] font-bold">
        Name: {first_name + " " + last_name}
      </p>
      <p className="text-[1rem] font-bold">Gender: {gender}</p>
      <p className="text-[1rem] font-bold">Domain: {domain}</p>
      <p className="text-[1rem] font-bold">
        Availablity: {available == false ? "Yes" : "No"}
      </p>
    </div>
  );
}

export default User;
