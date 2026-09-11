import { Suspense } from "react";
import { PublicTutorPage } from "./public-tutor-client";

export function generateStaticParams() {
  return [{ username: "demo" }];
}

export default function TutorPageWrapper() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-20 text-center"><p>Loading...</p></div>}>
      <PublicTutorPage />
    </Suspense>
  );
}
