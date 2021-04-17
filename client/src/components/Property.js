import React from "react";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

class Property extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gamePhoto: '',
      gamePhotoName: '',
      gamePhotoUploaded: '',
      message: ''
    }
    this.handleImage = this.handleImage.bind(this)
    this.handleImageSubmit = this.handleImageSubmit.bind(this)
  }

  handleImage (e) {
    console.log(e.target.files)
    this.setState({
      gamePhoto: e.target.files[0],
      gamePhotoName: e.target.files[0].name
    })
  }

  async handleImageSubmit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', this.state.gamePhoto)
    console.log('ABOUT TO UPLOAD')

    try {
      const res = await axios.post('http://localhost:5000/api/games/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('resDATA', res)
      const { fileName, filePath } = res.data
      this.setState({
        gamePhotoUploaded: { fileName, filePath },
        message: 'File Uploaded.'
      })
    } catch (err) {
      console.log('An error has occurred when trying to upload file: ', err)
    }
  }

  render () {
    return (
      <div className='container'>
        <Form onSubmit={this.handleImageSubmit} onChange={this.handleImage}>
          <Form.Group controlId='imageUpload'>
            <Form.File name="gamePhoto" label="Game Image" />
          </Form.Group>
          <Button type='submit' variant="primary">Upload Image</Button>{' '}
        </Form>
        {this.state.gamePhotoUploaded ?
          <div className='row'>
            <div className='col-6 m-auto'>
              <h3>{this.state.gamePhotoUploaded.fileName}</h3>
              <img style={{ width: '100%' }} src={this.state.gamePhotoUploaded.filePath} />
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default Property
