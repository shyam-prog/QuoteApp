import { Route, Routes, Redirect, Navigate, Link } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import NotFound from "./components/comments/NotFound";
import Layout from "./components/layout/Layout";
// import NewQuote from "./stores/NewQuote";
import Quotes from "./stores/Quotes";
import QuotesDetail from "./stores/QuotesDetail";
import Comments from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Auth from "./stores/Auth";
import { useSelector } from "react-redux";
import Footer from "./components/UI/Footer";

const NewQuote = React.lazy(() => import("./stores/NewQuote")); //Client comment

function App() {

  const token = useSelector((state) => state.authSlice.token);

  return (
    <Layout>
      <div>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />{" "}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/quotes" />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quotes" element={<Quotes />} />
            {
              token && (<>
                <Route path="/quotes/:quoteID" element={<QuotesDetail />}>
                  <Route
                    path=""
                    element={
                      <div className="centered">
                        <Link className="btn--flat" to={`comments`}>
                          Load Comments
                        </Link>
                      </div>
                    }
                  />
                  <Route path={`comments`} element={<Comments />} />
                </Route>
                <Route path="/newquote" element={<NewQuote />} />
              </>
              )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      
    </Layout>
  );
}

export default App;
