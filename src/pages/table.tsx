import { useEffect, useRef, useState } from "react";

interface Props {
  data: any[];
  onNextPage: () => void;
}

function Table({ data, onNextPage }: Props) {
  const lastRowRef = useRef<HTMLTableRowElement>(null);
  const [expand, setExpand] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("400px");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("intersecting");
          onNextPage();
        }
      },
      { threshold: 1 }
    );

    if (lastRowRef.current) {
      observer.observe(lastRowRef.current);
    }

    return () => {
      if (lastRowRef.current) {
        observer.unobserve(lastRowRef.current);
      }
    };
  }, [onNextPage]);

  const handleExpand = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (expand) {
      setHeight("1000px");
    } else {
      setHeight("400px");
    }
  }, [expand]);

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{
        maxHeight: height,
        overflowY: "auto",
        border: "1px solid black",
      }}
    >
      <button onClick={handleExpand}>{expand ? "Collapse" : "Expand"}</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.completed ? "true" : "false"}</td>
            </tr>
          ))}
          <tr ref={lastRowRef}></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
