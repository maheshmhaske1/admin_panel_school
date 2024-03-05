import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { addQuestionToExam, renderNotExitStudent, renderNotExitQuestion } from "src/utility/api";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function AddQuestion({ renderQuestionData, examData, isExamDone }) {

    const { id } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentsData, setStudentData] = useState([]);

    useEffect(() => {
        if (examData[0]?.organization_id._id) {
            renderStudent(examData[0]?.level_id._id)
        }
    }, [examData]);


    const renderStudent = async (level_id) => {

        let obj = {
            "exam_id": id,
            "level_id": level_id
        }
        const response = await renderNotExitQuestion(obj);
        setStudentData(response.data);

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
            console.log("Selected students:", selectedStudents);
            if (selectedStudents.length === 0) {
                toast.error("Please select at least one question", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return;
            }

            let allRequestsSuccessful = true;
            for (let i = 0; i < selectedStudents.length; i++) {
                const studentId = selectedStudents[i];
                const obj = {
                    "exam_id": id,
                    "question_id": studentId
                };
                try {
                    const response = await addQuestionToExam(obj);
                    if (!response.success) {
                        allRequestsSuccessful = false;

                        toast.error(`${response.message}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 10000,
                        });
                        toggleModal();
                        setTimeout(() => {
                            renderQuestionData();
                            renderStudent();
                        }, 2000);
                        // throw new Error(response.message || "Failed to add question");
                    }
                } catch (error) {
                    console.error("Error adding question:", error.message);
                    toast.error(`${error.message}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            }

            if (allRequestsSuccessful) {
                toast.success("Questions added successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                toggleModal();
                setTimeout(() => {
                    renderQuestionData();
                    renderStudent();
                }, 2000);
            }

        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong...!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };




    const options = studentsData.map(student => ({
        value: student._id,
        label: student.question
    }));

    return (
        <div className="container bg-white mt-5" >
            <div className="row">
                <div className="col-6 my-3">
                    <h3>Exam Question Info</h3>
                </div>

                {!isExamDone ? <>
                    <div className="col-6 my-3 text-end">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={toggleModal}
                        >
                            Add Question
                        </button>
                    </div></> : ""}

                <hr />
            </div>

            <Modal show={modalOpen} onHide={toggleModal} backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
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

export default AddQuestion;

