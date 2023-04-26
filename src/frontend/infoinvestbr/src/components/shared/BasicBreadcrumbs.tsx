import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface BasicBreadcrumbsProps {
  links: LinkModel[];
  current: LinkModel;
}

export default function BasicBreadcrumbs(props: BasicBreadcrumbsProps) {
  function renderLinks() {
    return props.links?.map((value, index) => {
      return (
        <Link key={index} underline="hover" color="inherit" href={value.link}>
          {value.titulo}
        </Link>
      );
    });
  }

  return (
    <div role="presentation" className="m-2.5">
      <Breadcrumbs aria-label="breadcrumb">     
        {renderLinks()}  
        <Typography color="text.primary">
          <Link  underline="hover" color="inherit" href={props.current?.link}>
          {props.current?.titulo}
        </Link></Typography>
      </Breadcrumbs>
    </div>
  );
}
