import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import DatePicker from "react-datepicker";
import moment from "moment";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
const GeneralDiseasesModal = ({ setLoading, open, mode, data, exit, toast, clientId, refresh }) => {
  var init_generalDiseases = {
    DiabetesDate: null,
    DiabetesType: "",
    CholesterolDate: null,
    CholesterolValue: 0.0,
    TriglyceridesDate: null,
    TriglyceridesValue: 0.0,
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
  registerLocale("pt", pt);
  const [generalDiseases, setGeneralDiseases] = useState(init_generalDiseases);
  useEffect(() => {
    if (data != null) {
      setGeneralDiseases({
        DiabetesDate: data?.DiabetesDate,
        DiabetesType: data?.DiabetesType,
        CholesterolDate: data?.CholesterolDate,
        CholesterolValue: data?.CholesterolValue,
        TriglyceridesDate: data?.TriglyceridesDate,
        TriglyceridesValue: data?.TriglyceridesValue,
        HasVascularProblems: data?.HasVascularProblems,
        HasChilblains: data?.HasChilblains,
        HasEpilepsy: data?.HasEpilepsy,
        HasSkinProblems: data?.HasSkinProblems,
        HasHypotension: data?.HasHypotension,
        HasHyperthyroidism: data?.HasHyperthyroidism,
        HasHemophiliac: data?.HasHemophiliac,
        FoodIntolerance: data?.FoodIntolerance,
        CancerBackground: data?.CancerBackground,
        StressDegree: data?.StressDegree,
        Intestine: data?.Intestine,
      });
    }
  }, [data]);
  let onchange = (target, value) => {
    setGeneralDiseases({ ...generalDiseases, [target]: value });
  };
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Dialog maxWidth="lg" open={open}>
        <DialogTitle textAlign="center">{mode === "add" ? "Adicionar novo registo" : "Editar registo"}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div className="form-group">
                  <label htmlFor="diabetes">Diabetes:</label>
                  <DatePicker dateFormat="dd/MM/yyyy" className="form-control" placeholderText="dd/mm/yyyy" value={moment(generalDiseases?.DiabetesDate).format("DD/MM/YYYY")} onChange={(date) => onchange("DiabetesDate", moment(date).format())} />
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div className="form-group">
                  <label htmlFor="DiabetesType">Tp. Diabetes:</label>
                  <input type="text" className="form-control" id="DiabetesType" placeholder="" value={generalDiseases?.DiabetesType} name="DiabetesType" onChange={(e) => onchange(e.target.name, e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div className="form-group">
                  <label htmlFor="CholesterolDate">Colestrol:</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    id="CholesterolDate"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    value={moment(generalDiseases?.CholesterolDate).format("DD/MM/YYYY")}
                    onChange={(date) => onchange("CholesterolDate", moment(date).format())}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <div className="form-group">
                  <label htmlFor="DiabetesType">Val. Colestrol:</label>
                  <input type="number" className="form-control" id="CholesterolValue" placeholder="" value={generalDiseases?.CholesterolValue} name="CholesterolValue" onChange={(e) => onchange(e.target.name, e.target.value)} />
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default GeneralDiseasesModal;
