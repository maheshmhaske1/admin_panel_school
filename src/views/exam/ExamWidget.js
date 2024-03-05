import React, { useState } from 'react';
import {
    CCardGroup,
    CRow,
    CWidgetStatsC,
    CCol

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBasket,
    cilChartPie,
    cilPeople,
    cilSpeech,
    cilSpeedometer,
    cilUserFollow,
    cilClock,
    cilAvTimer,
    cilCenterFocus
} from '@coreui/icons'


const ExamWidget = (prop) => {
    console.log("prop", prop)
    const convertDate = (date) => {
        // Format the date
        const formattedDate = new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        // Format the time
        const formattedTime = new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        return `${formattedDate} ${formattedTime}`;
    }
    return (
        <CRow>
            <CCardGroup className="mb-4">
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilSpeech} height={36} />}
                        value={prop.data[0]?.exam_name}
                        title="Exam Name"
                    // progress={{ color: 'info', value: 75 }}
                    />
                </CCol>

                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilUserFollow} height={36} />}
                        value={prop.data[0]?.organization_id.name}
                        title="Organization Details"
                    // progress={{ color: 'success', value: 75 }}
                    />
                </CCol>
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilBasket} height={36} />}
                        value={prop.data[0]?.level_id.name}
                        title="Level Details"
                    // progress={{ color: 'warning', value: 75 }}
                    />
                </CCol>
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilChartPie} height={36} />}
                        value={prop.data[0]?.teacher_id.name}
                        title="Incharge Teacher Name"
                    // progress={{ color: 'primary', value: 75 }}
                    />
                </CCol>
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilClock} height={36} />}
                        value={convertDate(prop.data[0]?.examDateTime)}
                        title="Start Date and Time"
                    // progress={{ color: 'danger', value: 75 }}
                    />
                </CCol>
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilClock} height={36} />}
                        value={convertDate(prop.data[0]?.examEndDateTime)}
                        title="Start Date and Time"
                    // progress={{ color: 'danger', value: 75 }}
                    />
                </CCol>

                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilAvTimer} height={36} />}
                        value={prop.data[0]?.exam_duration}
                        title="Exam Duration"

                    />
                </CCol>
                <CCol md={3}>
                    <CWidgetStatsC
                        icon={<CIcon icon={cilCenterFocus} height={36} />}
                        value={prop.data[0]?.total_marks}
                        title={`Total Marks, Total ${prop.data[0]?.total_marks} Question Allowed`}
                    />

                </CCol>
            </CCardGroup>
        </CRow>
    )
}

export default ExamWidget;
