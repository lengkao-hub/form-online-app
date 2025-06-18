import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui";
  
interface BarCodeOptionsProps {
  onChange: (value: string) => void;
}

export function BarCodeOptions({ onChange }: BarCodeOptionsProps) {
  return(
    <Select onValueChange={onChange} defaultValue="barcode">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="ເລືອກ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="barcode">1.Barcode</SelectItem>
          <SelectItem value="qrcode">2. QR code(Beta)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}