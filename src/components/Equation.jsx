import { Fragment } from "react";
import { eq } from "../lib/equation.js";

export default function Equation({ tree }) {
  const parts = eq(tree).split("⁺");
  return (
    <div id="eq">
      {parts.map((p, i) => (
        <Fragment key={i}>{p}{i < parts.length - 1 && <span className="sup">+</span>}</Fragment>
      ))}
    </div>
  );
}
