import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";
import { getWheelColors } from "../wheel/WheelSliceGradient";
import { SliceSettingsInput } from "./SliceSettingsInput";
import { Close } from "../icons/Close";

export const SliceSettings = ({
  index,
  onChange,
  onRemove,
  slice,
  total,
}: {
  index: number;
  onChange: (value: { text: string; color?: string; hidden?: boolean }) => void;
  onRemove: (index: number) => void;
  slice: WheelSlice;
  total: number;
}) => {
  const { color1 } = getWheelColors({ index: index === 0 ? total - 1 : index - 1, total });
  return (
    <div className="sidebar__settings" style={{ display: "flex", justifyContent: 'space-between' }}>
      <SliceSettingsInput
        backgroundColor={slice.color || color1}
        label={`Slice ${index + 1} Text:`}
        name={`slice-${index}-text`}
        onChange={onChange}
        value={slice.text}
      />
      <div>
        <button
          style={{
            height: "30px",
            width: "30px",
            marginTop: "29px",
            padding: "0",
            backgroundColor: "rgba(0,0,0,0)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          title="remove slice"
          onClick={() => {
            onRemove(index);
          }}
        >
          <Close width="20px" height="20px" color="black" />
        </button>
      </div>
    </div>
  );
};
