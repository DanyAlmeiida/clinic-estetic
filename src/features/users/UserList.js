import React, { Suspense, useEffect, useState } from "react";
import moment from "moment";
import API from "../../API";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const UserList = (props) => {
  document.title = props.title;
  const [gridRef, setGridRef] = useState(null);
  const [state, setState] = useState([]);
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  const columns = [
    { name: "clientId", type: "number", maxWidth: 65, header: "#ID" },
    { name: "name", defaultFlex: 2, header: "Nome" },
    { name: "birthDate", defaultFlex: 2, header: "Data de Nascimento", render: ({ value }) => moment(value).format("DD/MM/YYYY") },
    { name: "jobOccupation", defaultFlex: 3, header: "Profissão" },
    { name: "CreatedAt", defaultFlex: 2, header: "Data de Registo", render: ({ value }) => moment(value).format("DD/MM/YYYY") },
    {
      name: "actions",
      defaultFlex: 3,
      header: "Ações",
      render: (e) => {
        return (
          <div className="text-center">
            <a href={"/users/detail/" + e.data.id} className="badge badge-success p-2">
              Editar
            </a>
            &nbsp;
            <a href="#" className="badge badge-danger p-2">
              Eliminar
            </a>
            &nbsp;
            <a href="#" className="badge badge-primary p-2">
              Ver Detalhe
            </a>
          </div>
        );
      },
    },
  ];
  const getClients = async () =>
    API.get("/clients").then((res) => {
      return res.data;
    });

  useEffect(() => {
    getClients().then((res) => {
      setState(res);
    });
  }, []);

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;

    const lowerSearchText = value && value.toLowerCase();
    const newData = state.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(lowerSearchText) != -1; // make the search case insensitive
      }, false);
    });

    setState(newData);
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
                      <a href="/users-list">Clientes</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-12">
                          <h3>
                            <i className="fas fa-users-cog primary"></i>&nbsp;Gestão de Clientes
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <input id="search-client" className="form-control" placeholder="Procurar cliente..." name="search-client" onChange={onSearchChange} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="table-responsive ">
                            <ReactDataGrid handle={setGridRef} className="table table-sm" style={{ minHeight: 550, marginTop: 10 }} columns={columns} pagination dataSource={state} defaultLimit={10} idProperty="id" showCellBorders={"horizontal"} />
                          </div>
                        </div>
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

export default UserList;
