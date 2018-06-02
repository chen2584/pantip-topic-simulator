import React, { Component } from 'react';
import { Button, Container, Dimmer, Dropdown, Form, Grid, Header } from 'semantic-ui-react';
import DomToImage from 'dom-to-image';
import FileSaver from 'file-saver';
import './App.css';
import './css/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      generatedTopic: false,
      imageSrc: "",
      searchQuery: "",
      selectOptions: [
        { value: "เพื่อน", text: "เพื่อน" },
        { value: "เกม", text: "เกม" },
        { value: "การเมือง", text: "การเมือง" },
        { value: "ความรัก", text: "ความรัก" },
        { value: "อาหาร", text: "อาหาร" },
        { value: "ผู้ชาย", text: "ผู้ชาย" },
        { value: "ผู้หญิง", text: "ผู้หญิง" },
        { value: "เพื่อนบ้าน", text: "เพื่อนบ้าน" },
        { value: "เพศ", text: "เพศ" }

      ],
      selectedValue: [],
      topicHeader: "",
    };
  }

  generateImage = () => {
    const node = document.getElementById('topic');
    const options = {
      bgcolor: '#FFF',
    };

    DomToImage.toBlob(node, options).then(blob => {
      FileSaver.saveAs(blob, 'topic-by-chen.png');
    });
  }

  handleHeaderChange = (e, { value }) => this.setState({ topicHeader: value })

  handleSelectChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, selectedValue: value })
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  handleAddition = (e, { value }) => {
    this.setState({
      selectOptions: [{ text: value, value }, ...this.state.selectOptions],
      searchQuery: ""
    })
  }

  onGenerateTopic = () => {
    if (this.state.topicHeader.length >= 10 && this.state.selectedValue.length > 0) {
      if(this.state.topicHeader.length > 100 && this.state.selectedValue.length > 10) {
        this.setState({ generatedTopic: true });
      }
      else {
        alert('หัวข้อกระทู้ห้ามเกิน 100 ตัวอักษร และ Tag ห้ามเกิน 10');
      }
    }
    else {
      alert('หัวข้อกระทู้ต้องมีอย่างน้อย 10 ตัว และมี Tag อย่างน้อย 1');
    }
  }

  onCloseTopic = () => {
    this.setState({ generatedTopic: false });
  }

  render() {
    return (
      <Container style={{ height: '100vh' }}>
        <Dimmer active={this.state.generatedTopic} onClickOutside={this.onCloseTopic}>
          <div className="mainTopic">
            <div id="topic">
              <div className="topic-container" >
                <div className="topic-content">
                  <Header as='h1' className="topic-header">
                    {this.state.topicHeader}
                  </Header>
                  <div className="topic-tagcontent">
                    {
                      this.state.selectedValue.map((data, key) => {
                        return (
                          <div style={{ display: 'inline-block' }}>
                            <div className="topic-tag" key={key} style={{ marginRight: 5 }}>
                              {data}
                            </div>
                            &nbsp;
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="topic-detail">
                    <span className="icon-mini-posttype icon-mini-posttype-que"></span>กระทู้คำถาม
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button primary onClick={this.generateImage} style={{ marginTop: 25 }}>Save Image</Button>&nbsp;&nbsp;&nbsp;
          <Button color='red' onClick={this.onCloseTopic} style={{ marginTop: 25 }}>Close</Button>
        </Dimmer>

        <Grid verticalAlign='middle' style={{ height: '100%' }}>
          <Grid.Column style={{ maxWidth: 400, margin: 'auto', backgroundColor: '#FFF', borderRadius: 5, }}>
            <Header as="h3" style={{ textAlign: 'center', color: 'blue' }}>Pantip Topic Simulator</Header>
            <Form style={{ maxWidth: 400, margin: 'auto' }}>
              <Form.Input label='หัวข้อกระทู้' placeholder='ทำไงดีครับมีเพื่อนหมาเย็xแม่...' onChange={this.handleHeaderChange} />

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 'bold', fontSize: 13 }} >Tag</label>
                <Dropdown
                  fluid
                  multiple
                  allowAdditions
                  onChange={this.handleSelectChange}
                  onSearchChange={this.handleSearchChange}
                  onAddItem={this.handleAddition}
                  options={this.state.selectOptions}
                  search
                  searchQuery={this.state.searchQuery}
                  selection
                  value={this.state.selectedValue}
                  style={{ marginTop: 4 }}
                  placeholder="Tag เช่น เพื่อน เกมส์ (สามารถใส่เพิ่มเองได้)"
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Form.Button primary onClick={this.onGenerateTopic}>
                  Generate Topic
                </Form.Button>
              </div>

              <div style={{ paddingTop: 10, textAlign: 'center', fontSize: 10 }}>
                Powered by Chen Angelo
              </div>
            </Form>

          </Grid.Column>
        </Grid>
      </Container>

    );
  }
}

export default App;
