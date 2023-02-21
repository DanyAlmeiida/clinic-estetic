import React, { Component } from "react";

export default class SideBar extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-3">
          <a href="index3.html" className="brand-link" style={{ textAlign: "center" }}>
            <img src="/logo.png" alt="AdminLTE Logo" style={{ width: "70%" }} />
          </a>

          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="/user_160x160.jpg" alt="user-profile-pic" className="img-circle elevation-2" />
              </div>
              <div className="info">
                <a href="/" className="d-block">
                  Patrícia Rocha
                </a>
              </div>
            </div>
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw"></i>
                  </button>
                </div>
              </div>
            </div>
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-user-friends nav-icon"></i>
                    <p>
                      Clientes
                      <i className="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/users/registration" className="nav-link">
                        <i className="fas fa-user-plus nav-icon"></i>
                        <p>Registar Clientes </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/users/list" className="nav-link">
                        <i className="fas fa-users-cog nav-icon"></i>
                        <p>Listagem de Clientes</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fas fa-cogs nav-icon"></i>
                    <p>
                      Parameterizações<i className="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/types/pregnancy/list" className="nav-link">
                        <i className="fas fa-baby nav-icon"></i>
                        <p>Tipos de Gravidez</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="sidebar-custom">
            <a href="https://armandosantos.pt/pt/home" target={"_blank"} className="hide-on-collapse pos-right mr-1">
              <img src="/by-as.png" alt="Made By Armando Santos,LDA" style={{ width: "40px" }} />
            </a>
          </div>
        </aside>
      </div>
    );
  }
}
