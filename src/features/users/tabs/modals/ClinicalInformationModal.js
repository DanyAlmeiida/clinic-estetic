import { Suspense, useEffect, useState } from "react";
import API from "../../../../API";
import moment from "moment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

const ClinicalInformationModal = ({ setLoading, open, mode, data, exit, toast, clientId, refresh }) => {
  var initial_state = {
    isLeftHanded: false,
    mentalState: "",
    clinicalBackground: "",
    alergies: "",
    medicines: "",
    maxBloodPressure: 0,
    minBloodPressure: 0,
    hearRate: 0,
    hasRadioactiveDevices: false,
    hasProteses: false,
    hasPacemaker: false,
    hasImplants: false,
    hasIntraUterineDevice: false,
    againstIndications: "",
    surgeries: "",
    gynecologicalConditions: null,
    id: "",
    modifiedAt: null,
    createdAt: null,
  };
  var gyn_init_state = {
    pregnantDate: null,
    pregnancyType: null,
    breastFeedDate: null,
    menstruatingDate: null,
    menopauseDate: null,
    childrenQuantity: 0,
  };

  registerLocale("pt", pt);

  const [clinicalInformation, setClinicalInformation] = useState(initial_state);
  const [showGynecologicalCond, setshowGynecologicalCond] = useState(false);
  const [HasChidrenQuantity, setHasChidrenQuantity] = useState(false);
  const [gynecologicalCond, setGynecologicalCond] = useState(gyn_init_state);

  useEffect(() => {
    if (data != null) {
      setClinicalInformation({
        isLeftHanded: data?.isLeftHanded,
        mentalState: data?.mentalState,
        clinicalBackground: data?.clinicalBackground,
        alergies: data?.alergies,
        medicines: data?.medicines,
        maxBloodPressure: data?.maxBloodPressure,
        minBloodPressure: data?.minBloodPressure,
        hearRate: data?.hearRate,
        hasRadioactiveDevices: data?.hasRadioactiveDevices,
        hasProteses: data?.hasProteses,
        hasPacemaker: data?.hasPacemaker,
        hasImplants: data?.hasImplants,
        hasIntraUterineDevice: data?.hasIntraUterineDevice,
        againstIndications: data?.againstIndications,
        surgeries: data?.surgeries,
        gynecologicalConditions: data?.gynecologicalConditions,
        id: data?.id,
        modifiedAt: data?.modifiedAt,
        CreationDate: data?.creationDate,
      });
      if (data.gynecologicalConditions != null) {
        setshowGynecologicalCond(true);
        setGynecologicalCond(data.gynecologicalConditions);
      }
    }
    if (mode === "add") {
      setClinicalInformation(initial_state);
    }
  }, [data]);
  let onchangeGynecologicalCond = (target, value) => {
    setGynecologicalCond({ ...gynecologicalCond, [target]: value });
  };
  let ShowHideGynecologicalCond = (isChecked) => {
    if (isChecked === false) {
      setshowGynecologicalCond(false);
      setGynecologicalCond(null);
    } else setshowGynecologicalCond(true);
  };
  let onChangeClinicalInformation = (target, value) => {
    setClinicalInformation({ ...clinicalInformation, [target]: value });
  };
  const handleIsLeftHanded = (e) => {
    onChangeClinicalInformation("isLeftHanded", e.target.value === "true" ? true : false);
  };
  const ChangeSave = (obj) => {
    clinicalInformation.gynecologicalConditions = showGynecologicalCond ? gynecologicalCond : null;
    if (mode === "edit") {
      edit();
    }
    if (mode === "add") {
      add();
    }
  };
  const edit = () => {
    API.put("/clinical/" + data?.id, clinicalInformation)
      .then(() => {
        exit();
        toast.fire({ icon: "success", title: "Dados clínicos atualizados com sucesso!" });
      })
      .catch(() => toast.fire({ icon: "error", title: "Não foi possível atualizar os dados clínicos!" }))
      .finally(() => {
        setLoading(false);
        refresh();
      });
  };
  const add = () => {
    API.post("/clinical/" + clientId, clinicalInformation)
      .then(() => {
        exit();
        toast.fire({ icon: "success", title: "Dados clínicos adicionados com sucesso!" });
      })
      .catch(() => toast.fire({ icon: "error", title: "Não foi possível adicionar o cliente!" }))
      .finally(() => {
        setLoading(false);
        refresh();
      });
  };

  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <Dialog maxWidth="lg" open={open}>
          <DialogTitle textAlign="center">{mode === "add" ? "Adicionar novo registo" : "Editar registo"}</DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-12 col-sm-9">
                  <div className="row">
                    <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                      <div className="form-group">
                        <label htmlFor="mentalState">Estado de saúde atual:</label>
                        <input type="text" className="form-control" id="mentalState" placeholder="" value={clinicalInformation?.mentalState} name="mentalState" onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
                      <div className="form-group">
                        <label htmlFor="fg-laterization">Laterização:</label>
                        <div className="form-group " id="fg-laterization" style={{ padding: "0.375rem" }} onChange={handleIsLeftHanded}>
                          <div className="control-label icheck-primary d-inline">
                            <input type="radio" id="radioPrimary2" name="r1" value="true" checked={clinicalInformation.isLeftHanded === true} />
                            <label className="radio-inline" htmlFor="radioPrimary2">
                              ESQ
                            </label>
                          </div>
                          <div className="control-label icheck-primary d-inline  ml-2">
                            <input type="radio" id="radioPrimary1" name="r1" value="false" checked={clinicalInformation.isLeftHanded === false} />
                            <label className="radio-inline" htmlFor="radioPrimary1">
                              DIR
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div className="form-group">
                        <label htmlFor="mentalState">Antecedentes Clinícos:</label>
                        <input type="text" className="form-control" id="clinicalBackground" name="clinicalBackground" value={clinicalInformation?.clinicalBackground} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                      <div className="form-group">
                        <label htmlFor="mentalState">Alergias:</label>
                        <input type="text" className="form-control" id="alergies" name="alergies" value={clinicalInformation?.alergies} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8">
                      <div className="form-group">
                        <label htmlFor="mentalState">Medicamentos:</label>
                        <input type="text" className="form-control" id="medicines" name="medicines" value={clinicalInformation?.medicines} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-4 ">
                      <div className="form-group">
                        <label htmlFor="">Tens.ART.Min:</label>
                        <input type="number" className="form-control" id="minBloodPressure" name="minBloodPressure" value={clinicalInformation?.minBloodPressure} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group">
                        <label htmlFor="">Tens.ART.Max:</label>
                        <input type="number" className="form-control" id="MaxBloodPressure" name="maxBloodPressure" value={clinicalInformation?.maxBloodPressure} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group">
                        <label htmlFor="">Ritmo Cardíaco:</label>
                        <input type="number" className="form-control" id="heartrate" name="hearRate" value={clinicalInformation?.hearRate} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3">
                  <div className="row">
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_radioactive" name="hasRadioactiveDevices" checked={clinicalInformation?.hasRadioactiveDevices} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.checked)} />
                          <label htmlFor="chk_radioactive">Dispositivos Radioativos</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_prosteses" name="hasProteses" checked={clinicalInformation?.hasProteses} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.checked)} />
                          <label htmlFor="chk_prosteses">Proteses</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_pacemaker" name="hasPacemaker" checked={clinicalInformation?.hasPacemaker} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.checked)} />
                          <label htmlFor="chk_pacemaker">Pacemaker</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_implants" name="hasImplants" checked={clinicalInformation?.hasImplants} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.checked)} />
                          <label htmlFor="chk_implants">Implantes</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_diu" name="hasIntraUterineDevice" checked={clinicalInformation?.hasIntraUterineDevice} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.checked)} />
                          <label htmlFor="chk_diu">DIU</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <div className="icheck-primary " style={{ padding: "0.375rem" }}>
                          <input type="checkbox" id="chk_gynecological_conds" checked={showGynecologicalCond} onChange={(e) => ShowHideGynecologicalCond(e.target?.checked)} />
                          <label htmlFor="chk_gynecological_conds">Cond.Ginecológicas</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="mentalState">Contra Indicações:</label>
                    <input type="text" className="form-control" id="againstIndications" name="againstIndications" value={clinicalInformation?.againstIndications} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="mentalState">Cirurgias:</label>
                    <input type="text" className="form-control" id="surgeries" name="surgeries" value={clinicalInformation?.surgeries} onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)} />
                  </div>
                </div>
              </div>
              <div className={showGynecologicalCond ? "row" : "d-none"}>
                <div className="col-12 col-sm-12">
                  <fieldset className="border p-2 ">
                    <legend className="w-auto">Condições Ginecológicas</legend>
                    <div className="row">
                      <div className="col-12 col-sm-2">
                        <div className="form-group">
                          <label>Grávida:</label>
                          <div className="input-group">
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              placeholderText="dd/mm/yyyy"
                              value={moment(gynecologicalCond?.pregnantDate).format("DD/MM/YYYY")}
                              onChange={(date) => onchangeGynecologicalCond("pregnantDate", moment(date).format())}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-2">
                        <div className="form-group">
                          <label>Amamentar:</label>
                          <div className="input-group">
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              placeholderText="dd/mm/yyyy"
                              value={moment(gynecologicalCond?.breastFeedDate).format("DD/MM/YYYY")}
                              onChange={(date) => onchangeGynecologicalCond("breastFeedDate", moment(date).format())}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-2">
                        <div className="form-group">
                          <label>Menstruada:</label>
                          <div className="input-group">
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              placeholderText="dd/mm/yyyy"
                              value={moment(gynecologicalCond?.menstruatingDate).format("DD/MM/YYYY")}
                              onChange={(date) => onchangeGynecologicalCond("menstruatingDate", moment(date).format())}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-2">
                        <div className="form-group">
                          <label>Menopausa:</label>
                          <div className="input-group">
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              placeholderText="dd/mm/yyyy"
                              value={moment(gynecologicalCond?.menopauseDate).format("DD/MM/YYYY")}
                              onChange={(date) => onchangeGynecologicalCond("menopauseDate", moment(date).format())}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-2">
                        <div className="form-group">
                          <label>Filhos:</label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <div className="icheck-primary m-0">
                                  <input
                                    type="checkbox"
                                    id="chk_sons"
                                    checked={gynecologicalCond?.childrenQuantity > 0}
                                    onChange={(e) => {
                                      setHasChidrenQuantity(e.target?.checked);
                                    }}
                                  />
                                  <label htmlFor="chk_sons"></label>
                                </div>
                              </span>
                            </div>
                            <input type="number" className="form-control" id="n_sons" name="childrenQuantity" value={gynecologicalCond?.childrenQuantity} onChange={(e) => onchangeGynecologicalCond(e.target.name, e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
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
    </div>
  );
};

export default ClinicalInformationModal;
