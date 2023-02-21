import React, { Component, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "../routes";
export default class Content extends Component {
  componentDidMount() {
    document.original_title = document.title;
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  render() {
    return (
      <div>
        <Suspense fallback={this.loading()}>
          <BrowserRouter>
            <Routes>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route key={idx} element={<route.component {...route.props} title={document.title + " - " + route.name} />} path={route.path} exact={route.exact ? true : false} name={route.name} disabled={route.disable} title={route.name} />
                ) : null;
              })}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}
