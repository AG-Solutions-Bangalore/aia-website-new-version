import React from "react";
import { Helmet } from "react-helmet-async";
import AlumniDirectory from "@/components/passout/alumni-directory";

export default function FilterPage() {
  return (
    <>
      <Helmet>
        <title>Alumni Filter Directory | Academy of Internal Audit</title>
        <meta
          name="description"
          content="Search and filter through the Academy of Internal Audit global professional network and alumni directory."
        />
      </Helmet>
      <AlumniDirectory headingLevel={1} />
    </>
  );
}
