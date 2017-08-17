import React from 'react';

import styles from './widget-edit.component.css';

export default class WidgetEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPrice: this.props.quantity * this.props.unitPrice
    }
  }

  static defaultProps = {
    name: '',
    quantity: 0,
    price: 0
  };

  cancel = () => {
    this.props.actions.setEditWidget(null)
  }

  updateTotalPrice = () => {
    this.setState(
      {totalPrice: parseInt(this.refs.quantity.value) * parseInt(this.refs.price.value) }
    )
  }

  save = () => {
    this.props.actions.updateWidget(
      {
        id: this.props.id,
        name: this.refs.name.value,
        quantity: parseInt(this.refs.quantity.value),
        unitPrice: parseInt(this.refs.price.value)
      }
    )
    this.cancel();
  }

  render() {
    return <tr className={styles['item']}>
        <td><input name="name" id="name" ref="name" type="text"
          className={styles['text']}
          defaultValue={this.props.name}
          onChange={()=>{}}/></td>
        <td><input type="quantity" id="quantity" ref="quantity" type="number"
          className={styles['number']}
          defaultValue={this.props.quantity}
          onChange={this.updateTotalPrice}/></td>
        <td>$&nbsp;<input type="price" id="price" ref="price" type="number"
          className={styles['number']}
          defaultValue={this.props.unitPrice}
          onChange={this.updateTotalPrice}/></td>
        <td>${this.state.totalPrice}</td>
        <td><button className="btn btn-sm btn-primary" onClick={this.save}>Save</button></td>
        <td><button className="btn btn-sm btn-warning" onClick={this.cancel}>Cancel</button></td>
    </tr>
  }
}
