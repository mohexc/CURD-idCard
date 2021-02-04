import React, { useState, useImperativeHandle } from 'react'
import { Button, Modal, Row, Col } from 'antd'
import { usePersonalInfoContext } from '../../context/PersonalInfoContext'
import moment from 'moment'
import numeral from "numeral";

// main
const ShowPersonalModal = (props, ref) => {

  const [visialbe, setvisialbe] = useState(false)
  const [personal, setPersonal] = useState()
  const { getPersonalInfo } = usePersonalInfoContext()

  useImperativeHandle(ref, () => ({
    showModal: (data) => {
      const result = getPersonalInfo(data._id)
      debugger
      setPersonal(result)
      setvisialbe(true)
    }
  }))

  if (!personal) return null
  return (
    <Modal
      title="Show"
      destroyOnClose={true}
      visible={visialbe}
      onCancel={() => setvisialbe(false)}
      footer={null}
      closable={false}
    >
      <p>Name : {personal.titleName} {personal.firstName} {personal.lastName}</p>
      <p>Birthday : {moment(personal.brithDay).format('DD-MM-YYYY')}</p>
      <p>Nationality : {personal.nationlity}</p>
      <p>Citizen ID: {personal.citizenId[0]}-{personal.citizenId[1]}-{personal.citizenId[2]}-{personal.citizenId[3]}-{personal.citizenId[4]}</p>
      <p>Gender : {personal.gender}</p>
      <p>Mobile Phone : +{personal.prefixPhone}-{personal.phone}</p>
      <p>Passport Phone : {personal.passportNumber}</p>
      <p>Expected Salary : {numeral(personal.expectedSalary).format("0,0")}</p>
      <Row>
        <Col xs={{ span: 6, offset: 18 }}>
          <Button block type="primary" onClick={() => setvisialbe(false)}>OK</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default React.forwardRef(ShowPersonalModal)


