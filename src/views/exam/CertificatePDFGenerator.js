
// import React, { useState, useEffect, useRef } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { FaDownload, FaPrint } from 'react-icons/fa';
// import certificate from "src/assets/own_img/certificate.jpeg"
// import jsPDF from 'jspdf';

// const CertificatePDFGenerator = ({ data }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const imageRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!imageLoaded) return;

//     const examDateTime = new Date(data.exam_id.examDateTime);
//     const exam_date = examDateTime.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const ctx = canvasRef.current.getContext('2d');
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     ctx.drawImage(imageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     ctx.font = '30px Arial';
//     ctx.fillStyle = 'black';
//     ctx.fillText(`${data.student_id.name}`, 528, 650);
//     ctx.fillText(`${data.exam_id.level_id.name}`, 810, 800);
//     ctx.fillText(`${data.exam_id.organization_id.address}`, 940, 910);
//     ctx.fillText(`${exam_date}`, 677, 910);
//   }, [data.student_id.name, imageLoaded]);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.download = `certificate_${data.student_id.name}.png`;
//     link.href = canvasRef.current.toDataURL('image/png');
//     link.click();
//   };

 



//   return (
//     <div>
//       <Modal
//         show={true}
//         onHide={() => setIsCertificateModalOpen(false)}
//         dialogClassName="modal-125w"
//         contentClassName="modal-content-100w"
//         size="xl"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Certificate</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <canvas ref={canvasRef} width="100%" height="auto" style={{ width: "-webkit-fill-available" }}></canvas>
//           <img
//             ref={imageRef}
//             src={certificate}
//             alt="Certificate"
//             style={{ display: 'none', }}
//             onLoad={() => {
//               setImageLoaded(true);
//               canvasRef.current.width = imageRef.current.naturalWidth;
//               canvasRef.current.height = imageRef.current.naturalHeight;
//             }}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" style={{ color: "white" }} onClick={handleDownload}><FaDownload /> Download Certificate</Button>
//           <Button variant="secondary" onClick={() => setIsCertificateModalOpen(false)}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CertificatePDFGenerator;


import html2canvas from 'html2canvas';

const CertificatePDFGenerator = (data) => {
  const imageRef = document.createElement('img');
  imageRef.src = "src/assets/own_img/certificate.jpeg";

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  imageRef.onload = () => {
    canvas.width = imageRef.naturalWidth;
    canvas.height = imageRef.naturalHeight;

    ctx.drawImage(imageRef, 0, 0);

    const examDateTime = new Date(data.exam_id.examDateTime);
    const exam_date = examDateTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`${data.student_id.name}`, 528, 650);
    ctx.fillText(`${data.exam_id.level_id.name}`, 810, 800);
    ctx.fillText(`${data.exam_id.organization_id.address}`, 940, 910);
    ctx.fillText(`${exam_date}`, 677, 910);

    const imageData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `certificate_${data.student_id.name}.png`;
    link.href = imageData;
    link.click();
  };
};

export default CertificatePDFGenerator;
