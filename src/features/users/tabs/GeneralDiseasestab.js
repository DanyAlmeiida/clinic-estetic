import React, { Suspense, useState, useMemo } from "react";
import API from "../../../API";
import moment from "moment";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import Datatable from "../../../Components/Datatable";
import GeneralDiseasesModal from "./modals/GeneralDiseasesModal";

const GeneralDiseasestab = ({ setLoading, data_collection, toast, clientId, refresh }) => {
  let [openModal, setOpenModal] = useState(false);
  let [mode, setMode] = useState("add");
  let [dataG, setDataG] = useState({});
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

  let fnEditGeneral = (id) => {
    setMode("edit");
    API.get("/diseases/" + id)
      .then((x) => setDataG(x.data))
      .then(() => setOpenModal(true));
  };

  let fnaddGeneral = () => {
    setMode("add");
    setOpenModal(true);
  };
  let fnDelete = (id) => {
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
        API.delete("/diseases/" + id)
          .then(() => {
            refresh();
          })
          .catch(() => toast.fire({ icon: "error", title: "Não foi possível eliminar o registo!" }));
        toast.fire("Registo eliminado com sucesso!", "", "success");
      }
    });
  };
  let exit = () => setOpenModal(false);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="row">
        <div className="col-sm-12">
          <hr />
          <h4>Doenças Gerais Influenciadoras:</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Button className="float-right" onClick={() => fnaddGeneral()} variant="contained">
            Adicionar
          </Button>
          <Datatable density={"compact"} columns={columns} data={data_collection ?? []} fnEdit={fnEditGeneral} fnDelete={fnDelete} />
        </div>
      </div>
      {openModal ? <GeneralDiseasesModal refresh={refresh} setLoading={setLoading} mode={mode} open={openModal} data={dataG} exit={exit} toast={toast} clientId={clientId} /> : ""}
    </Suspense>
  );
};

export default GeneralDiseasestab;
