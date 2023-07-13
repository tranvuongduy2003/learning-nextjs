import { StudentDetail } from "@/components/swr";
import { useState } from "react";

export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 1, 1]);

  function handleAddClick() {
    setDetailList((prevList) => [...prevList, 1]);
  }

  return (
    <div>
      <h1>SWR Playgrounds</h1>
      <button onClick={handleAddClick}>Add detail</button>

      <ul>
        {detailList.map((x, index) => (
          <li key={index}>
            <StudentDetail studentId="lea11ziflg8xoiza " />
          </li>
        ))}
      </ul>
    </div>
  );
}
