import { Suspense, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import moment from "moment";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import API from "../../../../API";

const GeneralDiseasesModal = ({ open, mode, data, exit, toast, clientId, refresh }) => {
  registerLocale("pt", pt);

  const initial_state = {
    id: "",
    modifiedAt: null,
    createdAt: null,
    DiabetesDate: null,
    DiabetesType: "",
    CholesterolDate: null,
    CholesterolValue: 0,
    TriglyceridesDate: null,
    TriglyceridesValue: 0,
    HasVascularProblems: false,
    HasChilblains: false,
    HasEpilepsy: false,
    HasSkinProblems: false,
    HasHypotension: false,
    HasHyperthyroidism: false,
    HasHemophiliac: false,
    FoodIntolerance: "",
    CancerBackground: "",
    StressDegree: "",
    Intestine: "",
  };
  let [general, setGeneral] = useState(initial_state);

  useEffect(() => {
    if (mode === "edit") {
      setGeneral({
        id: data?.id,
        DiabetesDate: data?.diabetesDate,
        DiabetesType: data?.diabetesType,
        CholesterolDate: data?.cholesterolDate,
        CholesterolValue: data?.cholesterolValue,
        TriglyceridesDate: data?.triglyceridesDate,
        TriglyceridesValue: data?.triglyceridesValue,
        HasVascularProblems: data?.hasVascularProblems,
        HasChilblains: data?.hasChilblains,
        HasEpilepsy: data?.hasEpilepsy,
        HasSkinProblems: data?.hasSkinProblems,
        HasHypotension: data?.hasHypotension,
        HasHyperthyroidism: data?.hasHyperthyroidism,
        HasHemophiliac: data?.hasHemophiliac,
        FoodIntolerance: data?.foodIntolerance,
        CancerBackground: data?.cancerBackground,
        StressDegree: data?.stressDegree,
        Intestine: data?.intestine,
        modifiedAt: data?.modifiedAt,
        createdAt: data?.createdAt,
      });
    }
  }, [data]);

  let onChangeDiseases = (target, value) => {
    setGeneral({ ...general, [target]: value });
  };
  const ChangeSave = (obj) => {
    if (mode === "add") {
      Add();
    }
    if (mode === "edit") {
      Edit();
    }
  };
  const Add = () => {
    API.post("/diseases/" + clientId, general)
      .then(() => {
        exit();
        toast.fire({ icon: "success", title: "Registo adicionado com sucesso!" });
      })
      .catch(() => toast.fire({ icon: "error", title: "Não foi possível adicionar o registo!" }))
      .finally(() => {
        refresh();
      });
  };
  const Edit = () => {
    API.put("/diseases", general)
      .then(() => {
        exit();
        toast.fire({ icon: "success", title: "Registo atualizado com sucesso!" });
      })
      .catch(() => toast.fire({ icon: "error", title: "Não foi possível atualizar o registo!" }))
      .finally(() => {
        refresh();
      });
  };
  return (
    <Suspense fallback={"loading..."}>
      <Dialog maxWidth="lg" open={open}>
        <DialogTitle textAlign="center"></DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="diabetes">Diabetes:</label>
                  <DatePicker
                    id="diabetes"
                    locale={pt}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    isClearable={true}
                    selected={general?.DiabetesDate == null ? null : new Date(general?.DiabetesDate)}
                    onChange={(date) => onChangeDiseases("DiabetesDate", date ? moment(date).format().toString() : null)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="DiabetesType">Tp. Diabetes:</label>
                  <select id="DiabetesType" name="DiabetesType" value={general?.DiabetesType} onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} className="form-control">
                    <option value={""}>Selecionar...</option>
                    <option value={"Diabetes Tipo 1"}>Diabetes Tipo 1</option>
                    <option value={"Diabetes Tipo 2"}>Diabetes Tipo 2</option>
                    <option value={"Diabetes Gestacional"}>Diabetes Gestacional</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="CholesterolDate">Colestrol:</label>
                  <DatePicker
                    locale={pt}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    dateFormat="dd/MM/yyyy"
                    id="CholesterolDate"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    isClearable={true}
                    selected={general?.CholesterolDate == null ? null : new Date(general?.CholesterolDate)}
                    onChange={(date) => onChangeDiseases("CholesterolDate", date ? moment(date).format().toString() : null)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="CholesterolValue">Val. Colestrol:</label>
                  <input type="number" className="form-control" id="CholesterolValue" name="CholesterolValue" value={general?.CholesterolValue} onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="TriglyceridesDate">Triglicerídios:</label>
                  <DatePicker
                    locale={pt}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    dateFormat="dd/MM/yyyy"
                    id="TriglyceridesDate"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    isClearable={true}
                    selected={general?.TriglyceridesDate == null ? null : new Date(general?.TriglyceridesDate)}
                    onChange={(date) => onChangeDiseases("TriglyceridesDate", date ? moment(date).format().toString() : null)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <div className="form-group">
                  <label htmlFor="TriglyceridesValue">Val. Triglicerídios:</label>
                  <input type="number" className="form-control" id="TriglyceridesValue" value={general?.TriglyceridesValue} name="TriglyceridesValue" onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12  col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <div className="form-group">
                  <label htmlFor="FoodIntolerance">Intolerância a algum alimento:</label>
                  <input type="text" className="form-control" id="FoodIntolerance" value={general?.FoodIntolerance} name="FoodIntolerance" onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} />
                </div>
              </div>
              <div className="col-12  col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div className="form-group">
                  <label htmlFor="CancerBackground">Antecedentes Oncológicos:</label>
                  <input type="text" className="form-control" id="CancerBackground" value={general?.CancerBackground} name="CancerBackground" onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12  col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="StressDegree">Grau de stress:</label>
                <select id="StressDegree" name="StressDegree" value={general?.StressDegree} onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} className="form-control">
                  <option value={""}>Selecionar...</option>
                  <option value={"Baixo"}>Baixo</option>
                  <option value={"Normal"}>Normal</option>
                  <option value={"Elevado"}>Elevado</option>
                </select>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="Intestine">Instetino:</label>
                <select id="Intestine" name="Intestine" value={general?.Intestine} onChange={(e) => onChangeDiseases(e.target.name, e.target.value)} className="form-control">
                  <option value={""}>Selecionar...</option>
                  <option value={"Regular"}>Regular</option>
                  <option value={"Irregular"}>Irregular</option>
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasVascularProblems" name="HasVascularProblems" checked={general?.HasVascularProblems} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasVascularProblems">Problemas Vasculares/Circulação</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasHemophiliac" name="HasHemophiliac" checked={general?.HasHemophiliac} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasHemophiliac">Hemofilico</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasEpilepsy" name="HasEpilepsy" checked={general?.HasEpilepsy} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasEpilepsy">Eplepsia/Convulsões</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasSkinProblems" name="HasSkinProblems" checked={general?.HasSkinProblems} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasSkinProblems">Problemas Cutâneos</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasHypotension" name="HasHypotension" checked={general?.HasHypotension} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasHypotension">Hipotsensão/Hipertensão</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasHyperthyroidism" name="HasHyperthyroidism" checked={general?.HasHyperthyroidism} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasHyperthyroidism">Hipo/Hipertiroidismo</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                    <input type="checkbox" id="chk_HasChilblains" name="HasChilblains" checked={general?.HasChilblains} onChange={(e) => onChangeDiseases(e.target.name, e.target.checked)} />
                    <label htmlFor="chk_HasChilblains">Frieiras</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={exit}>Cancelar</Button>
          <Button color="primary" variant="contained" onClick={() => ChangeSave()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Suspense>
  );
};

export default GeneralDiseasesModal;
