import React, { Suspense, useState, useMemo } from "react";
import API from "../../../API";
import moment from "moment";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import Datatable from "../../../Components/Datatable";
import ClinicalInformationModal from "./modals/ClinicalInformationModal";

const ClientClinicaltab = ({ setLoading, data_collection, isLoading, toast, clientId, refresh }) => {
  const [clinicalModalOpen, setClinicalModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [data, setData] = useState({});
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID#",
        Cell: ({ cell }) => (
          <div title={cell.getValue()}>
            {cell.getValue().substring(0, 10)}
            {cell.getValue().length >= 10 && "..."}
          </div>
        ),
      },
      {
        accessorKey: "creationDate",
        header: "Data de registo",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD/MM/YYYY HH:MM:SS"),
      },
      {
        accessorKey: "ModifiedAt",
        header: "Data de Última Alteração",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD/MM/YYYY HH:MM:SS"),
      },
    ],
    []
  );

  const fnEdit = async (id) => {
    setMode("edit");
    API.get("/clinical/" + id).then((x) => {
      setData(x.data);
      setClinicalModalOpen(true);
    });
  };

  const fnadd = () => {
    setMode("add");
    setClinicalModalOpen(true);
  };
  const fnDelete = (id) => {
    Swal.fire({
      title: "Atenção! Tem a certeza que desejar eliminar este registo?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#ff0000",
      icon: "warning",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        API.delete("/clinical/" + id)
          .then((x) => {
            refresh();
          })
          .console.error(() => toast.fire({ icon: "error", title: "Não foi possível eliminar o registo clínico!" }));
        toast.fire("Registo clínico eliminado com sucesso!", "", "success");
      }
    });
  };
  const exit = () => setClinicalModalOpen(false);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="row">
        <div className="col-sm-12">
          <hr />
          <h4>Dados Clínicos:</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Button className="float-right" onClick={() => fnadd()} variant="contained">
            Adicionar
          </Button>
          <Datatable density={"compact"} columns={columns} data={data_collection ?? []} fnEdit={fnEdit} fnDelete={fnDelete} />
        </div>
      </div>
      {clinicalModalOpen ? <ClinicalInformationModal refresh={refresh} setLoading={setLoading} mode={mode} open={clinicalModalOpen} data={data} exit={exit} toast={toast} clientId={clientId} /> : ""}
    </Suspense>
  );
};

export default ClientClinicaltab;
