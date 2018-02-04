import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  Message,
  TextArea,
} from 'semantic-ui-react'
import * as api from '../api'


const CommentModal = ({modalOpen, triggerModal, onModalSubmit, onModalChange, modalFormValue}) => (
  <Modal open={modalOpen} dimmer='blurring'>
    <Header icon='comment' content='Add comment' />
    <Modal.Content>
      <Form reply>
        <Form.TextArea placeholder='Write a comment!' value={modalFormValue} onChange={onModalChange}/>
        <Message error header='Comment cannot be empty' content='Please write the comment before submitting'/>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={triggerModal}>
        <Icon className='fa-remove' /> No
      </Button>
      <Button color='green' onClick={onModalSubmit}>
        <Icon className='fa-check' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default CommentModal;
