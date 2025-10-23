import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos } from "../api/todolistapi";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar, IconButton, Tooltip } from "@mui/material";
import AddList from "./AddList";

function Todolist() {
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "content", headerName: "Content", width: 200 },
    {
      field: "delete",
      headerName: "",
      width: 90,
      renderCell: (params: GridCellParams) => (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              if (confirm(`${params.row.content}를 삭제하시겠습니까?`)) {
                mutate(params.row._link.self.href);
              }
            }}
          ></IconButton>
        </Tooltip>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading...⭐</span>;
  }

  if (error) {
    return <span>항목을 불러오는데 실패했습니다.</span>;
  } else {
    return (
      <>
        <AddList />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
      </>
    );
  }
}
export default Todolist;
