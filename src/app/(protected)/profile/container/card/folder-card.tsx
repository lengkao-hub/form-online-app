"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Mail, Phone, User, CalendarDays } from "lucide-react"
import useFolderCard from "../../hook/usefolder-card"
import { format } from "date-fns"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function FolderCardList({ useEditStatus }: { useEditStatus: any }) {
    const { result, loading } = useFolderCard()
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState("")
    const [selectedId, setSelectedId] = useState<number>(0)

    const router = useRouter()
    const handleReject = () => {
        useEditStatus({ id: selectedId, status: "REJECTED", reason })
        setOpen(false)
        setReason("")
    }
    const details = (id: number) => {
        router.push(`profile/details-folder/${id}`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">ກຳລັງໂຫຼດຂໍ້ມູນ...</p>
                </div>
            </div>
        )
    }

    if (!result?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="rounded-full bg-muted p-6 mb-4">
                    <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground mb-1">ບໍ່ພົບຂໍ້ມູນ</p>
                <p className="text-sm text-muted-foreground">ລອງປ່ຽນການຄົ້ນຫາຂອງທ່ານ</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.map((item) => {
                    const user = item.user
                    const profile = item.profile

                    return (
                        <Card
                            key={item.id}
                            className="group flex flex-col justify-between overflow-hidden border-2 border-blue-300 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                        >
                            <div>
                                <CardHeader className="pb-4 bg-gradient-to-br from-primary/5 to-transparent">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <CardTitle className="text-lg font-bold leading-tight">
                                                    {user?.firstName} {user?.lastName}
                                                </CardTitle>
                                                <div
                                                    className="hover:shadow-lg transition-all cursor-pointer"
                                                    onClick={() => details(item.id)}
                                                >
                                                    ລາຍລະອຽດ
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <CardDescription className="flex items-center gap-2 text-xs">
                                                    <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span className="truncate">{user?.email || "ບໍ່ມີ Email"}</span>
                                                </CardDescription>
                                                <CardDescription className="flex items-center gap-2 text-xs">
                                                    <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span>{user?.phone || "ບໍ່ມີເບີໂທ"}</span>
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4">
                                    {Array.isArray(profile) && profile.length > 0 ? (
                                        <>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-primary" />
                                                    <h4 className="text-sm font-semibold text-foreground">
                                                        ຈໍານວນຟອມ ({profile.length})
                                                    </h4>
                                                </div>
                                                <CardDescription className="flex items-center gap-2 text-xs">
                                                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span className="text-sm font-semibold text-foreground">
                                                        ວັນທີສ້າງແຟ້ມ {format(new Date(item.createdAt), "dd/MM/yyyy")}
                                                    </span>
                                                </CardDescription>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
                                                {profile.map((profileItem, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                    >
                                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                            <User className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <p className="text-xs font-medium truncate">
                                                            {profileItem.firstName || "ບໍ່ມີຂໍ້ມູນ"}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 text-center">
                                            <div className="rounded-full bg-muted p-3 mb-2">
                                                <Users className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <p className="text-xs text-muted-foreground">ບໍ່ມີສະມາຊິກໃນແຟ້ມ</p>
                                        </div>
                                    )}
                                </CardContent>
                            </div>

                            {/* ✅ ປຸ້ມຢູ່ລຸ່ມສຸດ */}
                            <div className="flex justify-end gap-3 p-4 mt-auto ">
                                <Button
                                    variant="outline"
                                    className="border-green-500 text-green-600 hover:bg-green-50"
                                    onClick={() => useEditStatus({ id: item.id, status: "APPROVED" })}
                                >
                                    ອະນຸມັດ
                                </Button>

                                <Button
                                    variant="outline"
                                    className="border-red-500 text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                        setSelectedId(item.id)
                                        setOpen(true)
                                    }}
                                >
                                    ປະຕິເສດ
                                </Button>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* ✅ Dialog popup ສຳລັບໃສ່ເຫດຜົນ */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>ເຫດຜົນການປະຕິເສດ</DialogTitle>
                    </DialogHeader>

                    <Textarea
                        placeholder="ກະລຸນາໃສ່ເຫດຜົນ..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="min-h-[100px]"
                    />

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            ຍົກເລີກ
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700" onClick={handleReject}>
                            ຢືນຢັນການປະຕິເສດ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
