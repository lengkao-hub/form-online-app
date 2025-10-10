// ApplicationStep.tsx
import ApplicationForm from "../../(application)/application/container/form/form";
import { useQuickApplicationForm } from "../../(application)/application/hook/useForm";

interface Props {
  profileId: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  profileIds: number[];
  handleReset: () => void;
}

export const ApplicationStep = ({ profileId, currentIndex, setCurrentIndex, profileIds, handleReset }: Props) => {
  const { form, onSubmit } = useQuickApplicationForm({ profileId, type: "NEW" });
  const selectedFolderId = Number(localStorage.getItem("selectedFolderId"));  

  const handleSubmit = async (data: any) => {
    await onSubmit(data);

    if (currentIndex < profileIds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleReset();
    }
  };

  return <ApplicationForm key={profileId} form={form} onSubmit={handleSubmit} profileId={profileId} selectedFolderId={selectedFolderId}/>;
};
