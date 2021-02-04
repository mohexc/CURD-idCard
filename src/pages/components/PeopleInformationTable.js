import { Card, Table, Row, Col, Input, Button } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import ListOperation from './ListOperation'
import ShowPersonalModal from './ShowPersonalModal'
import CreatePersonalModal from './CreatePersonalModal'
import EditPersonalModal from './EditPersonalModal'
import DeletePeopleModal from './DeletePeopleModal'
import DeletePersonalModal from './DeletePersonalModal'
import { usePersonalInfoContext } from '../../context/PersonalInfoContext'

// main
const PeopleInformationTable = () => {
  const [dataTable, setDataTable] = useState([])
  const [choosedRows, setChoosedRows] = useState([])
  const { getPeoplelInfo, peopleInfoList } = usePersonalInfoContext()

  const showPersonalModalRef = useRef()
  // const createPersonModalRef = useRef()
  const editPersonalModalRef = useRef()
  const deletePersonalModalRef = useRef()
  const deletePeopleModalRef = useRef()

  useEffect(() => {
    const data = getPeoplelInfo()
    setDataTable(data)
    // eslint-disable-next-line
  }, [peopleInfoList])

  const handleSearch = (values) => {
    const data = getPeoplelInfo(values)
    debugger
    setDataTable(data)
  }

  const openModal = (key, record) => {
    debugger
    if (key === 'edit') return editPersonalModalRef.current.showModal(record)

    if (key === "delete") return deletePersonalModalRef.current.showModal(record)

    if (key === 'show') return showPersonalModalRef.current.showModal(record)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setChoosedRows(selectedRows)
    },
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      render: (row) => <span>{row.name}</span>
    },
    {
      key: "gender",
      title: "Gender",
      render: (row) => <span>{row.gender}</span>
    },
    {
      key: "mobilePhone",
      title: "Mobile Phone",
      render: (row) => <span>{row.phone}</span>
    },
    {
      key: "nationality",
      title: "Nationality",
      render: (row) => <span>{row.nationlity}</span>
    },
    {
      key: "operation",
      title: "Operation",
      width: "10%",
      render: (record) => <ListOperation record={record} openModal={openModal} />

    },
  ]

  return (
    <Card style={{ borderRadius: "10px" }}>
      <Row align="middle" style={{ marginBottom: "1rem" }}>
        <Col xs={24} md={24} lg={12}>
          <Row align="middle" gutter={[24, 24]}>
            <Col xs={12} lg={6}> <h1><strong>All</strong> : {dataTable.length}</h1></Col>
            <Col xs={12} lg={6}>
              <Button type="primary" block disabled={choosedRows.length === 0 ? true : false}
                onClick={() => deletePeopleModalRef.current.showModal(choosedRows)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <Row gutter={[24]}>
            <Col xs={{ span: 12, offset: 12 }}> <Input.Search allowClear onSearch={handleSearch} enterButton /></Col>
            {/* <Col xs={8}><Button type="primary" block>Create</Button></Col> */}
          </Row>
        </Col>
      </Row>

      <Table
        rowKey={(record) => record._id}
        rowSelection={{ ...rowSelection }}
        bordered
        columns={columns}
        dataSource={dataTable}
        pagination={{ position: ['topRight', 'bottomRight'] }}
      />
      <ShowPersonalModal ref={showPersonalModalRef} />
      <CreatePersonalModal />
      <EditPersonalModal ref={editPersonalModalRef} />
      <DeletePersonalModal ref={deletePersonalModalRef} />
      <DeletePeopleModal ref={deletePeopleModalRef} />
    </Card>
  )
}

export default PeopleInformationTable
