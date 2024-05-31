import React, { ReactNode } from "react";
import Link from "next/link";

interface LinkButtonProps {
    title: string;
    href: string;
    children: ReactNode;
}
  
const LinkButton: React.FC<LinkButtonProps> = ({
    title,
    href,
    children,
  }) => {
    return (
        <Link
        href={href}
        className="inline-flex items-center justify-center gap-2.5 rounded-md border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark text-center font-medium text-black dark:text-white hover:bg-opacity-90 lg:px-8 xl:px-10"            >
        <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {children}
        </span>
        {title}
    </Link>


    )
}  
export default LinkButton