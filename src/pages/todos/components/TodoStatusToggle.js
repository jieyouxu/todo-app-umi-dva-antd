import {Component} from 'react';
import {Form, Switch, Icon} from 'antd';

const FormItem = Form.Item;

class TodoStatusToggle extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = () => {
    const {onChange} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onChange(values);
      }
    });
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {completed} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    return (
      getFieldDecorator('switch',
        {valuePropName: 'checked'},
      )(
        <Switch
          checkedChildren={<Icon type="check"/>}
          unCheckedChildren={<Icon type="cross"/>}
        />
      )
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      defaultChecked: props.completed,
    };
  },
})(TodoStatusToggle);
