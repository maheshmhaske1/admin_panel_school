import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { addStudentToExam, renderNotExitStudent, renderStudentDataByOrganization, updateGenerateCertificate, updateStudentCertificate } from "src/utility/api";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload } from "react-icons/fa";
import DownloadAllCertificate from "./DownloadAllCertificate";
import html2canvas from 'html2canvas';
import certificate from "src/assets/own_img/certificate.jpeg"
import { useNavigate } from 'react-router-dom'
import { AiOutlineUndo } from "react-icons/ai";
import Swal from "sweetalert2";







function AddStudent({ updateData, examData, isExamDone, data }) {

    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [showSwalLoader, setShowSwalLoader] = useState(false);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentsData, setStudentData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (examData[0]?.organization_id._id) {
            renderStudent(examData[0]?.organization_id._id)
        }
    }, [examData]);


    useEffect(() => {
        if (showSwalLoader) {
            Swal.fire({
                title: "Please Wait",
                text: "We are generating your all certificate, It might take some time. Please wait.",
                showConfirmButton: false,
                allowOutsideClick: false,
                icon: "info",
            });
        } else {
            Swal.close();

        }


    }, [showSwalLoader]);


    const renderStudent = async (orgId) => {
        let obj = {
            "exam_id": id,
            "org_id": orgId
        }
        const response = await renderNotExitStudent(obj);
        if (response.success) {
            setStudentData(response.data);
            setShowDownload(true)
        }

    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedStudents(selectedOptions.map(option => option.value));
    };

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();

            if (selectedStudents.length == 0) {
                toast.error("Please select atleast one student", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return;
            }
            selectedStudents.map(async (studentId) => {
                const obj = {
                    "exam_id": id,
                    "student_id": studentId
                }
                await addStudentToExam(obj)
            })

            toast.success("Student added successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });


            toggleModal();
            setTimeout(() => {
                updateData();
                renderStudent();
            }, 2000);
            // await 


        } catch (err) {
            toast.error("Something went wrong...!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }

    };

    const options = studentsData.map(student => ({
        value: student._id,
        label: `${student.name} - ${student.level_id.name}`
    }));

    //downloadCertificate
    const downloadAllCertificate = async () => {

    }
    //generateCertificateImage
    const generateCertificateImage = (info) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = certificate; // Assuming 'certificate' is a valid URL or base64 image data

            image.onload = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                ctx.drawImage(image, 0, 0);

                const examDateTime = new Date(info.exam_id.examDateTime);
                const exam_date = examDateTime.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                ctx.font = '30px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(`${info.student_id.name}`, 528, 650);
                ctx.fillText(`${info.exam_id.level_id.name}`, 810, 800);
                ctx.fillText(`${info.exam_id.organization_id.address}`, 940, 910);
                ctx.fillText(`${exam_date}`, 677, 910);

                const imageData = canvas.toDataURL('image/png');

                try {
                    const imgData = await handleUpload(imageData);
                    const obj = {
                        "examination_id": info._id,
                        "image": imgData.secure_url
                    };
                    await generateCertificateUpdate(obj);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
        });
    };

    //handleUpload
    const handleUpload = (imageData) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', imageData);
            formData.append('upload_preset', 'school_management');

            fetch(`https://api.cloudinary.com/v1_1/dqdnj2szc/image/upload`, {
                method: 'POST',
                body: formData,
            }).then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };

    //generateAllCertificate
    //generateAllCertificate
    const generateAllCertificate = () => {
        return new Promise(async (resolve, reject) => {
            const confirmDelete = await Swal.fire({
                title: "Are you sure to generate all certificate?",
                text: "You will not be able to recover this!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Generate it!",
            });

            if (confirmDelete.isConfirmed) {
                try {
                    setShowSwalLoader(true)
                    
                   let arrayOfObjects = data.filter(obj => obj.is_completed !== false);
                   console.log("arrayOfObjects", arrayOfObjects)
                    let count = 0;
                    let count_data = arrayOfObjects.length;

                    await Promise.all(arrayOfObjects.map(async (info) => {
                        await generateCertificateImage(info);
                        count++;

                    }));

                    if (count === count_data) {
                        const response = await updateGenerateCertificate(id);
                        if (response.success) {
                            setShowSwalLoader(false)
                            toast.success("Certificate generated successfully", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });

                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);

                        } else {
                            toast.error("Something went wrong...!", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                            });
                            Swal.close();
                        }
                        resolve();
                    }
                } catch (error) {
                    reject(error);
                }
            }
        });
    };


    //generateCertificateUpdate
    const generateCertificateUpdate = (obj) => {
        return new Promise((resolve, reject) => {
            updateStudentCertificate(obj)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    };

    return (
        <div className="container bg-white mt-3">
            <div className="row">
                <div className="col-6 my-3">
                    <h3>Exam Student Info</h3>
                </div>
                {!isExamDone ? <><div className="col-6 my-3 text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={toggleModal}
                    >
                        Add Student
                    </button>
                </div></> : <><div className="col-6 my-3 text-end">

                    {examData[0].is_generated ? <> <DownloadAllCertificate examId={id} data={data}></DownloadAllCertificate></> : <><button
                        type="button text-white"
                        className="btn btn-danger"
                        style={{ color: "white" }}
                        onClick={generateAllCertificate}
                    >
                        <AiOutlineUndo></AiOutlineUndo>  Generate Certificate
                    </button></>}



                </div></>}

                <hr />
            </div>

            <Modal show={modalOpen} onHide={toggleModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        options={options}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={handleSelectChange}
                        value={options.filter(option => selectedStudents.includes(option.value))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default AddStudent;
