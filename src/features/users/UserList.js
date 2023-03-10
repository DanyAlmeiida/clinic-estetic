import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import API from "../../API";
import Datatable from "../../Components/Datatable";

const UserList = (props) => {
  const navigate = useNavigate();
  document.title = props.title;
  const [state, setState] = useState([]);
  const [Loading, setLoading] = useState(false);
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  const columns = useMemo(
    () => [
      {
        accessorKey: "clientId", //access nested data with dot notation
        header: "ID#",
      },
      {
        accessorKey: "name",
        header: "Nome do Cliente",
      },
      {
        accessorKey: "jobOccupation",
        header: "Profissão",
      },
      {
        accessorKey: "birthDate", //normal accessorKey
        header: "Data de Nascimento",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "createdAt",
        header: "Data de Registo",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD/MM/YYYY"),
      },
    ],
    []
  );

  const getClients = async () =>
    API.get("/clients").then((res) => {
      return res.data;
    });

  const fnDelete = (id) => {
    console.log(id);
  };
  const fnEdit = async (id) => {
    navigate("/users/detail/" + id);
  };
  useEffect(() => {
    setLoading(true);
    getClients().then((res) => {
      setState(res);
      setLoading(false);
    });
  }, []);

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
                          <Datatable isLoading={Loading} data={state} columns={columns} fnDelete={fnDelete} fnEdit={fnEdit} />
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
