import React from 'react';
import Modal from 'react-native-modal';
import { RFValue } from "react-native-responsive-fontsize";

const AppModal = ({ show, toggle, children, type }) => {
    return (
        <Modal
            onBackdropPress={() => { toggle() }}
            onBackButtonPress={() => { toggle() }}
            onDismiss={() => { toggle() }}
            isVisible={show ? true : false}
            style={[
                { justifyContent: 'center', alignItems: 'center', margin: 0, },
                type === 'bottom' ? { justifyContent: 'flex-end', marginBottom: -RFValue(10) } :
                    type === 'top' ? { justifyContent: 'flex-start', marginTop: RFValue(70) } : null,
            ]} >
            {children}
        </Modal>
    );
};

export { AppModal };
