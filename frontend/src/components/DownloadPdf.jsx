import ItemDetail from "@/pages/ItemDetail";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";

const DownloadPdf = () => {
  return (
    <PDFDownloadLink document={<ItemDetail />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  );
};

export default DownloadPdf;
