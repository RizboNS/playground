import { useEffect, useState } from "react";
import "./App.css";
import Table from "./pages/table";
function App() {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    console.log("page changed", page);
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setFetchingData(true);
    const url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        json.length === 0 ? setNoMoreData(true) : setNoMoreData(false);
        setData((prevData: any) => [...prevData, ...json]);
        setFetchingData(false);
      });
  };

  const handleNextPage = () => {
    if (fetchingData || noMoreData) return;
    setPage(page + 1);
  };

  return (
    <div>
      {page}
      <Table data={data} onNextPage={handleNextPage} />
    </div>
  );
}

export default App;
