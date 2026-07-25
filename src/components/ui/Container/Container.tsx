import type { ReactNode } from "react";

import "./Container.css";

type ContainerProps = {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
};

const Container = ({ children, fluid = false, className }: ContainerProps) => {
  const classNames = [
    "container",
    fluid ? "container--fluid" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classNames}>{children}</div>;
};

export default Container;
