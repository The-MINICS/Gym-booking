import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "./types";

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({children, setSelectedPage}: Props) => {
  return (
    <AnchorLink className="rounded-md bg-red-500 px-10 py-2 hover:bg-yellow-500
     hover:text-white text-white active:scale-[.98] active:duration-75 transition-all"
        onClick={() => setSelectedPage(SelectedPage.Booking)}
        href={`#${SelectedPage.Booking}`}
    >
        {children}
    </AnchorLink>
  )
}

export default ActionButton