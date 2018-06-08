import {Component} from 'react';
import {Modal, Form, Input, Switch, Icon} from 'antd';

const FormItem = Form.Item;

class TodoEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleShowModel = (e) => {
    if (e) {
      e.stopPropagation();
    }

    this.setState({
      visible: true,
    });
  };

  handleHideModel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.handleHideModel();
      }
    });
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {userId, title, completed} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <span>
        <span onClick={this.handleShowModel}>
          {children}
        </span>
        <Modal
          title="Edit Todo Item"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleHideModel}
        >
          <Form
            horizontal
            onSubmit={this.handleOk}
          >
            <FormItem
              {...formItemLayout}
              label="User ID"
            >
              {
                getFieldDecorator('userId', {
                  initialValue: userId,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Task Description"
            >
              {
                getFieldDecorator('title', {
                  initialValue: title,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Status"
            >
              {getFieldDecorator('completed', {
                initialValue: completed,
              })(
                <Switch
                  checkedChildren={<Icon type="check"/>}
                  unCheckedChildren={<Icon type="cross"/>}
                  defaultChecked={completed}
                />,
              )
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(TodoEditModal);
