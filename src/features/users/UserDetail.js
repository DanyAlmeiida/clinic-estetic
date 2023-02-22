import React, { Suspense, useRef, useEffect, useState } from "react";
import API from "../../API";
import moment from "moment";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
var toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 500,
});
const UserDetail = (props) => {
  registerLocale("pt", pt);
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  const params = useParams();
  const [showGynecologicalCond, setshowGynecologicalCond] = useState(false);
  const [HasChidrenQuantity, setHasChidrenQuantity] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [clinicalInformation, setClinicalInformation] = useState(null);
  const [gynecologicalCond, setGynecologicalCond] = useState(null);
  const [state, setState] = useState({
    clientId: 0,
    name: "",
    birthDate: null,
    jobOccupation: "",
    observations: "",
    clinicalInformation: null,
    id: "",
    modifiedAt: null,
    createdAt: null,
  });

  useEffect(() => {
    document.title = props.title;
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    API.get("/clients/" + params.id)
      .then((res) => {
        setState(res.data);
        if (res.data.clinicalInformation != null) {
          setClinicalInformation(res.data.clinicalInformation);
          if (res.data.clinicalInformation.gynecologicalConditions != null) {
            setGynecologicalCond(res.data.clinicalInformation.gynecologicalConditions);
            setshowGynecologicalCond(true);
          }
        }
        console.log(res.data);
      })
      .catch((ex) => console.log(ex))
      .finally(() => setLoading(false));
  };
  const ShowHideGynecologicalCond = (isChecked) => {
    if (isChecked === false) {
      setshowGynecologicalCond(false);
      setGynecologicalCond(null);
    } else setshowGynecologicalCond(true);
  };
  const saveClientData = () => {
    setLoading(true);
    console.log(state.clinicalInformation);
    state.clinicalInformation = clinicalInformation;
    state.clinicalInformation.gynecologicalConditions = gynecologicalCond ?? null;
    API.put("/clients/" + params.id, state)
      .then((res) => {
        toast.fire({ icon: "success", title: "Cliente atualizado com sucesso!" }).then(() => getData());
      })
      .catch((ex) => toast.fire({ icon: "error", title: "Não foi possível atualizar o cliente!" }));
  };
  let onChangeClinicalInformation = (target, value) => {
    if (clinicalInformation == null) {
      setClinicalInformation({
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
      });
    }
    setClinicalInformation({ ...clinicalInformation, [target]: value });
  };
  let onchangeGynecologicalCond = (target, value) => {
    console.log(2);
    if (gynecologicalCond === null) {
      setGynecologicalCond({
        pregnantDate: null,
        pregnancyType: null,
        breastFeedDate: null,
        menstruatingDate: null,
        menopauseDate: null,
        childrenQuantity: 0,
      });
    }

    setGynecologicalCond({ ...gynecologicalCond, [target]: value });
  };
  const handleIsLeftHanded = (e) => {
    onChangeClinicalInformation("isLeftHanded", e.target.value === true);
  };
  return (
    <div>
      <Suspense fallback={loading()}>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-left">
                    <li className="breadcrumb-item">
                      <a href="/">Início</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/users/list">Clientes</a>
                    </li>
                    <li className="breadcrumb-item active">Detalhes do cliente</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-10">
                  <div className="callout callout-primary">
                    <h5>#{state?.clientId ?? ""} - Detalhes de Cliente</h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="card card-primary card-tabs">
                    <div className={Loading ? "overlay" : "d-none"}>
                      <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                    <div className="card-header p-0 pt-1">
                      <ul className="nav nav-tabs" id="client-tab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="pills-clinical-tab" data-toggle="pill" href="#pills-generic" role="tab" aria-controls="pills-generic" aria-selected="true">
                            Informações de Registo
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="pills-clinical-tab" data-toggle="pill" href="#pills-clinical" role="tab" aria-controls="pills-clinical" aria-selected="true">
                            Dados Clínicos
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content" id="custom-tabs">
                        <div className="tab-pane fade show active show" id="pills-generic" role="tabpanel" aria-labelledby="pills-generic-tab">
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
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    value={state?.birthDate != null ? moment(state?.birthDate).format("DD/MM/YYYY") : new Date()}
                                    onChange={(date) => setState((prev) => ({ ...prev, birthdate: moment(date).format() }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label>Observações</label>
                                <textarea className="form-control" rows="6" id="observations" placeholder="Observações..." value={state?.observations} onChange={(e) => setState((prev) => ({ ...prev, observations: e.target.value }))}></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade  " id="pills-clinical" role="tabpanel" aria-labelledby="pills-clinical-tab">
                          <div className="row">
                            <div className="col-12 col-sm-9">
                              <div className="row">
                                <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
                                  <div className="form-group">
                                    <label htmlFor="mentalState">Estado de saúde atual:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="mentalState"
                                      placeholder=""
                                      value={clinicalInformation?.mentalState}
                                      name="mentalState"
                                      onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
                                  <div className="form-group">
                                    <label htmlFor="fg-laterization">Laterização:</label>
                                    <div className="form-group " id="fg-laterization" style={{ padding: "0.375rem" }} onChange={handleIsLeftHanded}>
                                      <div className="control-label icheck-primary d-inline ml-2">
                                        <input type="radio" id="radioPrimary2" name="r1" value="true" />
                                        <label className="radio-inline" htmlFor="radioPrimary2">
                                          ESQ
                                        </label>
                                      </div>
                                      <div className="control-label icheck-primary d-inline">
                                        <input type="radio" id="radioPrimary1" name="r1" value="false" />
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
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="clinicalBackground"
                                      name="clinicalBackground"
                                      value={clinicalInformation?.clinicalBackground}
                                      onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)}
                                    />
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
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="minBloodPressure"
                                      name="minBloodPressure"
                                      value={clinicalInformation?.minBloodPressure}
                                      onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group">
                                    <label htmlFor="">Tens.ART.Max:</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="MaxBloodPressure"
                                      name="maxBloodPressure"
                                      value={clinicalInformation?.maxBloodPressure}
                                      onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)}
                                    />
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
                                <input
                                  type="text"
                                  className="form-control"
                                  id="againstIndications"
                                  name="againstIndications"
                                  value={clinicalInformation?.againstIndications}
                                  onChange={(e) => onChangeClinicalInformation(e.target.name, e.target.value)}
                                />
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
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" onClick={() => saveClientData()} className="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </div>
  );
};

export default UserDetail;
