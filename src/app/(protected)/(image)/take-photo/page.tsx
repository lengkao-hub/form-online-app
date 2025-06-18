import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard";
import WebcamCapture from "./container/webcam-capture";

export default function Webcam() {
  return (
    <RoleBasedGuard subject="take-photo" action="read" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">ການຖ່າຍຮູບເວບເຄມ</h1>
        <WebcamCapture />
      </main>
    </RoleBasedGuard>
  )
}

