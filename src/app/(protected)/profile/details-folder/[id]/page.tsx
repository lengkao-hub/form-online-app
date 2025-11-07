
import { DetailsFolder } from "../../container/table/details-folder";
export default function detailsfolder({ params }: { params: { id: number } }) {

    return (
        <div>
            <DetailsFolder id={params.id} />
        </div>
    );
}