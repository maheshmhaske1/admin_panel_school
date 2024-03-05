
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaDownload, FaPrint } from 'react-icons/fa';
import certificate from "src/assets/own_img/certificate.jpeg"
import jsPDF from 'jspdf';

const CertificateGenerator = ({ data, setIsCertificateModalOpen }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!imageLoaded) return;

        const examDateTime = new Date(data.exam_id.examDateTime);
        const exam_date = examDateTime.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`${data.student_id.name}`, 528, 650);
        ctx.fillText(`${data.exam_id.level_id.name}`, 810, 800);
        ctx.fillText(`${data.exam_id.organization_id.address}`, 940, 910);
        ctx.fillText(`${exam_date}`, 677, 910);
    }, [data.student_id.name, imageLoaded]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = `certificate_${data.student_id.name}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    const handlePrint = () => {
        // Convert canvas image to data URL
        const dataUrl = canvasRef.current.toDataURL('image/png');
    
        // Create a new PDF document
        const pdf = new jsPDF('p', 'mm', 'a4');
    
        // Calculate aspect ratio of the image
        const img = new Image();
        img.src = dataUrl;
        img.onload = function() {
            const aspectRatio = img.width / img.height;
            const width = 210; // A4 page width in mm
            const height = width / aspectRatio;
    
            // Calculate padding
            const padding = 5; // Padding in mm
            const paddedWidth = width - (padding * 2);
            const paddedHeight = height - (padding * 2);
            const x = padding;
            const y = padding;
    
            // Add the image to the PDF document with padding
            pdf.addImage(dataUrl, 'PNG', x, y, paddedWidth, paddedHeight);
    
            // Save the PDF document and open the print dialog
            pdf.autoPrint(); // Automatically print the document without showing the print dialog
            pdf.save(`certificate_${data.student_id.name}.pdf`);
        };
    };
    
    

    return (
        <div>
            <Modal
                show={true}
                onHide={() => setIsCertificateModalOpen(false)}
                dialogClassName="modal-125w"
                contentClassName="modal-content-100w"
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <canvas ref={canvasRef} width="100%" height="auto" style={{ width: "-webkit-fill-available" }}></canvas>
                    <img
                        ref={imageRef}
                        src={certificate}
                        alt="Certificate"
                        style={{ display: 'none', }}
                        onLoad={() => {
                            setImageLoaded(true);
                            canvasRef.current.width = imageRef.current.naturalWidth;
                            canvasRef.current.height = imageRef.current.naturalHeight;
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{ color: "white" }} onClick={handleDownload}><FaDownload /> Download Certificate</Button>
                    <Button variant="primary" onClick={handlePrint}><FaPrint /> Print Certificate</Button>
                    <Button variant="secondary" onClick={() => setIsCertificateModalOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CertificateGenerator;
