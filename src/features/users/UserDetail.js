import React, { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../API";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ClientInfotab from "./tabs/ClientInfotab";
import ClientClinicaltab from "./tabs/ClientClinicaltab";
import GeneralDiseasestab from "./tabs/GeneralDiseasestab";
var toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 200,
});
const UserDetail = (props) => {
  const [Loading, setLoading] = useState(false);
  const params = useParams();
  let [ClientInfo, setClientInfo] = useState(null);
  let [ClientClinical, setClientClinical] = useState(null);
  let [GeneralDiseases, setGeneralDiseases] = useState(null);
  useEffect(() => {
    document.title = props.title;
    load_client();
  }, []);

  let load_client = () => {
    setLoading(true);
    API.get("/clients/" + params.id)
      .then((res) => {
        setClientInfo(res.data);
        setClientClinical(res.data.clinicalInformation);
        setGeneralDiseases(res.data.generalDiseases);
      })
      .catch((ex) => {})
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Suspense fallback={Loading}>
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
                    <h5>#{ClientInfo?.clientId ?? ""} - Detalhes de Cliente</h5>
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
                            Dados Gerais
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="pills-clinical-tab" data-toggle="pill" href="#pills-clinical" role="tab" aria-controls="pills-clinical" aria-selected="true">
                            Dados Clínicos
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="pills-sick-tab" data-toggle="pill" href="#pills-sick" role="tab" aria-controls="pills-sick" aria-selected="true">
                            Doenças Gerais Influenciadoras
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content" id="custom-tabs">
                        <div className="tab-pane fade show active show" id="pills-generic" role="tabpanel" aria-labelledby="pills-generic-tab">
                          <ClientInfotab setLoading={setLoading} isLoading={Loading} data={ClientInfo} toast={toast} refresh={load_client} />
                          <ClientClinicaltab setLoading={setLoading} data_collection={ClientClinical} toast={toast} clientId={params.id} refresh={load_client} />
                          <GeneralDiseasestab setLoading={setLoading} data_collection={GeneralDiseases} toast={toast} clientId={params.id} refresh={load_client} />
                        </div>
                        <div className="tab-pane fade  " id="pills-clinical" role="tabpanel" aria-labelledby="pills-clinical-tab"></div>
                        <div className="tab-pane fade  " id="pills-sick" role="tabpanel" aria-labelledby="pills-sick-tab"></div>
                      </div>
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
