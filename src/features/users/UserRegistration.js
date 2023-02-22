import React, { Component } from "react";
import API from "../../API";
import moment from "moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

export default class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      occupation: "",
      birthdate: "",
      obs: "",
    };
    document.title = this.props.title;
    registerLocale("pt", pt);
  }
  today = () => "Penalva do Castelo, " + new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();
  handleSubmit = (e) => {
    var toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });

    // Prevent the default submit and page reload
    e.preventDefault();
    //Handle validations
    let clientDto = {
      Name: this.state.name,
      BirthDate: moment(this.state.birthdate, "DD/MM/YYYY").format(),
      JobOccupation: this.state.occupation,
      Observations: this.state.obs,
    };
    console.log(clientDto);
    API.post("clients", clientDto)
      .then((response) => {
        toast.fire({ icon: "success", title: "Cliente registado com sucesso!" }).then(function () {
          window.location.href = "/users/detail/" + response.data;
        });
      })
      .catch((err) => toast.fire({ icon: "error", title: "Não foi possível registar o cliente!" }));
  };

  render() {
    return (
      <div>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-left">
                    <li className="breadcrumb-item">
                      <a href="#">Início</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Clientes</a>
                    </li>
                    <li className="breadcrumb-item active">Registar Cliente</li>
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
                      <h3 className="card-title">Registar Cliente</h3>

                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                          <i className="fas fa-minus"></i>
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <form action="" id="userRegistration" method="post" onSubmit={this.handleSubmit}>
                        <div className="row">
                          <div className="col-12 col-sm-4 col-md-5 col-lg-5 col-xl-5">
                            <div className="form-group">
                              <label htmlFor="inputName">Nome:</label>
                              <input type="text" className="form-control" id="inputName" placeholder="Ex: Joana Aguiar Matias..." onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div className="form-group">
                              <label htmlFor="inputOccupation">Profissão:</label>
                              <input type="text" className="form-control" id="inputOccupation" placeholder="Ex: Contabilista..." onChange={(e) => this.setState({ occupation: e.target.value })} />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
                            <div className="form-group">
                              <label>Data de Nascimento:</label>
                              <div className="input-group">
                                <DatePicker
                                  id="birthdate"
                                  value={moment(this.state.birthdate).format("DD/MM/YYYY")}
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control"
                                  placeholderText="dd/mm/yyyy"
                                  onChange={(date) => this.setState({ birthdate: moment(date).format() })}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label>Observações</label>
                              <textarea className="form-control" rows="6" placeholder="Observações..." onChange={(e) => this.setState({ obs: e.target.value })}></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-9"></div>
                          <div className="col-12 col-sm-3">
                            <button type="submit" className="btn btn-block btn-primary btn-lg">
                              Registar
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer">{this.today()}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
