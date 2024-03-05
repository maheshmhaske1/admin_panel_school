import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FaCheck, FaCross, FaTimes, } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { renderStudentExamById } from 'src/utility/api';






function ShowAnswerPapper({ showModal, closeModal, studentExamId }) {

    const [data, setData] = useState([]);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        renderData()

    }, []);

    const renderData = async () => {
        const response = await renderStudentExamById(studentExamId);
        if (response.success) {
            setData(response.data);
        }

    };

    console.log("data", data)

    return (
        <Modal show={showModal} onHide={closeModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Answer Paper</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-12'>

                        {/* <div className='row'>
                            <div className='col-12'>
                                <p>1. How is best all rounder in cricket in all time?</p>
                            </div>
                            <div className='col-6 px-4'>
                                <p className='right_answer'> <span>1)</span> Answer</p>
                            </div>
                            <div className='col-6 px-4'>
                                <p> <span>2)</span> Answer</p>
                            </div>
                            <div className='col-6 px-4'>
                                <p> <span>3)</span> Answer</p>
                            </div>
                            <div className='col-6 px-4'>
                                <p className=''> <span>4)</span> Answer</p>
                            </div>

                            <div className='col-12 text-end'>
                                <p><b>Answer- </b><span>1</span> (<span> <FaCheck color='green'></FaCheck></span>)</p>

                            </div>

                        </div>
                        <hr></hr> */}

                        {data.map((item, index) => (
                            <div key={index}>
                                <p>{index + 1}. {item.question_id.question}</p>
                                <div className='row'>
                                    {item.options.map((option, i) => {
                                        let className = '';
                                        if (option.is_answer && option.is_true) {
                                            className = 'right_answer';
                                        } else if (option.is_answer) {
                                            className = 'wrong_answer';
                                        }
                                        return (
                                            <div key={i} className='col-6 px-4'>
                                                <p className={className}><span>{i + 1})</span> {option.name}</p>
                                            </div>
                                        );
                                    })}

                                </div>

                                {item.options.map((option, i) => {
                                    if (option.is_true) {
                                    
                                        return (
                                            <div className='col-12 text-end'>
                                                <p><b>Answer- </b><span>{option.name}</span>  (<span className='colorRed'> {item?.is_question_answer_right?<FaCheck color='green'></FaCheck>:<>X</>} </span>)</p>

                                            </div>
                                        )
                                    }
                                })}


                                <hr />
                            </div>
                        ))}


                    </div>
                    <div className='col-12'>
                        <h2>Results</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Total Question</th>
                                    <th>Right Answer</th>
                                    <th>Wrong Answer</th>
                                    <th>Total Score</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.length}</td>
                                    <td>{data[0]?.examination_id.correct_questions}</td>
                                    <td>{data[0]?.examination_id.wrong_questions}</td>
                                    <td>{data[0]?.examination_id.exam_score}</td>

                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ShowAnswerPapper;
