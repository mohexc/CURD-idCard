import React, { useState, useImperativeHandle } from 'react'
import { Button, Modal, Row, Col } from 'antd'
// main
const CreatePersonalModal = (props, ref) => {

  const [visialbe, setvisialbe] = useState(false)
  // const [record, setRecord] = useState()

  useImperativeHandle(ref, () => ({
    showModal: (data) => {
      setvisialbe(true)
      // setRecord(data)
    }
  }))

  return (
    <Modal
      destroyOnClose={true}
      visible={visialbe}
      onCancel={() => setvisialbe(false)}
      footer={null}
      closable={false}
    >
      <Row>
        <Col xs={{ span: 8, offset: 16 }}>
          <Button type="default" style={{ marginRight: '1rem' }} onClick={() => setvisialbe(false)}>CANCLE</Button>
          <Button type="primary" onClick={() => setvisialbe(true)}>OK</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default React.forwardRef(CreatePersonalModal)

