import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }



    render() {

        let show = false;
        if ((this.props.modalTrigger !== null) && (this.props.target === this.props.modalTrigger)){
            show = true;
        }
     
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closeModal} />
                <div
                    target={this.props.target}
                    className="Modal"
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}>
                    <span className="Modal-close" onClick={this.props.closeModal}>X</span>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;