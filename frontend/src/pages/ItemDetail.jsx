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
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    marginLeft: 5,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
  },
});

// Component to define the PDF document structure
const ItemPDFDocument = ({ item }) => (
  <Document>
    <Page style={styles.page} size="A6">
      <Text style={styles.title}>Item Details</Text>
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
          <Text style={styles.label}>Processing Status:</Text>
          <Text style={styles.value}>{item.processing}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Updated At:</Text>
          <Text style={styles.value}>
            {new Date(item.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
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
    return <div>Loading...</div>;
  }

  return (
    <PDFViewer width="100%" height="600px">
      <ItemPDFDocument item={item} />
    </PDFViewer>
  );
};

export default ItemDetail;
