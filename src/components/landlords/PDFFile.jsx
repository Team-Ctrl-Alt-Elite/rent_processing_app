import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../photo-pdf/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    margin: 12,
    fontSize: 16,
    textDecoration: "underline",
    textAlign: "justify",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 150,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const convertLeaseDate = (inputDate) => {
  const date = new Date(inputDate); // Unix timestamp
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
};

export default function PDFFile({ tenantId, contracts }) {
  const [tenant, setTenant] = useState(null);
  const [contract, setContract] = useState(null);
  const [unit, setUnit] = useState(null);
  const landlordName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getTenant = async () => {
      try {
        if (tenantId !== null && tenantId !== undefined) {
          const response = await axios.get(
            `http://localhost:8080/tenant/${tenantId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: "include",
            }
          );

          setTenant(response?.data);
        }
      } catch (err) {
        console.log("PDFFile getTenant Error: ", err);
      }
    };

    getTenant();
  }, [tenantId, token]);

  useEffect(() => {
    try {
      if (contracts !== null && contracts !== undefined) {
        const findContract = contracts.find(
          (contract) => contract.tenant_id === tenantId
        );
        setContract(findContract);
      }
    } catch (err) {
      console.log("PDFFile findContract Error: ", err);
    }
  }, [contracts, tenantId]);

  useEffect(() => {
    const getUnit = async () => {
      try {
        if (contract !== null && contract !== undefined) {
          const response = await axios.get(
            `http://localhost:8080/unit/${contract.unit}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: "include",
            }
          );

          setUnit(response?.data);
        }
      } catch (err) {
        console.log("PDFFile getUnit Error: ", err);
      }
    };

    getUnit();
  }, [contract, token]);

  // console.log("Tenant: ", tenant);
  // console.log("Contract: ", contract);
  // console.log("Unit: ", unit);

  return (
    <>
      {tenant && contract && unit && (
        <Document>
          <Page style={styles.body}>
            <Text style={styles.header} fixed>
              RESIDENTIAL LEASE AGREEMENT
            </Text>
            <Image style={styles.image} src={logo} />
            <View>
              <Text style={styles.text}>
                <Text>LANDLORD: {landlordName}</Text>
              </Text>

              <Text style={styles.text}>
                TENANT: {tenant.first_name} {tenant.last_name}
              </Text>

              <Text style={styles.text}>
                <Text style={styles.text}>
                  PROPERTY: {unit.building_address}, Apt {unit.id}
                </Text>
              </Text>

              <Text style={styles.text}>
                UNIT SPECS: {unit.size} sq ft with {unit.bed} bed(s) and{" "}
                {unit.bath} bath(s).
              </Text>

              <Text style={styles.title}>TERMS OF LEASE</Text>
              <Text style={styles.text}>
                LEASE TERM: The lease shall begin on{" "}
                {convertLeaseDate(contract.lease_starting_date)} and end on{" "}
                {convertLeaseDate(contract.lease_ending_on)}.
              </Text>
              <Text style={styles.text}>
                RENT PAYMENTS: Tenant agrees to pay a monthly rent of $
                {contract.monthly_rent}.00 due before the 1st of each month.
              </Text>

              <Text style={styles.text}>
                SIGN YOUR LIFE AWAY HERE: _______________________
              </Text>
              <Text style={styles.text}>DATE: __________</Text>
            </View>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      )}
    </>
  );
}
