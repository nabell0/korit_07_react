// import { CarResponse } from "../types"; table 태그에서는 data.map() 때문에 필요하지만, x-data-grid 사용이후로는 필요 없기 때문에 주석 처리 했습니다.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars , deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";

function Carlist(){
  const queryClient = useQueryClient();
  const {data,error,isSuccess} = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const {mutate} = useMutation(deleteCar, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["cars"]});  // 이부분은 useQuery()를 정의한 부분과 관련있음.
    },
    onError: err => {
      console.log(err);
    },

  })

  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: 'delete',
      headerName: '',
      width:90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams)=> (
        <button
          onClick={()=> mutate(params.row._links.self.href)}
        >
          Delete
        </button>
      )
    }
  ];

  if(!isSuccess) {
    return <span>Loading...⭐</span>
  }

  if (error) {
    return <span>자동차들을 불러오는 데 실패했습니다.</span>
  }
  else {
    return(
      // <table>
      //   <tbody>
      //     {
      //       data.map((car: CarResponse) =>
      //         <tr key={car._links.self.href}>
      //           <td>{car.brand}</td>
      //           <td>{car.model}</td>
      //           <td>{car.color}</td>
      //           <td>{car.registrationNumber}</td>
      //           <td>{car.modelYear}</td>
      //           <td>{car.price}</td>
      //         </tr>
      //       )
      //     }
      //   </tbody>
      // </table>
      <DataGrid
      rows={data}
      columns={columns}
      getRowId={row => row._links.self.href}
      />
    )
  }
}

export default Carlist