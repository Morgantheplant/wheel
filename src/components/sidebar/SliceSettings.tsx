import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";
import { getWheelColors } from "../wheel/WheelSliceGradient";
import { SliceSettingsInput } from "./SliceSettingsInput";

export const SliceSettings = ({
  index,
  onChange,
  slice,
  total,
}: {
  index: number;
  onChange: (value: { text: string; color?: string; hidden?: boolean }) => void;
  slice: WheelSlice;
  total: number;
}) => {
  const { color1 } = getWheelColors({ index, total });
  return (
    <div className="sidebar__settings" style={{ display: "flex" }}>
      <SliceSettingsInput
        backgroundColor={slice.color || color1}
        label={`Slice ${index + 1} Text:`}
        name={`slice-${index}-text`}
        onChange={onChange}
        value={slice.text}
      />
    </div>
  );
};
