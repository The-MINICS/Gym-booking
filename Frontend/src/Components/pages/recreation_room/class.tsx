
type Props = {
    name?: string;
    description?: string;
    room?: string;
    attendant?: string;
    image?: string;
}

const Class = ({ name, description, room, attendant, image }: Props) => {
    const overlayStyles = `p-5 absolute flex h-[680px] w-[750px] flex-col
        items-center justify-center whitespace-normal bg-grey-50 text-center text-white
        opacity-0 transition duration-500 hover:opacity-90 hover:bg-red-400 cursor-pointer`;

  return (
  <li className="relative mx-2 inline-block h-[680px] w-[750px]">
    <div className={overlayStyles}>
        <p className="text-4xl font-bold mb-2">{name} Class</p>
        <p className="text-xl font-semibold">Room: {room}</p>
        <p className="text-xl font-semibold">Attendant: {attendant}</p>
        <p className="mt-3">{description}</p>
    </div>
    <img alt={`${image}`} src={image} className="w-full h-full object-cover" />
  </li>
  );
}

export default Class