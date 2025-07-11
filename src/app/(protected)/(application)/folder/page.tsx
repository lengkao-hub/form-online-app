/* eslint-disable max-lines */
"use client";

import { FolderOpenDot, House, Loader, MessageSquareX, RefreshCw } from "lucide-react";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { CreateButton } from "@/components/containers/create-button";

import { TitleLabel } from "@/components/containers/headerLabel";
import {
  Badge,
  Button,
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui";
import { FolderCardView } from "./container/card";
import { FolderToolbar } from "./container/filter";
import useFolderAggregation from "./hook/useFolderAggregation";
import useFolderTable from "./hook/useFolderList";
import { getOfficeId, getOfficeIds, getUserRole } from "../../../lib/getSession";
import { columnsFolder } from "./container/table/columns";
import { DataTable } from "@/components/containers/table/data-table";
import { DataTableToolbar } from "./container/table/filter";

export default function FolderView() {
  const role = getUserRole();
  let folderListComponent;
  switch (role) {
    case "ADMIN":
      folderListComponent = <FolderListAdmin />;
      break;
    case "SUPER_ADMIN":
      folderListComponent = <FolderListAdmin />;
      break;
    case "FINANCE":
      folderListComponent = <FolderListFinance />;
      break;
    case "POLICE_OFFICER":
      folderListComponent = <FolderListPoliceOfficer />;
      break;
    case "POLICE_COMMANDER":
      folderListComponent = <FolderListPoliceCommander />;
      break;
    case "VERSIFICATION_OFFICER":
      folderListComponent = <FolderListVersificationOfficer />;
      break;
    default:
      folderListComponent = null;
      break;
  }
  return (
    <>
      {folderListComponent}
    </>
  );
}
function FolderListFinance() {
  const officeListIds = getOfficeIds()
  const { result: resultFinanceUnderReview, limit } = useFolderTable({ status: "FINANCE_UNDER_REVIEW", officeIds: officeListIds });
  const { result: aggregationFinanceUnderReview } = useFolderAggregation({ status: "FINANCE_UNDER_REVIEW" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!' />
      </div>
      <Tabs defaultValue="tab-1" className="space-y-4">
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1">
            <House className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              ແຟ້ມລໍຖ້າຮັບເງີນ
            <Badge variant="secondary" className="ml-1"> {aggregationFinanceUnderReview.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group gap-x-2">
            <Loader className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />{"ແຟ້ມທັງໝົດ"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationFinanceUnderReview?.total || 0} title="ລໍຖ້າຮັບເງິນ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultFinanceUnderReview?.map((folder) => (
                <FolderCardView folder={folder} key={folder?.id} status= "FINANCE_UNDER_REVIEW" action={{ approveText: "ຢັ້ງຢືນຮັບເງິນ", showDetail: "ລາຍລະອຽດ", reject: "reject" } } />
              ))}
            </div>
            {aggregationFinanceUnderReview.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => limit.setLimit(limit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className='space-y-4'>
            <AllFolderTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
function FolderListPoliceOfficer() {
  const officeListIds = getOfficeId()
  const { result: resultApproved, updateSearch: updateSearchApproved, filter: filterApproved, limit: approvedLimit } = useFolderTable({ status: "APPROVED_BY_POLICE", officeId: officeListIds  });
  const { result: resultPending, updateSearch: updateSearchPending, filter: filterPending, limit: pendingLimit } = useFolderTable({ status: "PENDING", officeId: officeListIds  });
  const { result: resultRejected, updateSearch: updateSearchRejected, filter: filterRejected, limit: rejectedLimit } = useFolderTable({ status: "REJECTED_BY_COMMANDER", officeId: officeListIds  });
  const { result: aggregationPending } = useFolderAggregation({ status: "PENDING" });
  const { result: aggregationApproved } = useFolderAggregation({ status: "APPROVED_BY_POLICE" });
  const { result: aggregationRejected } = useFolderAggregation({ status: "REJECTED_BY_COMMANDER" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!' />
      </div>
      <Tabs defaultValue="tab-1" className="space-y-4">
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1" className="group gap-x-2">
            <Loader className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />{"ແຟ້ມລໍຖ້າຍອມຮັບ"}
            <Badge variant="secondary" className="ml-1"> {aggregationPending.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group">
            <RefreshCw className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມທີ່​ກຳລັງຕື່ມຟອມ"}
            <Badge variant="secondary" className="ml-1"> {aggregationApproved.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="group">
            <RefreshCw className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມທີ່​ຖຶກປະຕິເສດ"}
            <Badge variant="secondary" className="ml-1"> {aggregationRejected.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-4" className="group">
            <MessageSquareX className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມທັງໝົດ"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationPending?.total || 0} title="ແຟ້ມມາໃຫມ່" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchPending} filter={filterPending} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultPending?.map((folder) => (
                <FolderCardView folder={folder}  status= "APPROVED_BY_POLICE" key={folder?.id} action={{ acceptText: "ຮັບເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationPending.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => pendingLimit.setLimit(pendingLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationApproved?.total || 0 } title="ແຟ້ມທີ່ກໍາລັງຕື່ມຟອມ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchApproved} filter={filterApproved} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultApproved?.map((folder) => (
                <FolderCardView folder={folder} status="POLICE_UNDER_REVIEW" key={folder?.id} action={{ statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationApproved.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => approvedLimit.setLimit(approvedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-3">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationRejected?.total || 0 } title="ແຟ້ມທີ່​ຖຶກປະຕິເສດ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchRejected} filter={filterRejected} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultRejected?.map((folder) => (
                <FolderCardView folder={folder} status="POLICE_UNDER_REVIEW" key={folder?.id} action={{ statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationRejected.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => rejectedLimit.setLimit(rejectedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-4">
          <div className='space-y-4'>
            <AllFolderTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
function FolderListVersificationOfficer() {
  const officeListIds = getOfficeId()
  const { result: aggregationDefault } = useFolderAggregation({ status: "DEFAULT" });
  const { result: resultDefault, updateSearch, filter, limit: defaultLimit } = useFolderTable({ status: "DEFAULT", officeId: officeListIds  });
  const { result: resultRejected, updateSearch: updateSearchRejected, filter: filterRejected, limit: rejectedLimit } = useFolderTable({ status: "REJECTED", officeId: officeListIds  });
  const { result: aggregationRejected } = useFolderAggregation({ status: "REJECTED" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!' />
        <CreateButton resouce="folder" title='ສ້າງແຟ້ມ' />
      </div>
      <Tabs defaultValue="tab-1" className="space-y-4">
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1">
            <House className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              ສ້າງໃໝ່
            <Badge variant="secondary" className="ml-1"> {aggregationDefault.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group">
            <MessageSquareX className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມມີບັນຫາ"}
            <Badge variant="secondary" className="ml-1"> {aggregationRejected.total} </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationDefault?.total || 0} title="ສ້າງໃໝ່" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearch} filter={filter} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultDefault?.map((folder) => (
                <FolderCardView folder={folder} status= "FINANCE_UNDER_REVIEW" key={folder.id} action={{ editText: "ແກ້ໄຂ", acceptText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationDefault.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => defaultLimit.setLimit(defaultLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationRejected?.total || 0} title="ແຟ້ມມີບັນຫາ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchRejected} filter={filterRejected} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultRejected?.map((folder) => (
                <FolderCardView folder={folder}  showReject={true} status= "FINANCE_UNDER_REVIEW" key={folder?.id} action={{ editText: "ແກ້ໄຂ", statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationRejected.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => rejectedLimit.setLimit(rejectedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-5">
          <div className='space-y-4'>
            <AllFolderTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FolderListAdmin() {
  const officeListIds = getOfficeIds()
  const { result: resultFinanceUnderReview } = useFolderTable({ status: "FINANCE_UNDER_REVIEW", officeIds: officeListIds });
  const { result: aggregationFinanceUnderReview } = useFolderAggregation({ status: "FINANCE_UNDER_REVIEW" });
  const { result: aggregationDefault } = useFolderAggregation({ status: "DEFAULT" });
  const { result: resultDefault, updateSearch, filter } = useFolderTable({ status: "DEFAULT", officeIds: officeListIds  });
  // const { result: allFolder, updateSearch: updateSearchAllFolder, filter: filterAllFolder } = useFolderTable({ status: "", officeIds: officeListIds  });
  const { result: resultApproved, updateSearch: updateSearchApproved, filter: filterApproved, limit: approvedLimit } = useFolderTable({ status: "APPROVED_BY_POLICE", officeIds: officeListIds  });
  const { result: resultRejected, updateSearch: updateSearchRejected, filter: filterRejected, limit: rejectedLimit } = useFolderTable({ status: "REJECTED", officeIds: officeListIds  });
  const { result: resultPending, updateSearch: updateSearchPending, filter: filterPending, limit: pendingLimit } = useFolderTable({ status: "PENDING", officeIds: officeListIds  });
  const { result: aggregationPending } = useFolderAggregation({ status: "PENDING" });
  const { result: aggregationApproved } = useFolderAggregation({ status: "APPROVED_BY_POLICE" });
  const { result: aggregationRejected } = useFolderAggregation({ status: "REJECTED" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!' />
      </div>
      <Tabs defaultValue="tab-1" className="space-y-4">
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1" onClick={() => filterPending.setDateFilter(undefined)}>
            <House className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              ສ້າງໃໝ່
            <Badge variant="secondary" className="ml-1"> {aggregationDefault.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group gap-x-2" onClick={() => filterPending.setDateFilter(undefined)}>
            <Loader className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />{"ແຟ້ມລໍຖ້າຮັບເງີນ"}
            <Badge variant="secondary" className="ml-1"> {aggregationFinanceUnderReview.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="group gap-x-2" onClick={() => filterPending.setDateFilter(undefined)}>
            <Loader className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />{"ແຟ້ມລໍຖ້າຍອມຮັບ"}
            <Badge variant="secondary" className="ml-1"> {aggregationPending.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-4" className="group" onClick={() => filterPending.setDateFilter(undefined)}>
            <RefreshCw className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມທີ່​ກຳລັງຕື່ມຟອມ"}
            <Badge variant="secondary" className="ml-1"> {aggregationApproved.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-5" className="group" onClick={() => filterPending.setDateFilter(undefined)}>
            <MessageSquareX className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມມີບັນຫາ"}
            <Badge variant="secondary" className="ml-1"> {aggregationRejected.total} </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-6" className="group" onClick={() => filterPending.setDateFilter(undefined)}>
            <MessageSquareX className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" /> {"ແຟ້ມທັງໝົດ"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationDefault?.total || 0} title="ສ້າງໃໝ່" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearch} filter={filter} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultDefault?.map((folder) => (
                <FolderCardView folder={folder} status= "FINANCE_UNDER_REVIEW" key={folder.id} action={{ editText: "ແກ້ໄຂ", acceptText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationDefault.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => approvedLimit.setLimit(approvedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationFinanceUnderReview?.total || 0} title="ລໍຖ້າຮັບເງິນ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchPending} filter={filterPending} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultFinanceUnderReview?.map((folder) => (
                <FolderCardView folder={folder} key={folder?.id} status= "FINANCE_UNDER_REVIEW" action={{ approveText: "ຢັ້ງຢືນຮັບເງິນ", showDetail: "ລາຍລະອຽດ", reject: "reject" } } />
              ))}
            </div>
            {aggregationFinanceUnderReview.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => approvedLimit.setLimit(approvedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-3">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationPending?.total || 0} title="ແຟ້ມມາໃຫມ່" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchPending} filter={filterPending} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultPending?.map((folder) => (
                <FolderCardView folder={folder}  status= "APPROVED_BY_POLICE" key={folder?.id} action={{ acceptText: "ຮັບເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
          </div>
          {aggregationPending.total > 9 && (
            <div className="w-full flex justify-end mt-4">
              <Button className="bg-none" onClick={() => pendingLimit.setLimit(pendingLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="tab-4">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationApproved?.total || 0} title="ແຟ້ມລໍຖ້າຍອມຮັບຈາກ​ຕໍາ​ຫຼວດ​" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchApproved} filter={filterApproved} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultApproved?.map((folder) => (
                <FolderCardView folder={folder} status= "POLICE_UNDER_REVIEW" key={folder?.id} action={{ statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationApproved.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => approvedLimit.setLimit(approvedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-5">
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
            <AggregationCard value={aggregationRejected?.total || 0} title="ແຟ້ມມີບັນຫາ" icon={<FolderOpenDot />} label="ແຟ້ມ" />
          </div>
          <div className='space-y-4'>
            <FolderToolbar updateSearch={updateSearchRejected} filter={filterRejected} showStatus={false} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
              {resultRejected?.map((folder) => (
                <FolderCardView folder={folder}  showReject={true} status= "FINANCE_UNDER_REVIEW" key={folder?.id} action={{ editText: "ແກ້ໄຂ", statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ" }} />
              ))}
            </div>
            {aggregationRejected.total > 9 && (
              <div className="w-full flex justify-end">
                <Button className="bg-none" onClick={() => rejectedLimit.setLimit(rejectedLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab-6">
          <div className='space-y-4'>
            <AllFolderTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
function FolderListPoliceCommander() {
  const officeListIds = getOfficeIds()
  const { result, updateSearch, filter, limit } = useFolderTable({ status: "POLICE_UNDER_REVIEW", officeIds: officeListIds });
  const { result: aggregationReviewed } = useFolderAggregation({ status: "POLICE_UNDER_REVIEW" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregationReviewed?.total || 0} title="ມາໃໝ່" icon={<FolderOpenDot />} label="ແຟ້ມ" />
      </div>
      <div className='space-y-4'>
        <FolderToolbar updateSearch={updateSearch} filter={filter} showStatus={false} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
          {result?.map((folder) => (
            <FolderCardView folder={folder} status= "IN_PRODUCTION" key={folder?.id} action={{ statusText: "ອະນຸມັດ", showDetail: "ລາຍລະອຽດ", reject: "reject" }} />
          ))}
        </div>
        {aggregationReviewed.total > 9 && (
          <div className="w-full flex justify-end">
            <Button className="bg-none" onClick={() => limit.setLimit(limit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const AllFolderTable = () => {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useFolderTable({ status: "" });
  return(
    <div className="pl-4 space-y-2">
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsFolder} data={result} meta={meta} updatePagination={updatePagination} loading={loading}/>
      </div>
    </div>
  );
}
