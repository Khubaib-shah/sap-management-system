import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
const styles = StyleSheet.create({
  page: {
    padding: 35,
    overflow: "hidden",
    backgroundColor: "#f9fafb", // Light gray background
  },
  section: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#ffffff", // White background for the content section
    borderRadius: 10,
    border: "1px solid #e5e7eb", // Light border
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1e40af", // Dark blue color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#4b5563", // Gray color
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e40af", // Dark blue color
  },
  value: {
    fontSize: 14,
    marginLeft: 5,
    textTransform: "capitalize",
    color: "#374151", // Dark gray color
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #e5e7eb", // Light border between rows
  },
  address: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 10,
    color: "#6b7280", // Gray color
    fontStyle: "italic",
  },
  phone: {
    position: "absolute",
    left: 20,
    bottom: 20,
    fontSize: 10,
    color: "#6b7280", // Gray color
    fontStyle: "italic",
  },
  proprietor: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#edcb5e", // Custom color
  },
  signature: {
    position: "absolute",
    right: 20,
    bottom: 20,
    textAlign: "center",
    borderTop: "1px solid #e5e7eb", // Light border
    width: "40%",
    fontSize: 12,
    color: "#6b7280", // Gray color
  },
});

// Component to define the PDF document structure
const InvoicePDFDocument = ({ formData }) => (
  <Document>
    <Page style={styles.page} size="A6">
      {/* Default Address */}
      <Text style={styles.address}>
        Main Shabqadar Kala Khan Market Shop No# 4,5
      </Text>
      {/* Phone Number */}
      <Text style={styles.phone}>Phone: +923408884888</Text>
      {/* Title and Subtitle */}
      <Text style={styles.title}>
        UNIQUE{"\n"} <Text style={styles.subtitle}>Uniform Collection</Text>
      </Text>
      {/* Proprietor */}
      <Text style={styles.proprietor}>Hafiz Shafi Ullah & Sons</Text>
      {/* Content Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{formData.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>{formData.color}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{formData.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>PKR {formData.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.value}>{formData.quantity * formData.price}</Text>
        </View>
      </View>
      {/* Signature */}
      <View style={styles.signature}>
        <Text>Signature</Text>
      </View>
    </Page>
  </Document>
);

const CreateInvoice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    color: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setIsModalOpen(false); // Close the modal after submission
    setShowPreview(true); // Show the PDF preview
  };

  return (
    <>
      {/* Button to Open Modal */}
      <div className="flex justify-between">
        <h1 className="text-lg md:text-3xl font-bold">Create Invoice</h1>

        <Button onClick={() => setIsModalOpen(true)}>Generate Invoice</Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enter Invoice Details</h2>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="destructive"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Generate</Button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview */}
      {showPreview && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <PDFViewer width="100%" height="500px">
              <InvoicePDFDocument formData={formData} />
            </PDFViewer>
          </div>
        </div>
      )}

      {/* Download Button */}
      {showPreview && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<InvoicePDFDocument formData={formData} />}
            fileName="invoice.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button>Generating PDF...</Button>
              ) : (
                <Button>Download Invoice</Button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default CreateInvoice;
