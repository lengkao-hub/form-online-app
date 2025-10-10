import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChangelogVersion() {
    const router = useRouter();
    return (
        <div className=" hidden sm:block">
            <div className="flex items-center gap-x-3">
                <div className="font-bold text-lg">ບັດຢັ້ງຢືນການພັກເຊົາຊົ່ວຄາວ - Stay Permit Card</div>
                <button className="bg-none justify-center flex "
                    onClick={() => { router.push("/changelog"); }}
                >
                    <div className="underline "> V1.0.0</div>
                </button>
            </div>
        </div>
    )
}
