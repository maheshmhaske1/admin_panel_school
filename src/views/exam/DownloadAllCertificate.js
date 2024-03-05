import React from 'react';
import { PDFDownloadLink, Document, Page, Image, StyleSheet, View } from '@react-pdf/renderer';
import certificate from "src/assets/own_img/certificate.jpeg"
import { Button, Modal } from "react-bootstrap";
import { FaDownload, } from "react-icons/fa";





const imageUrl = "https://res.cloudinary.com/dqdnj2szc/image/upload/v1709392944/img/certificate_x9pglq.jpg"

// Define styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        flexDirection: 'column', // Arrange images vertically
        justifyContent: 'flex-start', // Align images to the start of the page
        marginBottom: 20, // Adjust margin between pages
    },
    section: {
        marginBottom: 5, // Adjust margin between images
    },
    image: {
        // marginLeft:10,
        // marginRight:10,
        width: '100%',
        height: '410px',
        marginBottom:"5px"
    },
});

function MyPDF({ data }) {
    // Generate an array of unique image URLs
    const imageUrls = [...new Set(data.map(item => item.exam_certificate))];

    // Group image URLs into pairs
    const imagePairs = [];
    for (let i = 0; i < imageUrls.length; i += 2) {
        imagePairs.push(imageUrls.slice(i, i + 2));
    }

    return (
        <Document>
            {imagePairs.map((pair, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    {pair.map((url, i) => (
                        <View key={i} style={styles.section}>
                            <Image src={url} style={styles.image} />
                        </View>
                    ))}
                </Page>
            ))}
        </Document>
    );
}


function DownloadAllCertificate({ examId, data }) {
    let arrayOfObjects = data.filter(obj => obj.is_completed !== false);

    return (
        <div>

            <PDFDownloadLink document={<MyPDF data={arrayOfObjects} />} fileName={`${data[0]?.exam_id.exam_name}.pdf`}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading Certificate...' : <>
                        <button
                            type="button"
                            className="btn btn-danger text-white"
                            style={{"cursor":"pointer"}}

                        >
                            <FaDownload></FaDownload> Download All Certificate
                        </button></>
                }
            </PDFDownloadLink>
        </div>
    );
}

export default DownloadAllCertificate;