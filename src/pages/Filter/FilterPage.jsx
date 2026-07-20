import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

const AlumniDirectory = lazy(() => import("@/components/passout/alumni-directory"));

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
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Directory...</div>}>
        <AlumniDirectory />
      </Suspense>
    </>
  );
}
