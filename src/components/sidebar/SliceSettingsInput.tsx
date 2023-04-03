import _render from "packages/render";

export const SliceSettingsInput = ({
  backgroundColor="#303030",
  label,
  name,
  onChange,
  value,
}: {
  backgroundColor?: string;
  label: string;
  name: string;
  onChange: (value: {text:string, color?: string, hidden?:boolean}) => void;
  value?: string;
}) => {
  return (
    <label
      style={{
        marginRight: "10px",
        marginTop: "30px",
        position: "relative",
      }}
    >
      <span
        style={{
          color: 'white',
          fontFamily: 'verdana',
          fontSize: "12px",
          left: "2px",
          position: "absolute",
          top: "-18px",
        }}
      >
        {label}
      </span>
      <input
        name={name}
        onChange={(e)=>{
           onChange({ text: e.target.value })
        }}
        maxLength={12}
        style={{
          backgroundColor,
          border: "none",
          borderRadius: "8px",
          caretColor: 'white',
          fontFamily:'"Alfa Slab One", verdana',
          height: "24px",
          textAlign: "center",
          textShadow: "-1px -1px 0 white,  1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
        }}
        value={value}
      />
    </label>
  );
};
