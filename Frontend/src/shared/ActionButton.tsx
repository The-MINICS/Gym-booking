import React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "./types";

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({children, setSelectedPage}: Props) => {
  return (
    <AnchorLink className="rounded-md bg-yellow-500 px-10 py-2 hover:bg-red-400
     hover:text-white active:scale-[.98] active:duration-75 transition-all"
        onClick={() => setSelectedPage(SelectedPage.SignIn)}
        href={`#${SelectedPage.SignIn}`}
    >
        {children}
    </AnchorLink>
  )
}

export default ActionButton