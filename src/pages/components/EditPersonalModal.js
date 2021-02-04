import React, { useState, useImperativeHandle } from 'react'
import { Modal, DatePicker, Form, Input, Radio, Select, Button, Row, Col, InputNumber, message } from 'antd'
import { countries } from 'countries-list'
import moment from 'moment'
import { usePersonalInfoContext } from '../../context/PersonalInfoContext'

const countriesList = () => {
  let list = []
  for (const property in countries) {
    list.push(countries[property])
  }
  return list
}
const prefixSelector = (
  <Form.Item name="prefixPhone" noStyle>
    <Select allowClear showSearch style={{ width: '100px', }}>
      {countriesList().map(country => <Select.Option key={country.name} value={country.phone}>
        <Row justify="space-between">
          <span>{country.emoji}</span>
          <span>+{country.phone}</span>
        </Row>
      </Select.Option>)}
    </Select>
  </Form.Item>
);

// main
const EditPersonalModal = (props, ref) => {
  const [visialbe, setvisialbe] = useState(false)
  const [submitBtn, setSubmitBtn] = useState(false)
  const { getPersonalInfo, editPersonalInfo } = usePersonalInfoContext()
  const [form] = Form.useForm();
  const [record, setrecord] = useState()

  useImperativeHandle(ref, () => ({
    showModal: (data) => {
      setvisialbe(true)
      const result = getPersonalInfo(data._id)
      debugger
      form.setFieldsValue({ ...result, birthDay: moment(result.birthDay) })
      setrecord(data)
    }
  }))

  const onFinish = async (values) => {
    try {
      setSubmitBtn(true)
      const birthDay = moment(values.birthDay).format()
      values.birthDay = birthDay
      editPersonalInfo(record._id, values)

      setSubmitBtn(false)
      setvisialbe(false)
      message.success("Edit Success")
    } catch (error) {
      const result = error.response
        ? error.response.data.message
        : error.response
      message.error(result)
    }
  }

  return (
    <Modal
      title='Edit Personal'
      destroyOnClose={true}
      visible={visialbe}
      onCancel={() => setvisialbe(false)}
      footer={null}
      closable={false}
      width='90%'
    >

      <Form
        name="edit"
        form={form}
        labelAlign='left'
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col xs={4}>
            <Form.Item name='titleName' label='Title' rules={[{ required: true, message: 'Please input your Titel name!', },]}>
              <Select style={{ width: "100%" }}>
                {['Mr.', 'Mrs.', 'Ms.'].map(title => <Select.Option key={title} value={title}>{title}</Select.Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={9}>
            <Form.Item name='firstName' label="First Name" rules={[{ required: true, message: 'Please input your First name!', },]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={9}>
            <Form.Item
              name='lastName'
              label="Last Name"
              rules={[{ required: true, message: 'Please input your Last name!', },]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={6}>
            <Form.Item name='birthDay' label="Birthday" rules={[{ required: true, message: 'Please input your Birthday!', },]}>
              <DatePicker format={'DD/MM/YYYY'} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={7}>
            <Form.Item name='nationlity' label='Nationlity' rules={[{ required: true, message: 'Please input your Nationlity!', },]}>
              <Select
                allowClear
                showSearch
                placeholder="Search to Select"
                style={{ width: "100%" }}
              >
                {countriesList().map(country => <Select.Option key={country.name} value={country.name}><span>{country.name}</span></Select.Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* citizenId */}
        <Form.Item name='citizenId' label={<span><span style={{ color: "red" }}>*</span><span> Citizen ID</span></span>} style={{ marginBottom: '0px' }}>
          <Input.Group>
            <Row gutter={24}>
              <Col span={2}><Form.Item rules={[
                { type: "number", required: true, message: "Please input your Number!" },
                {
                  validator: (_, value) => {
                    if (value.toString().length < 1) {
                      return Promise.reject('Please complete 1 characters.')
                    }
                    return Promise.resolve()
                  }
                }
              ]} name={['citizenId', 0]}>
                <InputNumber maxLength="1" style={{ width: '100%' }} />
              </Form.Item>
              </Col>
              <Col span={3}><Form.Item rules={[
                { type: "number", required: true, message: "Please input your Number!" },
                {
                  validator: (_, value) => {
                    if (value.toString().length < 4) {
                      return Promise.reject('Please complete 4 characters.')
                    }
                    return Promise.resolve()
                  }
                }
              ]} name={['citizenId', 1]}><InputNumber maxLength="4" style={{ width: '100%' }} /></Form.Item></Col>
              <Col span={4}><Form.Item rules={[
                { type: "number", required: true, message: "Please input your Number!" },
                {
                  validator: (_, value) => {
                    if (value.toString().length < 5) {
                      return Promise.reject('Please complete 5 characters.')
                    }
                    return Promise.resolve()
                  }
                }
              ]} name={['citizenId', 2]}><InputNumber maxLength="5" style={{ width: '100%' }} /></Form.Item></Col>
              <Col span={2}><Form.Item rules={[
                { type: "number", required: true, message: "Please input your Number!" },
                {
                  validator: (_, value) => {
                    if (value.toString().length < 2) {
                      return Promise.reject('Please complete 2 characters.')
                    }
                    return Promise.resolve()
                  }
                }
              ]} name={['citizenId', 3]}><InputNumber maxLength="2" style={{ width: '100%' }} /></Form.Item></Col>
              <Col span={2}><Form.Item rules={[
                { type: "number", required: true, message: "Please input your Number!" },
                {
                  validator: (_, value) => {
                    if (value.toString().length < 1) {
                      return Promise.reject('Please complete 1 characters.')
                    }
                    return Promise.resolve()
                  }
                }
              ]} name={['citizenId', 4]}><InputNumber maxLength="1" style={{ width: '100%' }} /></Form.Item></Col>
            </Row>
          </Input.Group>
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please input your Gender!', },]}>
          <Radio.Group>
            <Radio value="male">male</Radio>
            <Radio value="female">female</Radio>
            <Radio value="unisex">unisex</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your Phone number!' }]}>
          <Input addonBefore={prefixSelector} style={{ width: '300px' }} />
        </Form.Item>

        <Form.Item name="passportNumber" label="Passport number" rules={[{ required: true, message: 'Please input your Passport number!' }]}>
          <Input style={{ width: "200px" }} />
        </Form.Item>

        <Form.Item name="expectedSalary" label="Expected Salary" rules={[{ required: true, message: "Please input your Number!" }]}>
          <Input type="number" style={{ width: "200px" }} />
        </Form.Item>

        <Row gutter={[24, 24]}>
          <Col xs={{ span: 24 }} md={{ span: 4, offset: 16 }}>
            <Form.Item noStyle >
              <Button block htmlType="submit" type="primary">SUBMIT</Button >
            </Form.Item>
          </Col>
          <Col xs={24} md={4}><Button disabled={submitBtn} loading={submitBtn} block onClick={() => setvisialbe(false)}>CANCLE</Button></Col>

        </Row>

      </Form>

      <Row>
      </Row>
    </Modal>
  )
}

export default React.forwardRef(EditPersonalModal)



