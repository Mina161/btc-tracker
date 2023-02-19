import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Index from "./Pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Index />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
