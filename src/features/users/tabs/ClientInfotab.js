import React, { useEffect, Suspense, useState } from "react";
import API from "../../../API";
import moment from "moment";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
import { Button } from "@mui/material";

const ClientInfotab = ({ setLoading, data, toast, refresh }) => {
  let initial_state = {
    id: "",
    clientId: "",
    name: "",
    birthDate: null,
    jobOccupation: "",
    observations: "",
    modifiedAt: "",
    createdAt: "",
  };
  registerLocale("pt", pt);
  const params = useParams();
  const [state, setState] = useState(initial_state);

  useEffect(() => {
    if (data != null) {
      setState({
        id: data.id,
        clientId: data.clientId,
        name: data.name,
        birthDate: new Date(data?.birthDate),
        jobOccupation: data.jobOccupation,
        observations: data.observations,
        modifiedAt: data.modifiedAt,
        createdAt: data.createdAt,
      });
    }
  }, [data]);

  const save = () => {
    setLoading(true);
    API.put("/clients/" + params.id, state)
      .then(() => toast.fire({ icon: "success", title: "Cliente atualizado com sucesso!" }).then(() => refresh()))
      .catch(() => toast.fire({ icon: "error", title: "Não foi possível atualizar o cliente!" }))
      .finally(() => setLoading(false));
  };
  return (
    <Suspense fallback={"loading..."}>
      <div className="row">
        <div className="col-sm-12">
          <h4>Informação do cliente:</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-4 col-md-5 col-lg-5 col-xl-5">
          <div className="form-group">
            <label htmlFor="inputName">Nome:</label>
            <input type="text" className="form-control" value={state?.name} id="name" placeholder="Ex: Joana Aguiar Matias..." onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))} />
          </div>
        </div>
        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <div className="form-group">
            <label htmlFor="inputOccupation">Profissão:</label>
            <input type="text" className="form-control" id="jobOccupation" value={state?.jobOccupation} placeholder="Ex: Contabilista..." onChange={(e) => setState((prev) => ({ ...prev, jobOccupation: e.target.value }))} />
          </div>
        </div>
        <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
          <div className="form-group">
            <label>Data de Nascimento:</label>
            <div className="input-group">
              <DatePicker
                locale={pt}
                showYearDropdown={true}
                showMonthDropdown={true}
                required
                isClearable={true}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="dd/MM/yyyy"
                selected={state?.birthDate == null ? null : new Date(state?.birthDate)}
                onChange={(date) => setState((prev) => ({ ...prev, birthDate: date ? moment(date).format().toString() : null }))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>Observações</label>
            <textarea className="form-control" rows="3" id="observations" placeholder="Observações..." value={state?.observations} onChange={(e) => setState((prev) => ({ ...prev, observations: e.target.value }))}></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Button type="submit" className="float-right" onClick={() => save()} variant="contained">
            Guardar
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default ClientInfotab;
