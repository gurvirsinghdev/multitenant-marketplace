import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { Label } from "recharts";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  console.log({ numericValue, parts });
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formattedValue) {
    return "";
  }
  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";

  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export function PriceFilter(props: Props) {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onMinPriceChange(e.target.value.replace(/[^0-9.]/g, ""));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onMaxPriceChange(e.target.value.replace(/[^0-9.]/g, ""));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum Price</Label>
        <Input
          type="text"
          placeholder="$0"
          onChange={handleMinPriceChange}
          value={props.minPrice ? formatAsCurrency(props.minPrice) : ""}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum Price</Label>
        <Input
          type="text"
          placeholder="&infin;"
          onChange={handleMaxPriceChange}
          value={props.maxPrice ? formatAsCurrency(props.maxPrice) : ""}
        />
      </div>
    </div>
  );
}
