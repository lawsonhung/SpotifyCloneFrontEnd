import { useSelector } from "react-redux";
import "./Results.css";
import type { RootState } from "../../app/store";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  console.log("mainDisplayItem", mainDisplayItem);

  return (
    <div className="results">
    <h1>Results</h1>
    </div>
  )
}

export default Results;