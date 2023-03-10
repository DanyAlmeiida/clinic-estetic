import React, { Suspense } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_PT } from "material-react-table/locales/pt";

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
const Datatable = ({ props, isLoading, columns, data, fnDelete, fnEdit, density }) => {
  return (
    <div>
      <Suspense fallback={loading()}>
        <div className="table-responsive ">
          <MaterialReactTable
            enableColumnActions={true}
            enableEditing
            positionActionsColumn={"first"}
            positionGlobalFilter="right"
            localization={MRT_Localization_PT}
            columns={columns}
            data={data}
            initialState={{ showGlobalFilter: true, density: density ?? "comfortable" }}
            muiSearchTextFieldProps={{ sx: { minWidth: "100rem", maxWidth: "100%" } }}
            enableToolbarInternalActions={false}
            state={{ showProgressBars: isLoading }}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Editar">
                  <IconButton onClick={() => fnEdit(row.original.id)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Eliminar">
                  <IconButton color="error" onClick={() => fnDelete(row.original.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Datatable;
