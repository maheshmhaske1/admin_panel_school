// FormsCustom.js

import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const FormsCustom = ({ customStyles, title }) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{title}</strong>
          </CCardHeader>
          <CCardBody>
            {/* Call the customStyles function if it's provided */}
            {customStyles ? customStyles() : null}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

// Add prop validation
FormsCustom.propTypes = {
  customStyles: PropTypes.func, // Ensure customStyles is a function
  title: PropTypes.func, // Ensure customStyles is a function
}

export default FormsCustom
