import React, { useState, useImperativeHandle } from 'react'
import { Button, Modal, Row, Col, message } from 'antd'
import { usePersonalInfoContext } from '../../context/PersonalInfoContext'
// main
const DeletePersonalModal = (props, ref) => {

  const [visialbe, setvisialbe] = useState(false)
  const [record, setRecord] = useState()
  const [submitBtn, setSubmitBtn] = useState(false)
  const { deletePersonalInfo } = usePersonalInfoContext()

  useImperativeHandle(ref, () => ({
    showModal: (data) => {
      setvisialbe(true)
      setRecord(data)
    }
  }))

  const handleDelete = () => {
    setSubmitBtn(true)
    deletePersonalInfo(record._id)
    setSubmitBtn(false)
    setvisialbe(false)
    message.success('Delete success')
  }

  if (!record) return null

  return (
    <Modal
      title="Delete People"
      destroyOnClose={true}
      visible={visialbe}
      onCancel={() => setvisialbe(false)}
      footer={null}
      closable={false}
    >
      <h3>Are you sure delete!</h3>

      <p>{record.name}</p>

      <Row gutter={[24]} style={{ marginBottom: '0px' }}>
        <Col xs={14}></Col>
        <Col xs={5}><Button block type="default" style={{ marginRight: '1rem' }} onClick={() => setvisialbe(false)}>CANCLE</Button></Col>
        <Col xs={5}><Button block disabled={submitBtn} loading={submitBtn} type="primary" onClick={handleDelete}>OK</Button></Col>
      </Row>

    </Modal>
  )
}

export default React.forwardRef(DeletePersonalModal)


