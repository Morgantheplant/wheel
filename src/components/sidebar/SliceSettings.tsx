import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";

export const SliceSettings = ({
    index,
    slice,
  }: {
    slice: WheelSlice;
    index: number;
  }) => {
    return (
      <div>
        <label>
          <span>{`Slice ${index} Value:`}</span>
          <input value={slice.text} name={`slice-${index}`} />
        </label>
        <label>
          <span>{`Slice ${index} Value:`}</span>
          <input value={slice.color} name={`slice-${index}`} />
        </label>
      </div>
    );
  };