import { FaPlus } from "react-icons/fa";
import type {CSSProperties} from "react";

export default function AddIcon() {
  const iconStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "8px",
    border: "2px solid #007bff", // Replace with your actual color
  };

  const svgStyle: CSSProperties = {
    width: "75%",
    height: "75%",
  };

  return (
      <span style={iconStyle}>
      <FaPlus style={svgStyle} />
    </span>
  );
}
