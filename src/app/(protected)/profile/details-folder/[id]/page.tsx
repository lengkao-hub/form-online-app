"use client";
import { useSearchParams } from "next/navigation";
import { DetailsFolder } from "../../container/table/details-folder";

export default function detailsfolder({ params }: { params: { id: number } }) {
  const searchParams = useSearchParams();
  const showedit = searchParams.get("showedit") === "true";
  const content = searchParams.get("content") || "";

  return (
    <div>
      <DetailsFolder id={params.id} showedit={showedit} content={content} />
    </div>
  );
}