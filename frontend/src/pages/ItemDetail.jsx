import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "@/services/InventoryApi";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Define styles for the PDF document
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
    color: "#edcb5e", // Dark blue color
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
const ItemPDFDocument = ({ item }) => (
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
          <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Company Name:</Text>
          <Text style={styles.value}>{item.companyName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Size:</Text>
          <Text style={styles.value}>{item.size}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>PKR {item.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {/* Signature */}
      <View style={styles.signature}>
        <Text>Signature</Text>
      </View>
    </Page>
  </Document>
);

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [height, setHeight] = useState(
    window.innerWidth < 768 ? "400px" : "600px"
  );

  useEffect(() => {
    const fetchItem = async () => {
      const handleResize = () => {
        setHeight(window.innerWidth < 768 ? "400px" : "600px");
      };

      window.addEventListener("resize", handleResize);
      try {
        const { data } = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <PDFViewer width="100%" height={height}>
          <ItemPDFDocument item={item} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ItemDetail;
